import { chainList } from "@/lib/chains";
import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, Brain } from "lucide-react";

export const AgentWithSafeWalletTask = {
  type: TaskType.AGENT_WITH_SAFE_WALLET,
  label: "Agent with Safe Wallet",
  icon: (props: LucideProps) => (
    <Brain className="stroke-green-400" {...props} />
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
