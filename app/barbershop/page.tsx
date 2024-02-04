import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5">
        <div className="pt-6">
          <Search search={searchParams.search} />
        </div>
        <h1 className="text-md  pt-6 font-bold text-[#838896]">
          Resultados para "{searchParams.search}"
        </h1>
        <div className="grid grid-cols-2 gap-4 pt-3">
          {barbershops.map((barbershop) => (
            <div className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
