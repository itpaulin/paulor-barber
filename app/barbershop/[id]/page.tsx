import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Button } from "@/app/_components/ui/button";
import Tabs from "./_components/tabs";

interface BarbershopDetailsPageProps {
  params: {
    id: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
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
        infoContent={"oi"}
        servicesContent={
          <div className="grid grid-cols-1 gap-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem service={service} key={service.id} />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default BarbershopDetailsPage;
