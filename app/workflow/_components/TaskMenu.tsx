"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/task";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon, ChevronLeft, ChevronRight } from "lucide-react";
import TooltipWrapper from "@/components/TooltipWrapper";

export default function TaskMenu() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside className={`${isCollapsed ? 'w-12 min-w-12 max-w-12' : 'w-[340px] min-w-[340px] max-w-[340px]'} border-r-2 border-separate h-full transition-all duration-300 ease-in-out relative`}>
      <div className={`${isCollapsed ? 'p-2' : 'p-2 px-4'} h-full overflow-auto`}>
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h2 className="font-semibold text-lg">Tasks</h2>}
          <TooltipWrapper content={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </TooltipWrapper>
        </div>
        {!isCollapsed && (
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={[
          "extraction",
          "interactions",
          "timing",
          "results",
          "storage",
          "agents",
        ]}
      >
        <AccordionItem value="agents">
          <AccordionTrigger className="font-bold">
            AI Agents
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.AGENT} />
            {/* <TaskMenuBtn taskType={TaskType.AGENT_WITH_SAFE_WALLET} /> */}
            <TaskMenuBtn taskType={TaskType.TELEGRAM_AGENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="results">
          <AccordionTrigger className="font-bold">
            Result delivery
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.TELEGRAM} />
            <TaskMenuBtn taskType={TaskType.DELIVER_VIA_WEBHOOK} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        )}
      </div>
    </aside>
  );
}

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex justify-between items-center gap-2 border w-full"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
      <Badge className="gap-2 flex items-center" variant={"outline"}>
        <CoinsIcon size={16} />
        {task.credits}
      </Badge>
    </Button>
  );
}
