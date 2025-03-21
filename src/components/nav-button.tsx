import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

const NavButton = ({ href, label, isActive }: Props) => (
  <Button
    variant="outline"
    asChild
    size={"sm"}
    className={cn(
      "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white ",
      isActive ? "bg-white/10 text-white" : "bg-transparent"
    )}
  >
    <Link href={href}>{label}</Link>
  </Button>
);

export default NavButton;
