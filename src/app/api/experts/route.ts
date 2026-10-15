import { NextResponse } from 'next/server';
import { getExperts } from '@/lib/store';
import { BudgetTier, EngagementModel } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const tool = searchParams.get('tool') || undefined;
  const budget = (searchParams.get('budget') as BudgetTier) || undefined;
  const engagement = (searchParams.get('engagement') as EngagementModel) || undefined;
  const verifiedOnly = searchParams.get('verified') === 'true';
  const query = searchParams.get('q') || undefined;

  const experts = await getExperts({
    category,
    tool,
    budget,
    engagement,
    verifiedOnly,
    query,
  });

  return NextResponse.json({
    total: experts.length,
    experts,
  });
}
