import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { AvatarFallback } from "./ui/avatar";
const BarbershopCard = ({ barbershop }: { barbershop: Barbershop }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Imagem de fundo */}
      <div className="h-[160px] w-full">
        <Image
          src="/mapa.png"
          alt="Mapa"
          fill
          className="z-[-1] object-cover"
        />
      </div>

      {/* Card sobreposto, sem absolute */}
      <div className="z-1 -mt-16 flex w-full justify-center px-3 pb-3">
        <Card className="w-full max-w-[90%] bg-zinc-900 shadow-lg">
          <CardContent className="px-3 py-2">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>{barbershop.name}</AvatarFallback>
                <AvatarImage
                  className="h-10 w-10 rounded-full"
                  src={barbershop.imageUrl}
                />
              </Avatar>
              <div className="flex flex-col overflow-x-hidden">
                <p className="text-[1rem] font-semibold">{barbershop.name}</p>
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <p className="truncate text-[0.8rem] text-gray-300">
                        {barbershop.address}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[95vw]">
                      {barbershop.address}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BarbershopCard;
