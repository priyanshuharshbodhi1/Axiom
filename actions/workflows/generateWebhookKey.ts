"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function generateWebhookKey(workflowId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  // Check if the workflow exists and belongs to the user
  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  // Generate a secure random webhook key
  const webhookKey = randomBytes(32).toString("hex");

  // Save the webhook key
  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      webhookKey,
    },
  });

  return { webhookKey };
} 