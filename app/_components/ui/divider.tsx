import { cn } from "@/app/_lib/utils";

const Divider = ({ className }: { className?: string | undefined }) => (
  <div className={cn("flex-grow border-separate border-t", className)} />
);
export default Divider;
