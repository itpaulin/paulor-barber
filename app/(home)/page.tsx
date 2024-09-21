import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db as prismaClient } from "@/app/_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Hello from "./_components/hello";
import Header from "../_components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    prismaClient.barbershop.findMany({}),

    session?.user
      ? prismaClient.booking.findMany({
          where: {
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="">
      <Header />
      <div className="">
        <div className="flex flex-col gap-y-1  px-5 py-6">
          <Hello />
          <p className="text-sm capitalize">
            {format(new Date(), "EEEE ',' d 'de ' LLLL", { locale: ptBR })}
          </p>
        </div>
        <div className="w-full px-5">
          <Search />
        </div>
        {confirmedBookings.length > 0 && (
          <div className="mt-9 flex flex-col gap-y-3">
            <h2 className=" px-5 text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <div className="no-scrollbar flex gap-3 overflow-x-auto overflow-y-hidden px-5">
              {confirmedBookings.map((booking, i) => (
                <BookingItem key={i} booking={booking} />
              ))}
            </div>
          </div>
        )}
        <div className="mt-6">
          <h2 className=" mb-3 px-5 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
            {barbershops
              .map((barbershop, index) => (
                <div className="w-[167px]" key={index}>
                  <BarbershopItem barbershop={barbershop} key={barbershop.id} />
                </div>
              ))
              .slice(0, 5)}
          </div>
        </div>
        <div className="mt-6">
          <h2 className=" mb-3 px-5 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
            {barbershops
              .map((barbershop, index) => (
                <div className="w-[167px]" key={index}>
                  <BarbershopItem barbershop={barbershop} key={barbershop.id} />
                </div>
              ))
              .slice(5)}
          </div>
        </div>
      </div>
    </div>
  );
}
