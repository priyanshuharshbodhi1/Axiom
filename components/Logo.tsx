import { cn } from "@/lib/utils";
import { Workflow } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 p-2">
        <Workflow size={iconSize} className="stroke-black" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Axiom
        </span>
      </div>
    </Link>
  );
}

export default Logo;
