"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
const formSchema = z.object({
  search: z.string().trim().min(1, "Campo obrigatório"),
});
interface SearchProps {
  search?: string;
}
const Search = ({ search }: SearchProps) => {
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search || "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    route.push(`/barbershop?search=${values.search}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-row  gap-x-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="rounded-xl bg-accent"
                  placeholder=" Buscar"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="default" className="w-[45px] rounded-xl" type="submit">
          <div>
            <SearchIcon size={24} />
          </div>
        </Button>
      </form>
    </Form>
  );
};

export default Search;
