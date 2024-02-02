import Image from "next/image";
import { Card, CardContent } from "../../_components/ui/card";
import { Barbershop } from "@prisma/client";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}
const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl bg-accent">
      <CardContent className="flex flex-col p-1">
        <div className="relative h-[159px] w-full ">
          <Image
            src={barbershop.imageUrl}
            fill
            style={{ objectFit: "cover" }}
            alt={barbershop.name}
            className=" w-full rounded-2xl"
          />
        </div>
        <div className="mt-2 flex flex-col px-2 pb-2">
          <h2 className="overflow-hidden text-ellipsis text-nowrap font-bold">
            {barbershop.name}
          </h2>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>
          <div className="mt-1">
            <Link href={`/barbershop/${barbershop.id}`}>
              <Button className="w-full bg-secondary">Reservar</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
