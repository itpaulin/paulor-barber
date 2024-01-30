"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <Input className="rounded-xl" placeholder=" Buscar" />
      <Button variant="default">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
