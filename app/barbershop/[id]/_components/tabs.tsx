"use client";
import { Button } from "@/app/_components/ui/button";
import { ReactNode, useState } from "react";
interface TabsProps {
  servicesContent: ReactNode;
  infoContent: ReactNode;
}
const Tabs = ({ servicesContent, infoContent }: TabsProps) => {
  const [selected, setSelected] = useState<string>("services");

  const handleInfoClick = () => {
    setSelected("info");
  };
  const handleServiceClick = () => {
    setSelected("services");
  };
  return (
    <div className="px-5 pt-6">
      <div className="flex flex-row gap-[10px]">
        <Button
          variant={selected === "services" ? "default" : "outline"}
          onClick={handleServiceClick}
        >
          Serviços
        </Button>
        <Button
          variant={selected === "info" ? "default" : "outline"}
          onClick={handleInfoClick}
        >
          Informações
        </Button>
      </div>
      <div className="pt-6">
        {selected === "services" && servicesContent}
        {selected === "info" && infoContent}
      </div>
    </div>
  );
};

export default Tabs;
