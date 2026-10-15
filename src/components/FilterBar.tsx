'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Category, Tool } from '@/lib/types';
import { Search, Filter, ShieldCheck, X, ChevronDown } from 'lucide-react';

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
    <div className="glass-panel rounded-2xl p-5 mb-8 border border-white/[0.08] bg-[#11131c]/90 space-y-4">
      {/* Top Search & Verified Toggle */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by specialist name, tool, agency, city, or keyword..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyFilters({ query: search });
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <button
          onClick={() => {
            const next = !verifiedOnly;
            setVerifiedOnly(next);
            applyFilters({ verified: next });
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            verifiedOnly
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
              : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:border-white/20'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${verifiedOnly ? 'text-emerald-400' : 'text-zinc-500'}`} />
          <span>Verified Only</span>
        </button>

        <button
          onClick={() => applyFilters()}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          {isPending ? 'Filtering...' : 'Apply Filters'}
        </button>
      </div>

      {/* Filter Row: Category, Tool, Budget, Engagement */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/[0.05]">
        {/* Category */}
        <select
          value={selectedCat}
          onChange={(e) => {
            setSelectedCat(e.target.value);
            applyFilters({ cat: e.target.value });
          }}
          aria-label="Filter by category"
          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50"
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
          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50"
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
          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50"
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
          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/50"
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
          <div className="flex flex-wrap items-center gap-2 text-zinc-400">
            <span>Active filters:</span>
            {search && (
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                &quot;{search}&quot;
              </span>
            )}
            {selectedCat && (
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Category: {categories.find((c) => c.slug === selectedCat)?.name || selectedCat}
              </span>
            )}
            {selectedTool && (
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Tool: {tools.find((t) => t.slug === selectedTool)?.name || selectedTool}
              </span>
            )}
            {verifiedOnly && (
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                Verified Only
              </span>
            )}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
