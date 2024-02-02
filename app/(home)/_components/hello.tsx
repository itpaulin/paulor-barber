"use client";

import { useSession } from "next-auth/react";

const Hello = () => {
  const { data } = useSession();
  return (
    <p className="text-xl">
      Olá,&nbsp;
      <span className="font-semibold">
        {data?.user?.name ? data.user.name.split(" ")[0] : "Faça Login"}!
      </span>
    </p>
  );
};

export default Hello;
