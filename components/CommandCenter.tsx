"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  GitBranchIcon,
  StoreIcon,
  KeyRoundIcon,
  ChevronRightIcon,
} from "lucide-react";
import UserAvailableCreditsBadge from "@/components/UserAvailableCreditsBadge";
import Logo from "@/components/Logo";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";

const navigationItems = [
  {
    href: "",
    label: "Home",
    icon: LayoutDashboardIcon,
    description: "Dashboard & Analytics",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: GitBranchIcon,
    description: "Automation & Processes",
    color: "from-blue-400 to-blue-500",
  },
  {
    href: "marketplace",
    label: "Marketplace",
    icon: StoreIcon,
    description: "Discover & Install",
    color: "from-green-400 to-green-500",
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: KeyRoundIcon,
    description: "Security & Access",
    color: "from-purple-400 to-purple-500",
  },
];

export default function CommandCenter() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const activeRoute =
    navigationItems.find(
      (item) => item.href.length > 0 && pathname.includes(item.href)
    ) || navigationItems[0];

  return (
    <>
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Logo fontSize="text-2xl" iconSize={20} />
            <div className="h-6 w-px bg-border" />
            <UserAvailableCreditsBadge />
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Left Sidebar with Navigation Bubbles */}
      <div className="fixed left-0 top-16 bottom-0 z-40 w-20 bg-background/95 backdrop-blur-sm border-r border-border">
        <div className="flex flex-col items-center py-4 gap-4">
          
          {/* Navigation Bubbles */}
          {navigationItems.map((item, index) => {
            const isActive = activeRoute.href === item.href;
            const isHovered = hoveredItem === item.href;
            
            return (
              <Link
                key={item.href}
                href={`/${item.href}`}
                className={cn(
                  "relative group transition-all duration-500 ease-out",
                  "hover:scale-110 active:scale-95"
                )}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Main Bubble */}
                <div
                  className={cn(
                    "relative flex items-center justify-center w-12 h-12 rounded-full",
                    "transition-all duration-500 ease-out",
                    "shadow-lg hover:shadow-xl",
                    "border-2",
                    isActive
                      ? `bg-gradient-to-br ${item.color} text-white border-white/30`
                      : "bg-card/80 hover:bg-card border-border hover:border-primary/30 backdrop-blur-sm",
                    isHovered && "ring-2 ring-primary/20"
                  )}
                >
                  <item.icon 
                    size={20} 
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "text-white" : "text-foreground"
                    )} 
                  />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                  )}
                </div>

                {/* Compact Info Panel */}
                {/* Hover Info Panel */}
                {isHovered && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 z-50 bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px] max-w-[250px] animate-in slide-in-from-left-2 duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} flex-shrink-0`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">{item.label}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{item.description}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
