import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertsDirectoryClient from './ExpertsDirectoryClient';
import { ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Browse Verified AI Experts & Agencies | Find Ai Pros',
  description: 'Search vetted AI automation consultants, conversational voice engineers, and applied AI developers. Filter by category, tool stack, budget, and verification.',
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Curated AI Expert Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight">
          Find Vetted AI Automation Experts
        </h1>
        <p className="text-base sm:text-lg text-[#475569] mt-3 max-w-3xl leading-relaxed font-normal">
          Every expert listed below has disclosed their exact human fallback mechanism. Experts with the green &apos;Verified&apos; badge have passed identity verification and had at least two production case studies reviewed.
        </p>
      </div>

      <Suspense fallback={<div className="h-48 rounded-2xl bg-white border border-[#e4ebe4] animate-pulse mb-8" />}>
        <ExpertsDirectoryClient
          allExperts={experts}
          categories={categories}
          tools={tools}
        />
      </Suspense>
    </div>
  );
}
