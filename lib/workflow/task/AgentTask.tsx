import { chainList } from "@/lib/chains";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, Bot } from "lucide-react";

export const AgentTask = {
  type: TaskType.AGENT,
  label: "Axiom Agent",
  icon: (props: LucideProps) => (
    <Bot className="stroke-blue-500" {...props} />
  ),
  isEntryPoint: false,
  isAgent: true,
  credits: 2,
  inputs: [
    {
      name: "Wallet",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Chain",
      type: TaskParamType.SELECT,
      required: true,
      variant: "select",
      options: chainList,
    },
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
