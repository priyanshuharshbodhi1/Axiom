import { NextRequest } from "next/server";
import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET environment variable is not set");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const workflows = await prisma.workflow.findMany({
      select: { id: true },
      where: {
        status: WorkflowStatus.PUBLISHED,
        cron: { not: null },
        nextRunAt: { lte: now },
      },
    });

    console.log(`Found ${workflows.length} workflows to trigger at ${now.toISOString()}`);

    for (const workflow of workflows) {
      triggerWorkflow(workflow.id);
    }

    return Response.json({ 
      success: true,
      workflowsTriggered: workflows.length,
      timestamp: now.toISOString()
    }, { status: 200 });

  } catch (error) {
    console.error("Error in external cron handler:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function triggerWorkflow(workflowId: string) {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET!}`,
    },
    cache: "no-store",
  }).catch((error) =>
    console.error(
      "Error triggering workflow with id",
      workflowId,
      ":error->",
      error.message
    )
  );
}
