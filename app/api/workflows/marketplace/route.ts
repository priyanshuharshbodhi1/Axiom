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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const sortBy = searchParams.get('sortBy') || 'popular';

    let whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (category !== 'all') {
      whereClause.category = category;
    }
    whereClause.status = 'ACTIVE';

    let orderBy: any = {};
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      default:
        orderBy = { rating: 'desc' };
    }

    const workflows = await prisma.marketplaceWorkflow.findMany({
      where: whereClause,
      orderBy,
      include: {
        workflow: {
          select: {
            userId: true,
            name: true,
            description: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const workflowsWithStats = workflows.map(workflow => ({
      ...workflow,
      rating: workflow.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / workflow.reviews.length || 0,
      reviewCount: workflow.reviews.length,
    }));

    return NextResponse.json(workflowsWithStats);
  } catch (error) {
    console.error('Error fetching marketplace workflows:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketplace workflows' },
      { status: 500 }
    );
  }
} 