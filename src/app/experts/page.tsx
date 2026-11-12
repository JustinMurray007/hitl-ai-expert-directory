import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertsDirectoryClient from './ExpertsDirectoryClient';
import { ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Browse AI Experts & Agencies | Find Ai Pros',
  description: 'Search AI automation consultants, conversational voice engineers, and applied AI developers. Filter by category, tool stack, and budget.',
};

export default async function ExpertsPage() {
  const [categories, tools, experts] = await Promise.all([
    getCategories(),
    getTools(),
    getExperts(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-3 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Curated AI Expert Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
          Find AI Automation Experts
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-3 max-w-3xl leading-relaxed font-normal">
          Every expert listed below has agreed to name an accountable person and describe their human fallback. Case studies are not required. Filter by category to see who appears on each category page.
        </p>
      </div>

      <Suspense fallback={<div className="h-48 rounded-2xl bg-white border border-line animate-pulse mb-8" />}>
        <ExpertsDirectoryClient
          allExperts={experts}
          categories={categories}
          tools={tools}
        />
      </Suspense>
    </div>
  );
}
