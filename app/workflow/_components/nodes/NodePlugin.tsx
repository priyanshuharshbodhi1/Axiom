"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/task";
import { PlusIcon, PuzzleIcon } from "lucide-react";
import PluginStoreModal from "./PluginStoreModal";

function NodePlugin({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPlugins, setSelectedPlugins] = useState<string[]>([]);
  const task = TaskRegistry[taskType];

  if (!task.isAgent) {
    return null;
  }

  const openPluginStore = () => setModalOpen(true);
  const closePluginStore = () => setModalOpen(false);

  const handlePluginUpdate = (plugins: string[]) => {
    setSelectedPlugins(plugins);
    // Here you might want to add logic to persist the plugin selection
    // for the specific nodeId
  };

  const displayPlugins = selectedPlugins.length > 0 ? selectedPlugins : task.plugins || [];

  return (
    <>
      <div className={cn("flex flex-col gap-2 relative p-3 bg-secondary w-full")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PuzzleIcon size={16} />
            <p className="text-xs font-bold text-muted-foreground">Plugins</p>
          </div>
          <Button variant="ghost" size="icon" onClick={openPluginStore}>
            <PlusIcon size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pl-6">
          {displayPlugins.map((plugin) => (
            <Badge key={plugin}>{plugin}</Badge>
          ))}
        </div>
      </div>
      <PluginStoreModal
        isOpen={isModalOpen}
        onClose={closePluginStore}
        plugins={displayPlugins}
        onPluginUpdate={handlePluginUpdate}
      />
    </>
  );
}

export default NodePlugin;
