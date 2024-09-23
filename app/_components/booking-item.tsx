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

  const badgeStatus = useMemo(() => {
    if (booking.date < new Date())
      return (
        <Badge className=" ml-3 bg-gray-500 bg-opacity-65 text-gray-200 hover:bg-gray-500">
          Finalizado
        </Badge>
      );
    return (
      <Badge className="ml-3 bg-amber-900 text-primary-figma hover:text-orange-300">
        Confirmado
      </Badge>
    );
  }, [booking.date]);

  const handleCancelBooking = async () => {
    setIsLoading(true);
    return await cancelBooking(booking.id)
      .then(() => {
        toast.success("Reserva cancelada com sucesso");
        setIsOpen(false);
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
    <Sheet open={isOpen}>
      <SheetTrigger asChild>
        <Card className="max-h-[111px] min-w-full rounded-xl bg-accent">
          <CardContent className="flex flex-row items-stretch justify-between p-0">
            <div>
              <div className="pt-3">{badgeStatus}</div>
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
            <div className="flex flex-col items-center border-l-2 border-secondary px-9 pt-5 text-center">
              <p className="text-[0.75rem] capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl font-light">
                {format(booking.date, "d", { locale: ptBR })}
              </p>
              <p className="text-[0.75rem] font-light">
                {format(booking.date, "HH:m", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-grey-50 border-b-2 border-solid px-5 pb-6 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
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
        <div className="mt-6 px-2">
          {badgeStatus}
          <SchedulingCard
            barbershopName={booking.barbershop.name}
            date={booking.date}
            serviceName={booking.service.name}
            time={format(booking.date, "HH:mm", { locale: ptBR })}
            servicePrice={booking.service.price}
          />
        </div>
        <SheetFooter className="flex-row gap-3 px-3">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">
              Voltar
            </Button>
          </SheetClose>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => cancelBooking(booking.id)}
          >
            Cancelar Reserva
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
