'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
  Tag,
  Zap,
  Gift,
  Coins,
  BadgePercent,
} from 'lucide-react';
import { AI_TOOLS, AI_TOOL_CATEGORIES, AiTool } from '@/lib/ai-tools';

export default function AiToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [onlyCredits, setOnlyCredits] = useState(false);

  // Filtered tools based on search, category, marquee, and credit deals
  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Popular filter
      if (onlyPopular && !tool.isPopular) {
        return false;
      }

      // Save on AI (Credit & Grant) filter (non-student)
      if (onlyCredits && (!tool.creditDeal || tool.isStudentDeal)) {
        return false;
      }

      // Search query filter
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery.toLowerCase().trim();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.company.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.bestFor.toLowerCase().includes(q) ||
        (tool.creditDeal && tool.creditDeal.toLowerCase().includes(q)) ||
        tool.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory, onlyPopular, onlyCredits]);

  // Key marquee tools from user request
  const marqueeToolIds = ['viktor-ai', 'claude', 'chatgpt', 'gemini', 'grok', 'perplexity'];
  const marqueeTools = AI_TOOLS.filter((t) => marqueeToolIds.includes(t.id));

  // Count tools with business Save on AI deals (non-student)
  const saveOnAiCount = AI_TOOLS.filter((t) => Boolean(t.creditDeal && !t.isStudentDeal)).length;

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e4ebe4] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI models & tools (e.g., Claude, ChatGPT, Viktor, Azure, AWS, Cursor, Make...)"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#108a00]/30 focus:border-[#108a00] text-sm sm:text-base transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200/70 hover:bg-slate-200 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            {/* Save on AI Filter */}
            <button
              type="button"
              onClick={() => {
                setOnlyCredits(!onlyCredits);
                if (!onlyCredits) setOnlyPopular(false);
              }}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                onlyCredits
                  ? 'bg-[#108a00] border-[#108a00] text-white shadow-xs'
                  : 'bg-[#edf7ee] border-[#b2e8b8] text-[#108a00] hover:bg-[#e1f3e3]'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Save on Ai ({saveOnAiCount})</span>
            </button>

            {/* Popular Tools Filter */}
            <button
              type="button"
              onClick={() => {
                setOnlyPopular(!onlyPopular);
                if (!onlyPopular) setOnlyCredits(false);
              }}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                onlyPopular
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Zap className={`w-4 h-4 ${onlyPopular ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <span>Marquee Tools</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AI_TOOL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? AI_TOOLS.length
                : AI_TOOLS.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#108a00] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Marquee Tools Quick-Jump (Only when not filtering by category/search/credits) */}
      {selectedCategory === 'all' && !searchQuery && !onlyPopular && !onlyCredits && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563eb]" />
              <h2 className="text-lg sm:text-xl font-black text-[#001e00]">
                Featured Marquee AI Models &amp; Tools
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Core platforms requested by founders &amp; specialists
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {marqueeTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white border border-[#e4ebe4] hover:border-[#108a00] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-[#108a00] transition-colors">
                      {tool.company}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#108a00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#001e00] leading-snug group-hover:text-[#108a00] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {tool.bestFor}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-[#108a00]">
                  Visit Site →
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-bold text-[#475569]">
            Showing <span className="text-[#001e00] font-black">{filteredTools.length}</span> AI Tools &amp; Models
            {selectedCategory !== 'all' && (
              <span> in <span className="text-[#108a00] font-black">{AI_TOOL_CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></span>
            )}
            {onlyCredits && (
              <span className="text-[#108a00] font-bold"> (With Free Credits &amp; Grants)</span>
            )}
          </div>
          {(searchQuery || selectedCategory !== 'all' || onlyPopular || onlyCredits) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyPopular(false);
                setOnlyCredits(false);
              }}
              className="text-xs font-bold text-[#108a00] hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching AI tools found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We couldn&apos;t find any AI tools matching &quot;{searchQuery}&quot;. Try searching for another model like Claude, ChatGPT, Make, or Gemini.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyPopular(false);
                setOnlyCredits(false);
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#108a00] text-white text-xs font-bold hover:bg-[#14a800] transition-colors"
            >
              Show All AI Tools
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border border-[#e4ebe4] hover:border-[#108a00] hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Company & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      {tool.company}
                    </span>
                    <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {tool.categoryLabel}
                    </span>
                  </div>

                  {/* Title & Website Link */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="text-xl font-extrabold text-[#001e00] group-hover:text-[#108a00] transition-colors leading-tight">
                      {tool.name}
                    </h3>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#108a00] hover:bg-[#e4f7e6] transition-colors"
                      title={`Visit ${tool.name}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#475569] leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Verified Credit Deal Callout */}
                  {tool.creditDeal && (
                    <div className="p-3 rounded-xl bg-[#edf7ee] border border-[#b2e8b8] text-xs text-[#1e2a1e] mb-4 leading-snug">
                      <div className="flex items-center gap-1.5 text-[#108a00] font-extrabold mb-1">
                        <Gift className="w-3.5 h-3.5" />
                        <span>Save on Ai Offer:</span>
                      </div>
                      <p className="font-semibold text-slate-800">{tool.creditDeal}</p>
                    </div>
                  )}

                  {/* Best For Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 mb-4 leading-snug">
                    <span className="font-bold text-[#001e00] block mb-0.5">🎯 Best For:</span>
                    <span>{tool.bestFor}</span>
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-1.5 mb-5">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#1e2a1e] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#108a00] shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Pricing & Action Button */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Pricing Model:</span>
                    <span className="font-bold text-[#001e00]">{tool.pricing}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={tool.creditLink || tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#108a00] hover:bg-[#14a800] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all"
                    >
                      <span>Visit {tool.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href="/recommendations"
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#e4f7e6] text-slate-700 hover:text-[#108a00] text-xs font-bold transition-colors"
                      title="See recommended workflows using this tool"
                    >
                      Workflows
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bridge Callout: Tools vs Systems with Specialists */}
      <div className="rounded-3xl p-8 sm:p-12 border border-[#b2e8b8] bg-gradient-to-br from-[#f0f9f1] via-white to-[#eff6ff] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#108a00]" />
              <span>The Human-in-the-Loop Advantage</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#001e00] tracking-tight">
              Tools don&apos;t run a business on their own — verified workflows do.
            </h3>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl font-normal">
              Most businesses struggle when deploying raw AI models without safeguard guardrails, team alerts, or proper CRM synchronization. Our directory connects you with vetted specialists who assemble these tools into resilient production systems.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/recommendations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-sm transition-all text-center"
            >
              <span>Find Your Business Solution</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/match"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#001e00] border border-slate-200 font-bold text-sm transition-all text-center"
            >
              <span>Get Matched With a Specialist</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
