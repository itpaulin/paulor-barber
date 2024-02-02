import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
}
const ServiceItem = ({ service }: ServiceItemProps) => {
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
              <Button variant="secondary">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
