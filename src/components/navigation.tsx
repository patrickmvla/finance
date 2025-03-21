"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import NavButton from "./nav-button";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transaction",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max:width: 1024px)", false);

  const handleClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button
          variant="outline"
          size={"sm"}
          onClick={() => setIsOpen(!isOpen)}
          className="font-normal bg-white/10 hover:text-white border-none focus:visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-2">
        <nav className="flex flex-col gap-y-2 pt-6">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.href === pathname ? "secondary" : "ghost"}
              onClick={() => handleClick(route.href)}
              className="w-full justify-start"
            >
              {route.label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>;
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};

export default Navigation;
