const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create a test workflow
  const workflow = await prisma.workflow.create({
    data: {
      userId: 'test-user-1',
      name: 'Data Processing Pipeline',
      description: 'A powerful workflow for processing and analyzing large datasets',
      definition: '{}',
      status: 'PUBLISHED',
    },
  });

  // Create a marketplace listing for the workflow
  await prisma.marketplaceWorkflow.create({
    data: {
      workflowId: workflow.id,
      userId: 'test-user-1',
      name: 'Data Processing Pipeline',
      description: 'A powerful workflow for processing and analyzing large datasets',
      price: 29.99,
      category: 'Data',
      tags: ['data', 'automation', 'analysis'],
      screenshots: ['/screenshots/workflow1.png'],
      status: 'PUBLISHED',
    },
  });

  // Create another workflow
  const workflow2 = await prisma.workflow.create({
    data: {
      userId: 'test-user-2',
      name: 'API Integration Workflow',
      description: 'Automate API integrations and data synchronization',
      definition: '{}',
      status: 'PUBLISHED',
    },
  });

  // Create a marketplace listing for the second workflow
  await prisma.marketplaceWorkflow.create({
    data: {
      workflowId: workflow2.id,
      userId: 'test-user-2',
      name: 'API Integration Workflow',
      description: 'Automate API integrations and data synchronization',
      price: 49.99,
      category: 'Integration',
      tags: ['api', 'integration', 'automation'],
      screenshots: ['/screenshots/workflow2.png'],
      status: 'PUBLISHED',
    },
  });

  console.log('Test data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 