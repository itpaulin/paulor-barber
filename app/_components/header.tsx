"use client";
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
import {
  Calendar,
  CalendarDaysIcon,
  Home,
  LogIn,
  LogOut,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import EnsureDialog from "./ui/ensure-dialog";

const Header = () => {
  const { data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  return (
    <Card className="rounded-none bg-[#141518]">
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
              {data?.user ? (
                <div className=" flex flex-row items-center pt-6">
                  <Avatar>
                    <AvatarImage src={data.user.image!} alt="@shadcn" />
                    <AvatarFallback>{data.user.name}</AvatarFallback>
                  </Avatar>
                  <span className="px-3 pt-1 font-normal">
                    {data.user.name}
                  </span>

                  <EnsureDialog
                    text="Deseja mesmo sair da plataforma?"
                    confirm="Sair"
                    cancel="Cancelar"
                    title="Sair"
                    action={handleLogoutClick}
                  >
                    <Button variant="outline" size="icon" className="pt-1">
                      <LogOut size={20} />
                    </Button>
                  </EnsureDialog>
                </div>
              ) : (
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
              )}
              <div>
                {!data?.user && (
                  <Button
                    variant="outline"
                    className="flex w-full items-center  justify-start gap-x-2 rounded-xl"
                    onClick={handleLoginClick}
                  >
                    <LogIn size={16} />
                    Fazer Login
                  </Button>
                )}
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
                  disabled={!data?.user}
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
  );
};

export default Header;
