import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="max-h-[111px] rounded-xl bg-accent">
      <CardContent className="flex flex-row items-stretch justify-between p-0">
        <div>
          <div className="pt-3">
            <Badge className="text-primary-figma ml-3 bg-orange-900 hover:text-orange-300">
              Confirmado
            </Badge>
          </div>
          <div className="flex flex-col gap-y-2 px-3 pb-4 pt-2">
            <p className="text-[1rem] font-semibold">Corte de Cabelo</p>
            <div className="flex flex-row items-center gap-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-[0.875rem] opacity-80">Vintage Barber</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-l-2 border-secondary px-9 pt-5 text-center">
          <p className="text-[0.75rem]">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-[0.75rem]">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
