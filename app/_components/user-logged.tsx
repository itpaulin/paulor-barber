"use client";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import EnsureDialog from "./ui/ensure-dialog";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const UserLogged = () => {
  const { data } = useSession();
  const handleLoginClick = async () => {
    await signIn("google");
  };
  const handleLogoutClick = async () => {
    await signOut();
  };

  if (!data?.user) return null;
  return (
    <div className=" flex flex-row items-center">
      <Avatar>
        <AvatarImage src={data.user.image!} alt="@shadcn" />
        <AvatarFallback>{data.user.name}</AvatarFallback>
      </Avatar>
      <span className="px-3 pt-1 font-normal">{data.user.name}</span>

      <EnsureDialog
        text="Deseja mesmo sair da plataforma?"
        confirm="Sair"
        cancel="Cancelar"
        title="Sair"
        action={handleLogoutClick}
      >
        <Button variant="outline" size="icon" className="mt-1">
          <LogOut size={20} />
        </Button>
      </EnsureDialog>
    </div>
  );
};

export default UserLogged;
