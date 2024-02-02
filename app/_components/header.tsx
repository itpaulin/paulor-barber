"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import Link from "next/link";

import Menu from "./menu";

const Header = () => {
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
        <Menu />
      </CardContent>
    </Card>
  );
};

export default Header;
