'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Expert, Category, Tool } from '@/lib/types';
import ExpertCard from '@/components/ExpertCard';
import FilterBar from '@/components/FilterBar';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface ExpertsDirectoryClientProps {
  allExperts: Expert[];
  categories: Category[];
  tools: Tool[];
}

export default function ExpertsDirectoryClient({
  allExperts,
  categories,
  tools,
}: ExpertsDirectoryClientProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const tool = searchParams.get('tool') || '';
  const budget = searchParams.get('budget') || 'all';
  const engagement = searchParams.get('engagement') || 'all';
  const verifiedOnly = searchParams.get('verified') === 'true';
  const query = searchParams.get('q') || '';

  const filteredExperts = useMemo(() => {
    let list = allExperts.filter((e) => e.status === 'published');

    if (category) {
      list = list.filter((e) => e.categories.some((c) => c.slug === category));
    }
    if (tool) {
      list = list.filter((e) => e.tools.some((t) => t.slug === tool));
    }
    if (budget && budget !== 'all') {
      list = list.filter((e) => e.starting_budget === budget);
    }
    if (engagement && engagement !== 'all') {
      list = list.filter((e) => e.primary_engagement === engagement);
    }
    if (verifiedOnly) {
      list = list.filter((e) => e.is_verified);
    }
    if (query) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.full_name.toLowerCase().includes(q) ||
          e.tagline.toLowerCase().includes(q) ||
          e.bio.toLowerCase().includes(q) ||
          (e.agency_name && e.agency_name.toLowerCase().includes(q)) ||
          e.city.toLowerCase().includes(q) ||
          e.categories.some((c) => c.name.toLowerCase().includes(q)) ||
          e.tools.some((t) => t.name.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allExperts, category, tool, budget, engagement, verifiedOnly, query]);

  return (
    <>
      {/* Filter Bar */}
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

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 text-sm text-[#5e6d55]">
        <div>
          Showing <span className="font-bold text-[#001e00]">{filteredExperts.length}</span> AI expert{filteredExperts.length === 1 ? '' : 's'}
          {verifiedOnly && <span className="text-[#108a00] font-bold"> (Verified Only)</span>}
        </div>
        <div className="text-[#5e6d55] hidden sm:block font-medium">
          Ranked by sponsorship &amp; verified case study evidence
        </div>
      </div>

      {/* Grid */}
      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl p-12 text-center border border-[#e4ebe4] bg-white max-w-xl mx-auto my-12 shadow-xs">
          <SearchX className="w-14 h-14 text-[#889888] mx-auto mb-4" />
          <h3 className="text-xl font-black text-[#001e00] mb-2">No AI Experts Found</h3>
          <p className="text-base text-[#475569] mb-6 leading-relaxed">
            No experts currently match your exact filter combination. Try clearing some filters or search keywords.
          </p>
          <Link
            href="/experts"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#108a00] text-white text-sm font-bold shadow-xs hover:bg-[#14a800] transition-colors"
          >
            Reset All Filters
          </Link>
        </div>
      )}
    </>
  );
}
