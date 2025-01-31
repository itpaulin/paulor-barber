import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import BarbershopTabDetails from "./_components/barbershop-tab-details";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/authOptions";
import BarbershopContactPhone from "./_components/barbershop-contact-phone";
import Divider from "@/app/_components/ui/divider";

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

      <Divider className="mt-6" />

      <BarbershopTabDetails
        servicesContent={
          <div className="grid grid-cols-1 gap-y-3 px-5">
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
        infoContent={
          <div>
            <h2 className=" mb-3 px-5 text-xs font-bold uppercase text-gray-400">
              sobre nós
            </h2>

            {/* //TODO make dinamic with DB */}

            <p className="px-5 text-sm font-light">
              Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
              equipe de mestres barbeiros transforma cortes de cabelo e barbas
              em obras de arte. Em um ambiente acolhedor, promovemos confiança,
              estilo e uma comunidade unida.
            </p>

            <Divider className="my-6" />

            {/* //TODO make dinamic with DB */}

            <div className="flex flex-col gap-3 px-5">
              <BarbershopContactPhone phoneNumber="(22) 98805-5432" />
              <BarbershopContactPhone phoneNumber="(22) 93772-2819" />
            </div>

            <Divider className="my-6" />

            {/* //TODO make dinamic with DB */}
            <div className="flex flex-col gap-2 px-5">
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Segunda-Feira</p>
                <p className="font-semibold">Fechado</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Terça-Feira</p>
                <p className="font-semibold">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Quarta-Feira</p>
                <p className="font-semibold">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Quinta-Feira</p>
                <p className="font-semibold">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Sexta-Feira</p>
                <p className="font-semibold">09:00 - 21:00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Sábado</p>
                <p className="font-semibold">08:00 - 17:00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-500">Domingo</p>
                <p className="font-semibold">Fechado</p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default BarbershopDetailsPage;
