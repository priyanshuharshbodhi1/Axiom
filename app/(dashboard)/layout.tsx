import CommandCenter from "@/components/CommandCenter";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <CommandCenter />
      <div className="pl-20 pt-16">
        <div className="container py-6 text-accent-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
