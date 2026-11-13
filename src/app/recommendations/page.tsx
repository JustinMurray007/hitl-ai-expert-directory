import BusinessTypePicker from '@/components/BusinessTypePicker';
import BusinessQueryRedirect from '@/components/BusinessQueryRedirect';
import { Sparkles } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Find Your Business — Tailored AI Blueprints & Specialists | Find Ai Pros',
  description:
    'Select your business type to open a page of operational bottlenecks, an AI solution that may fit, and the tools specialists use.',
};

export default function RecommendationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-bold text-brand shadow-rest">
          <Sparkles className="w-5 h-5 text-brand" />
          <span>Find Your Business — Tailored AI Solutions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          Find Your Business &amp; Recommended AI Workflows
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Select your business type. Each one has its own page, where you can choose the operational bottlenecks or areas to improve and see the tools that fit.
        </p>
      </div>

      <Suspense fallback={null}>
        <BusinessQueryRedirect />
      </Suspense>

      <BusinessTypePicker />
    </div>
  );
}
