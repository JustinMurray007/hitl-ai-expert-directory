import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
import FilterBar from '@/components/FilterBar';
import { ShieldCheck, SearchX } from 'lucide-react';
import { BudgetTier, EngagementModel } from '@/lib/types';
import Link from 'next/link';
import { Suspense } from 'react';

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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Curated AI Specialist Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#001e00] tracking-tight">
          Find Vetted AI Automation Specialists
        </h1>
        <p className="text-sm text-[#5e6d55] mt-2 max-w-2xl font-medium">
          Every specialist listed below has disclosed their exact human fallback mechanism. Specialists with the green &apos;Verified&apos; badge have passed identity verification and had at least two production case studies reviewed.
        </p>
      </div>

      {/* Filter Bar */}
      <Suspense fallback={<div className="h-32 rounded-2xl bg-white border border-[#e4ebe4] animate-pulse mb-8" />}>
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
      <div className="flex items-center justify-between mb-6 text-xs text-[#5e6d55]">
        <div>
          Showing <span className="font-bold text-[#001e00]">{experts.length}</span> specialist{experts.length === 1 ? '' : 's'}
          {verifiedOnly && <span className="text-[#108a00] font-bold"> (Verified Only)</span>}
        </div>
        <div className="text-[#738273] hidden sm:block font-medium">
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
        <div className="rounded-2xl p-12 text-center border border-[#e4ebe4] bg-white max-w-xl mx-auto my-12 shadow-xs">
          <SearchX className="w-12 h-12 text-[#889888] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#001e00] mb-2">No Specialists Found</h3>
          <p className="text-xs text-[#5e6d55] mb-6 leading-relaxed">
            No specialists currently match your exact filter combination. Try clearing some filters or search keywords.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/experts"
              className="px-5 py-2.5 rounded-full bg-[#f4f6f4] hover:bg-[#e4ebe4] text-[#001e00] text-xs font-bold transition-colors"
            >
              Reset All Filters
            </Link>
            <Link
              href="/match"
              className="px-5 py-2.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white text-xs font-bold shadow-xs transition-colors"
            >
              Request Custom Match
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
