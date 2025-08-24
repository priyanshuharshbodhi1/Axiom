import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, Brain } from "lucide-react";

export const AgentTask = {
  type: TaskType.AGENT,
  label: "Agent",
  icon: (props: LucideProps) => (
    <Brain className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  isAgent: true,
  credits: 2,
  inputs: [
    {
      name: "System Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
  },
    {
        name: "Context",
        type: TaskParamType.STRING,
        required: false,
        variant: "textarea",
    },
    {
      name: "Prompt",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  plugins: [],
  outputs: [
    {
      name: "Response",
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
