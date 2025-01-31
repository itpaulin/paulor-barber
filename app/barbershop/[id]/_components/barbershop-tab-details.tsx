"use client";
import { Button } from "@/app/_components/ui/button";
import { ReactNode, useState } from "react";
interface TabsProps {
  servicesContent: ReactNode;
  infoContent: ReactNode;
}
const BarbershopTabDetails = ({ servicesContent, infoContent }: TabsProps) => {
  const [selected, setSelected] = useState<string>("services");

  const handleInfoClick = () => {
    setSelected("info");
  };
  const handleServiceClick = () => {
    setSelected("services");
  };
  return (
    <div className=" pt-6">
      <div className=" flex flex-row gap-[10px] px-5">
        <Button
          size="sm"
          variant={selected === "services" ? "default" : "outline"}
          onClick={handleServiceClick}
        >
          Serviços
        </Button>
        <Button
          size="sm"
          variant={selected === "info" ? "default" : "outline"}
          onClick={handleInfoClick}
        >
          Informações
        </Button>
      </div>
      <div className="pt-6 ">
        {selected === "services" && servicesContent}
        {selected === "info" && infoContent}
      </div>
    </div>
  );
};

export default BarbershopTabDetails;
