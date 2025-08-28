import React from 'react';
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Topbar from "@/app/workflow/_components/topbar/Topbar";
import WebhooksTab from './webhooks-tab';

export default async function WorkflowSettingsPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return <div>Unauthenticated</div>;
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: params.id,
      userId,
    },
  });

  if (!workflow) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Topbar
        title="Workflow Settings"
        subtitle={workflow.name}
        workflowId={workflow.id}
        hideButtons
      />
      
      <div className="p-6 flex-1 overflow-auto">
        <Tabs defaultValue="webhooks" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          
          <TabsContent value="webhooks">
            <WebhooksTab workflow={workflow} />
          </TabsContent>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  View and update general workflow settings
                </p>
              </div>
              
              <p className="text-muted-foreground">
                More settings coming soon here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 