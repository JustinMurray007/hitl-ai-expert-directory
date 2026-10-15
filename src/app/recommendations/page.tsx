import { getExperts } from '@/lib/store';
import BusinessRecommender from '@/components/BusinessRecommender';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'AI Blueprint & Specialist Recommender for Small Businesses | HITL Directory',
  description:
    'Select your industry and business bottleneck to get tailored AI workflow recommendations, required human safeguards, and verified specialists ready to implement.',
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-bold text-[#1d4ed8] mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#2563eb]" />
          <span>Interactive SMB AI Solution Finder</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-tight">
          What AI Should Your Business Actually Deploy?
        </h1>
        <p className="text-sm sm:text-base text-[#5e6d55] mt-3 leading-relaxed font-medium">
          Select your business type and operational challenge. We generate a custom AI workflow blueprint, the mandatory human-in-the-loop fallback safeguards, and connect you with vetted specialists with verified production case studies.
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
