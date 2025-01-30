"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import Link from "next/link";

import Menu from "./menu";

import ShortsDesktop from "./shorts-desktop";

const Header = () => {
  return (
    <Card className="rounded-none border-x-0 bg-[#141518] md:px-24 lg:px-32">
      <CardContent className="flex h-[90px] w-full flex-row items-center justify-between px-5 py-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo PauloR Barber"
            width={130}
            height={0}
          />
        </Link>
        {/* Only in desktop */}
        <ShortsDesktop />
        {/* Only in mobile */}

        <Menu />
      </CardContent>
    </Card>
  );
};

export default Header;
