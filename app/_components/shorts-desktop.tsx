"use client";

import { CalendarDays, UserCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserLogged from "./user-logged";

const ShortsDesktop = () => {
  const { data } = useSession();
  const handleLoginClick = async () => {
    await signIn("google");
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  return (
    <div className="hidden items-center justify-center space-x-6 md:flex">
      {data?.user && (
        <Link href="/bookings">
          <Button variant="outline" className="gap-3 font-bold" size="sm">
            <CalendarDays size={"16"} />
            Agendamentos
          </Button>
        </Link>
      )}
      {data?.user ? (
        <UserLogged />
      ) : (
        <Button
          size="sm"
          onClick={() => {
            handleLoginClick();
          }}
        >
          <UserCircle2 />
          Perfil
        </Button>
      )}
    </div>
  );
};

export default ShortsDesktop;
