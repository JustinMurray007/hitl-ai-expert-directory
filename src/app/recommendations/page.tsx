import { getExperts } from '@/lib/store';
import BusinessRecommender from '@/components/BusinessRecommender';
import BusinessQueryRedirect from '@/components/BusinessQueryRedirect';
import { Sparkles } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Find Your Business — Tailored AI Blueprints & Specialists | Find Ai Pros',
  description:
    'Select your business type from 12 industries to get tailored AI workflow recommendations, required human safeguards, and specialists ready to implement.',
};

export default async function RecommendationsPage() {
  const allExperts = await getExperts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-bold text-brand shadow-rest">
          <Sparkles className="w-5 h-5 text-brand" />
          <span>Find Your Business — Tailored AI Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          Find Your Business &amp; Recommended AI Workflows
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Select your business type below. We generate a custom AI workflow blueprint, the human-in-the-loop fallback safeguards, and connect you with specialists who are eligible for a match.
        </p>
      </div>

      <Suspense fallback={null}>
        <BusinessQueryRedirect />
      </Suspense>

      {/* Interactive Recommender */}
      <Suspense fallback={<div className="h-64 rounded-3xl bg-white border border-line animate-pulse" />}>
        <BusinessRecommender allExperts={allExperts} />
      </Suspense>
    </div>
  );
}
