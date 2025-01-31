"use client";

import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { useMemo, useState } from "react";
import SchedulingCard from "./scheduling-card";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast, Toaster } from "sonner";
import EnsureDialog from "./ui/ensure-dialog";
import BarbershopContactPhone from "../barbershop/[id]/_components/barbershop-contact-phone";

export type TBookingItem = Prisma.BookingGetPayload<{
  include: {
    service: true;
    barbershop: true;
  };
}>;
interface BookingItemProps {
  booking: TBookingItem;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isBookingConfirmed = booking.date > new Date();

  const handleCancelBooking = async () => {
    setIsLoading(true);
    return await cancelBooking(booking.id)
      .then(() => {
        setIsOpen(false);
        toast.success("Reserva cancelada com sucesso");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cancelar reserva, tente novamente mais tarde");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Card className="max-h-[111px] min-w-full rounded-xl">
          <CardContent className="flex flex-row items-stretch justify-between p-0">
            <div>
              <div className="px-2 pt-3">
                <Badge
                  variant={isBookingConfirmed ? "default" : "secondary"}
                  className="w-fit"
                >
                  {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
              </div>
              <div className="flex flex-col gap-y-2 px-3 pb-4 pt-2">
                <p className="text-[1rem] font-semibold">
                  {booking.service.name}
                </p>
                <div className="flex flex-row items-center gap-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                  </Avatar>
                  <p className="text-[0.875rem] opacity-80">
                    {booking.barbershop.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-1.5 border-l-[0.1px]">
              <div className="flex flex-col items-center px-9 pt-5 text-center">
                <p className="text-[0.75rem] capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-3xl font-light">
                  {format(booking.date, "d", { locale: ptBR })}
                </p>
                <p className="text-[0.75rem] font-light">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="flex flex-grow flex-col px-0">
        <SheetHeader className="border-grey-50 border-b-2 border-solid px-5 pb-4 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative  h-[180px] w-full">
            <Image src="/mapa.png" alt="Mapa" fill />
            <div className="lef-0 absolute bottom-4 w-full px-3">
              <Card>
                <CardContent className="px-3 py-2">
                  <div className="flex flex-row gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                    </Avatar>
                    <div className="flex flex-col overflow-x-hidden">
                      <p className="text-[1rem] font-semibold">
                        {booking.barbershop.name}
                      </p>
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <p className="text-[0.8rem] text-gray-300">
                              {booking.barbershop.address}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-[95vw]"
                          >
                            {booking.barbershop.address}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className=" flex  flex-grow flex-col gap-3 px-5">
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <SchedulingCard
            barbershopName={booking.barbershop.name}
            date={booking.date}
            serviceName={booking.service.name}
            time={format(booking.date, "HH:mm", { locale: ptBR })}
            servicePrice={booking.service.price}
          />

          {/* //TODO Dinamic */}
          <BarbershopContactPhone phoneNumber={"((11) 98204-5108"} />
          <BarbershopContactPhone phoneNumber={"(11) 99503-2351"} />
        </div>
        {isBookingConfirmed && (
          <SheetFooter className="flex-row gap-3 px-3">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <EnsureDialog
              action={handleCancelBooking}
              cancel="Não, vou manter"
              confirm="Sim, desejo cancelar"
              text="Deseja mesmo cancelar a reserva?"
              title="Cancelar Reserva"
            >
              <Button className="w-full" variant="destructive">
                Cancelar Reserva
              </Button>
            </EnsureDialog>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
