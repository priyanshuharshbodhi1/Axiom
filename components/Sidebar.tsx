"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="hidden relative md:block min-w-[50px] max-w-[50px] h-screen overflow-hidden w-full dark:text-foreground text-muted-foreground border-r-2 border-separate ">
      <div className="flex flex-col items-center justify-center h-full bg-primary/5 dark:bg-secondary/30 border-r-2 border-separate px-2 py-4 space-y-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={`/${route.href}`}
            className={buttonVariants({
              variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
              size: "icon",
            })}
            title={route.label}
          >
            <route.icon size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="block md:hidden fixed top-0 left-0 z-50">
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="m-2">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[280px] space-y-4" side="left">
          <div className="flex flex-col gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={`/${route.href}`}
                className={buttonVariants({
                  variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem",
                })}
                onClick={() => setOpen(false)}
              >
                <route.icon size={20} />
                {route.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default DesktopSidebar;