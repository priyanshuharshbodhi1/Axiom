import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { 
  ExecutionPhaseStatus, 
  WorkflowExecutionPlan, 
  WorkflowExecutionStatus, 
  WorkflowExecutionTrigger,
  WorkflowStatus
} from "@/types/workflow";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get webhook key from URL parameters
    const { searchParams } = new URL(request.url);
    const webhookKey = searchParams.get("key");
    const workflowId = searchParams.get("workflowId");

    if (!webhookKey || !workflowId) {
      return Response.json({ error: "Missing webhook key or workflow ID" }, { status: 400 });
    }

    // Find the workflow associated with this webhook key
    const workflow = await prisma.workflow.findUnique({
      where: {
        id: workflowId,
        status: WorkflowStatus.PUBLISHED,
      }
    });

    if (!workflow) {
      return Response.json({ error: "Workflow not found" }, { status: 404 });
    }

    // Parse the webhook payload
    const webhookData = await request.json();

    // Get or create an execution plan
    let executionPlan: WorkflowExecutionPlan;
    if (workflow.executionPlan) {
      executionPlan = JSON.parse(workflow.executionPlan);
    } else {
      const flow = JSON.parse(workflow.definition);
      const result = FlowToExecutionPlan(flow.nodes, flow.edges);
      if (result.error || !result.executionPlan) {
        return Response.json({ error: "Invalid workflow definition" }, { status: 400 });
      }
      executionPlan = result.executionPlan;
    }

    // Create a new workflow execution
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId: workflow.id,
        userId: workflow.userId,
        definition: workflow.definition,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.WEBHOOK,
        webhookPayload: JSON.stringify(webhookData),
        phases: {
          create: executionPlan.flatMap((phase) => {
            return phase.nodes.flatMap((node) => {
              return {
                userId: workflow.userId,
                status: ExecutionPhaseStatus.CREATED,
                number: phase.phase,
                node: JSON.stringify(node),
                name: TaskRegistry[node.data.type].label,
              };
            });
          }),
        },
      },
    });

    // Trigger workflow execution
    const triggerApiUrl = getAppUrl(
      `api/workflows/execute?executionId=${execution.id}`
    );

    fetch(triggerApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET!}`,
      },
      cache: "no-store",
    }).catch((error) =>
      console.error(
        "Error triggering webhook workflow with id",
        workflowId,
        ":error->",
        error.message
      )
    );

    return Response.json({ 
      success: true, 
      executionId: execution.id 
    }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook execution error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
} 