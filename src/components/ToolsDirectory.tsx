'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { AI_TOOLS, AI_TOOL_CATEGORIES, type AiTool } from '@/lib/ai-tools';

const GROUPS = AI_TOOL_CATEGORIES.filter((category) => category.id !== 'all');

function ToolCard({ tool }: { tool: AiTool }) {
  return (
    <article className="bg-white rounded-2xl border border-line hover:border-brand hover:shadow-md transition-all p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{tool.company}</span>
          <span className="text-xs font-medium bg-brand-soft text-brand px-2.5 py-0.5 rounded-full border border-brand-line">
            {tool.categoryLabel}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-ink leading-tight">{tool.name}</h3>
        <p className="text-sm text-muted-strong leading-relaxed mt-3">{tool.description}</p>
        <p className="text-sm text-ink mt-3">
          <span className="font-medium">Best for: </span>
          {tool.bestFor}
        </p>
      </div>
      <div className="pt-4 mt-5 border-t border-line flex items-center justify-between gap-3">
        <span className="text-sm text-slate-600">{tool.pricing}</span>
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel={tool.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover"
        >
          Visit
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}

export default function ToolsDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AI_TOOLS.filter((tool) => {
      if (category !== 'all' && tool.category !== category) return false;
      if (!q) return true;
      return [tool.name, tool.company, tool.description, tool.bestFor, tool.categoryLabel, ...tool.tags]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, category]);

  const groups = GROUPS.map((group) => ({
    ...group,
    tools: visible.filter((tool) => tool.category === group.id),
  })).filter((group) => group.tools.length > 0);

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-5">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter tools by name, company, or use"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-ink placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
        <nav aria-label="Jump to a tool category" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === 'all' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({AI_TOOLS.length})
          </button>
          {GROUPS.map((group) => {
            const count = AI_TOOLS.filter((tool) => tool.category === group.id).length;
            const selected = category === group.id;
            return (
              <a
                key={group.id}
                href={`#${group.id}`}
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selected ? 'bg-brand text-white' : 'bg-brand-soft text-brand border border-brand-line hover:bg-white'
                }`}
              >
                {group.label} ({count})
              </a>
            );
          })}
        </nav>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
          <h2 className="text-lg font-semibold text-ink">No tools match that filter</h2>
          <button type="button" onClick={() => { setQuery(''); setCategory('all'); }} className="mt-4 text-sm font-medium text-brand">
            Clear filter
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-28">
            <div className="flex items-end justify-between gap-4 mb-5">
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">{group.label}</h2>
              <span className="text-sm text-slate-500">{group.tools.length} tools</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))
      )}

      <div className="rounded-3xl p-8 border border-brand-line bg-brand-soft/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-base text-ink max-w-2xl">
          These tools are the building blocks. Specialists in the directory assemble them into a workflow for your business.
        </p>
        <Link href="/experts" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-medium">
          Browse AI experts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
