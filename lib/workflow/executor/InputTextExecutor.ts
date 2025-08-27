import { InputTextTask } from "@/lib/workflow/task/InputText";
import { ExecutionEnvironment } from "@/types/executor";
import { WorkflowExecutionTrigger } from "@/types/workflow";
import prisma from "@/lib/prisma";

export async function InputTextExecutor(
  environment: ExecutionEnvironment<typeof InputTextTask>
): Promise<boolean> {
  try {
    // Get the execution to check if it was triggered by a webhook
    const execution = await prisma.workflowExecution.findUnique({
      where: { id: environment.executionId },
      select: { trigger: true, webhookPayload: true }
    });

    // Use webhook payload if this was triggered by a webhook and payload exists
    let text: string;
    if (execution?.trigger === WorkflowExecutionTrigger.WEBHOOK && execution.webhookPayload) {
      // Parse the webhook payload
      const webhookData = JSON.parse(execution.webhookPayload);
      
      // Use a configured text parameter from the input, or use the entire payload
      const inputText = environment.getInput("Input text");
      if (inputText && inputText.startsWith("{{") && inputText.endsWith("}}")) {
        // Extract the path from between the {{ }}
        const path = inputText.substring(2, inputText.length - 2).trim();
        // Use the path to extract data from the webhook payload
        text = getNestedValue(webhookData, path) || JSON.stringify(webhookData);
      } else {
        // Use the entire webhook payload if no specific path is provided
        text = JSON.stringify(webhookData);
      }
    } else {
      // Use the regular input text for manual runs
      text = environment.getInput("Input text") || "";
    }

    environment.log.info(`Input text: ${text}`);
    environment.setOutput("Text", text);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}

// Helper function to get a nested value from an object using a dot notation path
function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }
  
  return typeof current === 'object' ? JSON.stringify(current) : String(current);
}
