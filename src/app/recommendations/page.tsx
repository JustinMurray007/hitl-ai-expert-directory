import { getExperts } from '@/lib/store';
import BusinessRecommender from '@/components/BusinessRecommender';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Find Your Business — Tailored AI Blueprints & Verified Specialists | Find Ai Pros',
  description:
    'Select your business type from 12 industries to get tailored AI workflow recommendations, required human safeguards, and verified specialists ready to implement.',
};

interface RecommendationsPageProps {
  searchParams: Promise<{ industry?: string }>;
}

export default async function RecommendationsPage({ searchParams }: RecommendationsPageProps) {
  const params = await searchParams;
  const initialIndustry = params.industry || '';
  const allExperts = await getExperts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-sm font-bold text-[#1d4ed8] mb-4 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#2563eb]" />
          <span>Find Your Business — 12 Industry Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-tight">
          Find Your Business &amp; Recommended AI Workflows
        </h1>
        <p className="text-base sm:text-lg text-[#475569] mt-4 leading-relaxed font-normal">
          Select your business type below. We generate a custom AI workflow blueprint, the mandatory human-in-the-loop fallback safeguards, and connect you with vetted specialists with verified production case studies.
        </p>
      </div>

      {/* Interactive Recommender */}
      <BusinessRecommender
        allExperts={allExperts}
        initialIndustrySlug={initialIndustry}
      />
    </div>
  );
}
