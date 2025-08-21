"use client";


import { Button } from "@/components/ui/button";

import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function RunBtn({ workflowId }: { workflowId: string }) {
  
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2"
      
      onClick={() => {
        
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}
