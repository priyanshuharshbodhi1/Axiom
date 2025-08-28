"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAppUrl } from "@/lib/helper/appUrl";
import { generateWebhookKey } from "@/actions/workflows/generateWebhookKey";
import { Workflow } from "@prisma/client";
import { useState } from "react";
import { CopyIcon, RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

interface WebhooksTabProps {
  workflow: Workflow;
}

export default function WebhooksTab({ workflow }: WebhooksTabProps) {
  const [webhookKey, setWebhookKey] = useState<string | null>(workflow.webhookKey);
  const [isGenerating, setIsGenerating] = useState(false);

  const webhookUrl = webhookKey
    ? getAppUrl(`api/workflows/webhook?key=${webhookKey}&workflowId=${workflow.id}`)
    : null;

  const handleGenerateKey = async () => {
    try {
      setIsGenerating(true);
      const result = await generateWebhookKey(workflow.id);
      setWebhookKey(result.webhookKey);
      toast.success("Webhook key generated successfully");
    } catch (error) {
      toast.error("Failed to generate webhook key");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Webhook Integration</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Configure webhook triggers for this workflow
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook URL</CardTitle>
          <CardDescription>
            Use this URL to trigger the workflow via HTTP POST requests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!webhookKey ? (
            <div className="flex flex-col space-y-2">
              <p className="text-sm">
                Generate a webhook key to create a unique URL for this workflow
              </p>
              <Button
                onClick={handleGenerateKey}
                disabled={isGenerating}
                className="w-fit"
              >
                {isGenerating ? (
                  <>
                    <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Webhook Key"
                )}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Webhook URL</label>
                <div className="flex">
                  <Input
                    value={webhookUrl || ""}
                    readOnly
                    className="flex-1 font-mono text-xs"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => webhookUrl && copyToClipboard(webhookUrl)}
                    className="ml-2"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">How to use</h4>
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-xs mb-2">Send a POST request to the webhook URL:</p>
                  <div className="relative">
                    <pre className="text-xs overflow-x-auto p-2 bg-background rounded-sm">
                      {`curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello from webhook!"}'`}
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={() => copyToClipboard(`curl -X POST "${webhookUrl}" -H "Content-Type: application/json" -d '{"message": "Hello from webhook!"}'`)}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Using webhook data in Input Text</h4>
                <p className="text-xs text-muted-foreground">
                  To access specific fields from your webhook payload in an Input Text node,
                  use the format <code className="text-xs">{"{{fieldName}}"}</code> or 
                  <code className="text-xs">{"{{nested.field.name}}"}</code> for nested fields.
                </p>
              </div>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleGenerateKey}
                >
                  Regenerate Key
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  Warning: This will invalidate the current webhook URL.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 