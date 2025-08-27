import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { workflowId, price, category, tags, screenshots } = body;

    if (!workflowId || !price || !category) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Check if workflow exists and belongs to the user
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        userId,
      },
    });

    if (!workflow) {
      return new NextResponse('Workflow not found or unauthorized', { status: 404 });
    }

    // Create marketplace listing
    const marketplaceWorkflow = await prisma.marketplaceWorkflow.create({
      data: {
        workflowId,
        userId,
        name: workflow.name,
        description: workflow.description || '',
        price,
        category,
        tags: tags || [],
        screenshots: screenshots || [],
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(marketplaceWorkflow);
  } catch (error) {
    console.error('Error listing workflow in marketplace:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where = {
      status: 'ACTIVE',
      ...(category && { category }),
      ...(search && {
        OR: [
          { workflow: { name: { contains: search, mode: 'insensitive' } } },
          { workflow: { description: { contains: search, mode: 'insensitive' } } },
          { tags: { hasSome: [search] } },
        ],
      }),
    };

    const marketplaceWorkflows = await prisma.marketplaceWorkflow.findMany({
      where,
      include: {
        workflow: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(marketplaceWorkflows);
  } catch (error) {
    console.error('Error fetching marketplace workflows:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 