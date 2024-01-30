import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="rounded-xl bg-accent ">
      <CardContent className="flex flex-row items-stretch justify-between p-0">
        <div>
          <div className="pt-3">
            <Badge className="text-primary-figma ml-3 bg-orange-900 hover:text-orange-300">
              Confirmado
            </Badge>
          </div>
          <div className="flex flex-col gap-y-2 px-3 py-3">
            <p className="text-2xl font-semibold">Corte de Cabelo</p>
            <div className="flex flex-row items-center gap-x-2">
              <Avatar>
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-xl opacity-80">Vintage Barber</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-l-2 border-secondary px-9 py-7 text-center">
          <p className="text-md">Fevereiro</p>
          <p className="text-3xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
