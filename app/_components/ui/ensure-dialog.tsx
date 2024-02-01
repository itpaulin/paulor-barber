import { Copy } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ReactNode } from "react";
import { Input } from "./input";
interface EnsureDialogProps {
  text: string;
  cancel: string;
  confirm: string;
  title: string;
  children: ReactNode;
  action: () => void;
}
const EnsureDialog = ({
  text,
  cancel,
  confirm,
  children,
  title,
  action,
}: EnsureDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex w-4/5 flex-col gap-5 rounded-2xl sm:max-w-md">
        <DialogHeader className="gap-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-[10px] sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="rounded-xl bg-accent">
              {cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="rounded-xl"
            variant="destructive"
            onClick={action}
          >
            {confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EnsureDialog;
