-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN "webhookKey" TEXT;

-- AlterTable
ALTER TABLE "WorkflowExecution" ADD COLUMN "webhookPayload" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_webhookKey_key" ON "Workflow"("webhookKey"); 