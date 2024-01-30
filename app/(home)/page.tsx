import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";

export default function Home() {
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
    </div>
  );
}
