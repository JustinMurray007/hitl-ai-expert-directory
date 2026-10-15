import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
import FilterBar from '@/components/FilterBar';
import { ShieldCheck, SearchX } from 'lucide-react';
import { BudgetTier, EngagementModel } from '@/lib/types';
import Link from 'next/link';

interface ExpertsPageProps {
  searchParams: Promise<{
    category?: string;
    tool?: string;
    budget?: string;
    engagement?: string;
    verified?: string;
    q?: string;
  }>;
}

import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Browse Verified AI Specialists & Agencies | HITL Directory',
  description: 'Search vetted AI automation consultants, conversational voice engineers, and applied AI developers. Filter by category, tool stack, budget, and verification.',
};

export default async function ExpertsPage({ searchParams }: ExpertsPageProps) {
  const params = await searchParams;
  const category = params.category || '';
  const tool = params.tool || '';
  const budget = params.budget || 'all';
  const engagement = params.engagement || 'all';
  const verifiedOnly = params.verified === 'true';
  const query = params.q || '';

  const [categories, tools, experts] = await Promise.all([
    getCategories(),
    getTools(),
    getExperts({
      category: category || undefined,
      tool: tool || undefined,
      budget: budget !== 'all' ? (budget as BudgetTier) : undefined,
      engagement: engagement !== 'all' ? (engagement as EngagementModel) : undefined,
      verifiedOnly,
      query: query || undefined,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Curated AI Specialist Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Find Vetted AI Automation Specialists
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Every specialist listed below has disclosed their exact human fallback mechanism. Specialists with the green &apos;Verified&apos; badge have passed identity verification and had at least two production case studies reviewed.
        </p>
      </div>

      {/* Filter Bar */}
      <Suspense fallback={<div className="h-32 rounded-2xl bg-zinc-900/50 animate-pulse mb-8" />}>
        <FilterBar
          categories={categories}
          tools={tools}
          initialCategory={category}
          initialTool={tool}
          initialBudget={budget}
          initialEngagement={engagement}
          initialVerified={verifiedOnly}
          initialQuery={query}
        />
      </Suspense>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
        <div>
          Showing <span className="font-bold text-white">{experts.length}</span> specialist{experts.length === 1 ? '' : 's'}
          {verifiedOnly && <span className="text-emerald-400 font-semibold"> (Verified Only)</span>}
        </div>
        <div className="text-zinc-500 hidden sm:block">
          Ranked by sponsorship & verified case study evidence
        </div>
      </div>

      {/* Grid */}
      {experts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center border border-white/[0.08] bg-[#11131c]/60 max-w-xl mx-auto my-12">
          <SearchX className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Specialists Found</h3>
          <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
            No specialists currently match your exact filter combination. Try clearing some filters or search keywords.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/experts"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
            >
              Reset All Filters
            </Link>
            <Link
              href="/match"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-md transition-colors"
            >
              Request Custom Match
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
