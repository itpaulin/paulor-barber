import { Service } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Decimal } from "@prisma/client/runtime/library";

interface SchedulingCardProps {
  serviceName: string;
  servicePrice: Decimal;
  date: Date;
  time: string;
  barbershopName: string;
}
const SchedulingCard = ({
  barbershopName,
  date,
  serviceName,
  time,
  servicePrice,
}: SchedulingCardProps) => {
  return (
    <Card className=" rounded-lg border border-gray-800">
      <CardContent className="flex flex-col gap-3 rounded-lg bg-secondary p-3">
        <div className="flex flex-row justify-between">
          <h2>{serviceName}</h2>
          <h3>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(servicePrice))}
          </h3>
        </div>

        <div className="flex flex-row justify-between text-sm font-light">
          <h3 className=" text-gray-500">Data</h3>
          <h4>{date && format(date, "dd 'de' MMMM", { locale: ptBR })}</h4>
        </div>

        <div className="flex flex-row justify-between text-sm font-light">
          <h3 className=" text-gray-500">Horário</h3>
          <h4>{time}</h4>
        </div>

        <div className="flex flex-row justify-between  text-sm font-light">
          <h3 className=" text-gray-500">Barbearia</h3>
          <h4>{barbershopName}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchedulingCard;
