'use client';

import { useState } from 'react';
import { Category, Tool } from '@/lib/types';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  categories: Category[];
  tools: Tool[];
  initialCategory?: string;
  initialTool?: string;
  initialEngagement?: string;
  initialQuery?: string;
}

export default function FilterBar({
  categories,
  tools,
  initialCategory = '',
  initialTool = '',
  initialEngagement = 'all',
  initialQuery = '',
}: FilterBarProps) {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [selectedTool, setSelectedTool] = useState(initialTool);
  const [selectedEngagement, setSelectedEngagement] = useState(initialEngagement);

  const applyFilters = (overrides?: Partial<{
    query: string;
    cat: string;
    tool: string;
    engagement: string;
  }>) => {
    const q = overrides?.query !== undefined ? overrides.query : search;
    const cat = overrides?.cat !== undefined ? overrides.cat : selectedCat;
    const tool = overrides?.tool !== undefined ? overrides.tool : selectedTool;
    const eng = overrides?.engagement !== undefined ? overrides.engagement : selectedEngagement;

    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (cat) params.set('category', cat);
    if (tool) params.set('tool', tool);
    if (eng && eng !== 'all') params.set('engagement', eng);

    const next = params.toString();
    window.history.pushState(null, '', next ? `/experts?${next}` : '/experts');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCat('');
    setSelectedTool('');
    setSelectedEngagement('all');
    window.history.pushState(null, '', '/experts');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const hasActiveFilters = Boolean(
    search || selectedCat || selectedTool || (selectedEngagement && selectedEngagement !== 'all')
  );

  return (
    <div className="rounded-2xl p-5 mb-8 border border-line bg-white shadow-xs space-y-4">
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="search"
            aria-label="Search specialists"
            placeholder="Search by specialist name, tool, agency, city, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyFilters({ query: search });
            }}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-canvas-muted border border-line text-base text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:bg-white transition-colors font-medium focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
          />
        </div>

        <button
          onClick={() => applyFilters()}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-brand px-7 py-3 text-base font-bold text-white shadow-rest hover:bg-brand-hover"
        >
          Apply Filters
        </button>
      </div>

      {/* Filter Row: Category, Tool, Budget, Engagement */}
      <div className="grid grid-cols-1 gap-3.5 border-t border-line-soft pt-3 min-[520px]:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <select
          value={selectedCat}
          onChange={(e) => {
            setSelectedCat(e.target.value);
            applyFilters({ cat: e.target.value });
          }}
          aria-label="Filter by category"
          className="w-full rounded-xl border border-line bg-canvas-muted px-4 py-2.5 text-base font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
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
          className="w-full rounded-xl border border-line bg-canvas-muted px-4 py-2.5 text-base font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
        >
          <option value="">All Tools</option>
          {tools.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Engagement */}
        <select
          value={selectedEngagement}
          onChange={(e) => {
            setSelectedEngagement(e.target.value);
            applyFilters({ engagement: e.target.value });
          }}
          aria-label="Filter by engagement model"
          className="w-full rounded-xl border border-line bg-canvas-muted px-4 py-2.5 text-base font-semibold text-ink focus:border-brand focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
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
        <div className="flex items-center justify-between pt-2 text-sm">
          <div className="flex flex-wrap items-center gap-2 text-muted-strong">
            <span className="font-semibold">Active filters:</span>
            {search && (
              <span className="px-3 py-1 rounded-full bg-canvas-muted text-ink border border-line font-semibold">
                &quot;{search}&quot;
              </span>
            )}
            {selectedCat && (
              <span className="px-3 py-1 rounded-full bg-canvas-muted text-ink border border-line font-semibold">
                Category: {categories.find((c) => c.slug === selectedCat)?.name || selectedCat}
              </span>
            )}
            {selectedTool && (
              <span className="px-3 py-1 rounded-full bg-brand-soft text-brand border border-brand-line font-semibold">
                Tool: {tools.find((t) => t.slug === selectedTool)?.name || selectedTool}
              </span>
            )}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-muted hover:text-rose-600 font-bold transition-colors cursor-pointer text-sm"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
