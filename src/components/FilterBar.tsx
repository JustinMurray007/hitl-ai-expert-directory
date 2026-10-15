'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Category, Tool } from '@/lib/types';
import { Search, ShieldCheck, X } from 'lucide-react';

interface FilterBarProps {
  categories: Category[];
  tools: Tool[];
  initialCategory?: string;
  initialTool?: string;
  initialBudget?: string;
  initialEngagement?: string;
  initialVerified?: boolean;
  initialQuery?: string;
}

export default function FilterBar({
  categories,
  tools,
  initialCategory = '',
  initialTool = '',
  initialBudget = 'all',
  initialEngagement = 'all',
  initialVerified = false,
  initialQuery = '',
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [selectedTool, setSelectedTool] = useState(initialTool);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);
  const [selectedEngagement, setSelectedEngagement] = useState(initialEngagement);
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerified);

  const applyFilters = (overrides?: Partial<{
    query: string;
    cat: string;
    tool: string;
    budget: string;
    engagement: string;
    verified: boolean;
  }>) => {
    const q = overrides?.query !== undefined ? overrides.query : search;
    const cat = overrides?.cat !== undefined ? overrides.cat : selectedCat;
    const tool = overrides?.tool !== undefined ? overrides.tool : selectedTool;
    const b = overrides?.budget !== undefined ? overrides.budget : selectedBudget;
    const eng = overrides?.engagement !== undefined ? overrides.engagement : selectedEngagement;
    const ver = overrides?.verified !== undefined ? overrides.verified : verifiedOnly;

    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (cat) params.set('category', cat);
    if (tool) params.set('tool', tool);
    if (b && b !== 'all') params.set('budget', b);
    if (eng && eng !== 'all') params.set('engagement', eng);
    if (ver) params.set('verified', 'true');

    startTransition(() => {
      router.push(`/experts?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCat('');
    setSelectedTool('');
    setSelectedBudget('all');
    setSelectedEngagement('all');
    setVerifiedOnly(false);
    startTransition(() => {
      router.push('/experts');
    });
  };

  const hasActiveFilters = Boolean(
    search || selectedCat || selectedTool || (selectedBudget && selectedBudget !== 'all') || (selectedEngagement && selectedEngagement !== 'all') || verifiedOnly
  );

  return (
    <div className="rounded-2xl p-5 mb-8 border border-[#e4ebe4] bg-white shadow-xs space-y-4">
      {/* Top Search & Verified Toggle */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#889888]" />
          <input
            type="text"
            placeholder="Search by specialist name, tool, agency, city, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyFilters({ query: search });
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f9faf9] border border-[#d5ded5] text-sm text-[#001e00] placeholder-[#889888] focus:outline-none focus:border-[#108a00] focus:bg-white transition-colors"
          />
        </div>

        <button
          onClick={() => {
            const next = !verifiedOnly;
            setVerifiedOnly(next);
            applyFilters({ verified: next });
          }}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            verifiedOnly
              ? 'bg-[#e4f7e6] text-[#108a00] border-[#b2e8b8] shadow-xs'
              : 'bg-white text-[#5e6d55] border-[#d5ded5] hover:border-[#108a00]'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${verifiedOnly ? 'text-[#108a00]' : 'text-[#889888]'}`} />
          <span>Verified Only</span>
        </button>

        <button
          onClick={() => applyFilters()}
          className="px-6 py-2.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          {isPending ? 'Filtering...' : 'Apply Filters'}
        </button>
      </div>

      {/* Filter Row: Category, Tool, Budget, Engagement */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#f0f3f0]">
        {/* Category */}
        <select
          value={selectedCat}
          onChange={(e) => {
            setSelectedCat(e.target.value);
            applyFilters({ cat: e.target.value });
          }}
          aria-label="Filter by category"
          className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium focus:outline-none focus:border-[#108a00] focus:bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Tool */}
        <select
          value={selectedTool}
          onChange={(e) => {
            setSelectedTool(e.target.value);
            applyFilters({ tool: e.target.value });
          }}
          aria-label="Filter by tool"
          className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium focus:outline-none focus:border-[#108a00] focus:bg-white"
        >
          <option value="">All Tools</option>
          {tools.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Budget */}
        <select
          value={selectedBudget}
          onChange={(e) => {
            setSelectedBudget(e.target.value);
            applyFilters({ budget: e.target.value });
          }}
          aria-label="Filter by starting budget"
          className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium focus:outline-none focus:border-[#108a00] focus:bg-white"
        >
          <option value="all">Any Starting Budget</option>
          <option value="under_2500">Under $2,500</option>
          <option value="2500_to_5000">$2,500 – $5,000</option>
          <option value="5000_to_15000">$5,000 – $15,000</option>
          <option value="15000_plus">$15,000+</option>
        </select>

        {/* Engagement */}
        <select
          value={selectedEngagement}
          onChange={(e) => {
            setSelectedEngagement(e.target.value);
            applyFilters({ engagement: e.target.value });
          }}
          aria-label="Filter by engagement model"
          className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium focus:outline-none focus:border-[#108a00] focus:bg-white"
        >
          <option value="all">All Engagement Models</option>
          <option value="fixed_sprint">Fixed Sprint</option>
          <option value="monthly_retainer">Monthly Retainer</option>
          <option value="consulting_audit">Consulting Audit</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {/* Active filter tags & reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[#5e6d55]">
            <span className="font-medium">Active filters:</span>
            {search && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] text-[#001e00] border border-[#dbe3db] font-medium">
                &quot;{search}&quot;
              </span>
            )}
            {selectedCat && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] text-[#001e00] border border-[#dbe3db] font-medium">
                Category: {categories.find((c) => c.slug === selectedCat)?.name || selectedCat}
              </span>
            )}
            {selectedTool && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#f4f6f4] text-[#001e00] border border-[#dbe3db] font-medium">
                Tool: {tools.find((t) => t.slug === selectedTool)?.name || selectedTool}
              </span>
            )}
            {verifiedOnly && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8] font-bold">
                Verified Only
              </span>
            )}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[#738273] hover:text-rose-600 font-medium transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
