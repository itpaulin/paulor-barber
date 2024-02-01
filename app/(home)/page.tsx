import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db as prismaClient } from "@/app/_lib/prisma";
import BarbershopItem from "../_components/barbershop-item";

export default async function Home() {
  const barbershops = await prismaClient.barbershop.findMany();

  return (
    <div className="px-5">
      <div className="flex flex-col gap-y-1  py-6">
        <p className="text-xl">
          Olá, <span className="font-semibold">Paulo</span>!
        </p>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE ',' d 'de ' LLLL", { locale: ptBR })}
        </p>
      </div>
      <Search />
      <div className="mt-9 flex flex-col gap-y-3">
        <h2 className=" text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
      <div className="mt-6">
        <h2 className=" mb-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {barbershops
            .map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))
            .slice(0, 4)}
        </div>
      </div>
      <div className="mt-6">
        <h2 className=" mb-3 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="no-scrollbar flex gap-4 overflow-x-auto">
          {barbershops
            .map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))
            .slice(4)}
        </div>
      </div>
    </div>
  );
}
