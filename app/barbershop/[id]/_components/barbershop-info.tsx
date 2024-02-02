"use client";
import Menu from "@/app/_components/menu";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const route = useRouter();
  const handleBackClick = () => {
    route.push("/");
  };
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <div className="absolute right-4 top-4 z-50 ">
          <Menu buttonSize="h-10 w-10 rounded-lg" />
        </div>
        <div className="absolute left-4 top-4 z-50">
          <Button
            size="icon"
            variant="outline"
            className="rounded-lg"
            onClick={handleBackClick}
          >
            <ChevronLeftIcon size={20} />
          </Button>
        </div>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>
      <div className="px-5">
        <h1 className="py-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-1 text-sm">
            <MapPin size={16} className="text-primary" />
            <p>{barbershop.address}</p>
          </div>
          <div className="flex flex-row items-center gap-1 text-sm">
            <Star size={16} className="text-primary" />
            <p>5,0 (478 avaliações)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
