import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const workflowsWithStats = workflows.map(workflow => ({
      ...workflow,
      rating: workflow.reviews.reduce((acc, review) => acc + review.rating, 0) / workflow.reviews.length || 0,
      reviewCount: workflow.reviews.length,
    }));

    return NextResponse.json(workflowsWithStats);
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workflows' },
      { status: 500 }
    );
  }
} 