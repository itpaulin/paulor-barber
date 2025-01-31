"use client";

import { Button } from "@/app/_components/ui/button";
import { Copy, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

const BarbershopContactPhone = ({ phoneNumber }: { phoneNumber: string }) => {
  // const [copiedText, setCopiedText] = useState("Copiar");

  // const checkNumberIsCopied = async () => {
  //   try {
  //     const clipboard = await navigator.clipboard.readText();
  //     return clipboard === phoneNumber;
  //   } catch {
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const verifyClipboard = async () => {
  //     const numberIsCopied = await checkNumberIsCopied();
  //     setCopiedText(numberIsCopied ? "Copiado!" : "Copiar");
  //   };

  //   verifyClipboard();
  // }, [phoneNumber]); // Atualiza sempre que `phoneNumber` mudar

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <Smartphone size={22} className="text-white" />
        <p>{phoneNumber}</p>
      </div>
      <Button
        onClick={async () => {
          await navigator.clipboard.writeText(phoneNumber);
          // setCopiedText("Copiado!");
        }}
        size="sm"
        // variant={copiedText === "Copiado!" ? "default" : "secondary"}/*  */
        variant="secondary"
        className="rounded-lg"
      >
        Copiar
      </Button>
    </div>
  );
};

export default BarbershopContactPhone;
