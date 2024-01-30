import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Calendar, CalendarDaysIcon, Home, LogIn, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Card>
        <CardContent className="flex h-[90px] w-full flex-row items-center justify-between px-5 py-6">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo PauloR Barber"
              width={130}
              height={0}
              className=""
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mb-7 flex justify-start">
                <h1 className="font-semibold">Menu</h1>
              </div>
              <div className="absolute right-0 w-full border border-accent"></div>
              <div className="mb-6">
                <div className=" flex flex-row pb-3 pt-6">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="px-3 pt-2 font-normal">
                    Olá. Faça seu login!
                  </span>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="flex w-full items-center  justify-start gap-x-2 rounded-xl"
                  >
                    <LogIn size={16} />
                    Fazer Login
                  </Button>
                </div>
              </div>

              <div className=" flex w-full flex-col gap-y-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="flex w-full items-center  justify-start gap-x-2 rounded-xl"
                  >
                    <Home size={16} />
                    Início
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-start gap-x-2 rounded-xl"
                  >
                    <CalendarDaysIcon size={16} />
                    Agendamentos
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
