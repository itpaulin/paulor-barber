"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, set, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { saveBooking, SaveBookingParams } from "../_actions/save-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getDayBookings } from "../_actions/get-day-bookings";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
  barbershop: Barbershop;
}
const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const { data } = useSession();
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [isFetchingSubmit, setIsFetchingSubmit] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const timeList = useMemo(() => {
    if (!date) return [];

    return generateDayTimeList(date).filter((time) => {
      const dateHours = Number(time.split(":")[0]);
      const dateMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((item) => {
        const bookingHour = item.date.getHours();
        const bookingMinutes = item.date.getMinutes();

        return bookingHour === dateHours && bookingMinutes === dateMinutes;
      });

      if (!booking) {
        return true;
      }
      return false;
    });
  }, [date, dayBookings]);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const handleChangeDate = (date?: Date) => {
    setDate(date);
    setTime(undefined);
  };

  const handleBookingSubmit = async () => {
    if (!date || !time || !data) return;
    setIsFetchingSubmit(true);

    const timeReparted = time.split(":");

    const dateHours = Number(timeReparted[0]);
    const dateMinutes = Number(timeReparted[1]);

    const bookingDate = setMinutes(setHours(date, dateHours), dateMinutes);

    try {
      await saveBooking({
        barbershopId: barbershop.id,
        date: bookingDate,
        serviceId: service.id,
        userId: (data.user as any).id, //TODO doc AUTH
      });

      setSheetIsOpen(false);
      toast("Reserva Efetuada!", {
        description: "Sua reserva foi agendada com sucesso.",
        action: {
          label: "Ver Reservas",
          onClick: () => {
            //TODO pagina de agendamentos
            console.log("Ver Reservas");
          },
        },
      });

      setDate(undefined);
      setTime(undefined);
    } catch (err) {
      toast.error("Erro ao efetuar reserva, tente novamente");
    } finally {
      setIsFetchingSubmit(false);
    }
  };

  useEffect(() => {
    if (!date) return;

    const refetchUnavailableTimes = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);
      setDayBookings(_dayBookings);
    };

    refetchUnavailableTimes();
  }, [barbershop.id, date]);

  return (
    <Card className="rounded-2xl bg-accent">
      <CardContent className="w-full p-3">
        <div className="flex w-full flex-row items-center">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              fill
              style={{ objectFit: "contain" }}
              alt={service.name}
            />
          </div>

          <div className="flex w-full flex-col px-3 pt-3">
            <h2 className="font-bold"> {service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </span>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetContent className="p-0">
                  <SheetHeader className="items-start border-b-2 p-6">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <Calendar
                    fromDate={new Date()}
                    mode="single"
                    selected={date}
                    onSelect={handleChangeDate}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "80%",
                        borderRadius: "999px",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                    className="border-b-2"
                  />
                  {date && (
                    <div className="no-scrollbar flex flex-row gap-3 overflow-x-auto border-b-2 px-2 py-4">
                      {timeList.map((timeItem, index) => (
                        <Button
                          variant={time === timeItem ? "default" : "outline"}
                          key={index}
                          className="rounded-full"
                          onClick={() => setTime(timeItem)}
                        >
                          {timeItem}
                        </Button>
                      ))}
                    </div>
                  )}
                  {time && date && (
                    <Card className="m-4">
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex flex-row justify-between">
                          <h2>{service.name}</h2>
                          <h3>
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        <div className="flex flex-row justify-between text-sm font-light">
                          <h3 className=" text-gray-500">Data</h3>
                          <h4>
                            {date &&
                              format(date, "dd 'de' MMMM", { locale: ptBR })}
                          </h4>
                        </div>

                        <div className="flex flex-row justify-between text-sm font-light">
                          <h3 className=" text-gray-500">Horário</h3>
                          <h4>{time}</h4>
                        </div>

                        <div className="flex flex-row justify-between  text-sm font-light">
                          <h3 className=" text-gray-500">Barbearia</h3>
                          <h4>{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  <SheetFooter className="mt-4">
                    <Button
                      onClick={() => handleBookingSubmit()}
                      disabled={!date || !time || isFetchingSubmit}
                      className="mx-4"
                    >
                      {isFetchingSubmit && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
