import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Button } from "@/app/_components/ui/button";
import Tabs from "./_components/tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopDetailsPageProps {
  params: {
    id: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }
  return (
    <div className="">
      <BarbershopInfo barbershop={barbershop} />

      <Tabs
        infoContent={
          <div>
            <h2 className=" mb-3 text-xs font-bold uppercase text-gray-400">
              sobre nós
            </h2>
            <p className="text-sm font-light">
              Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
              equipe de mestres barbeiros transforma cortes de cabelo e barbas
              em obras de arte. Em um ambiente acolhedor, promovemos confiança,
              estilo e uma comunidade unida.
            </p>
            <div className="flex-grow border-t border-gray-300" />
          </div>
        }
        servicesContent={
          <div className="grid grid-cols-1 gap-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                barbershop={barbershop}
                service={service}
                key={service.id}
                isAuthenticated={!!session?.user}
              />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default BarbershopDetailsPage;
