import BusinessTypePicker from '@/components/BusinessTypePicker';
import BusinessQueryRedirect from '@/components/BusinessQueryRedirect';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH } from '@/lib/business-routes';
import { absoluteUrl } from '@/lib/site-url';
import { Sparkles } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI Solutions by Industry: Tools and Experts for Your Business',
  description:
    'Pick your industry to see the AI solutions that fit your bottlenecks, the tools behind them, and specialists who build them.',
  alternates: { canonical: absoluteUrl(AI_SOLUTIONS_BY_INDUSTRY_PATH) },
  openGraph: {
    title: 'AI Solutions by Industry | Find Ai Pros',
    description:
      'AI solutions by industry. Select a business type, then choose the operational areas to improve and see the recommended tools for each one.',
    type: 'website' as const,
  },
};

export default function AiSolutionsByIndustryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-bold text-brand shadow-rest">
          <Sparkles className="w-5 h-5 text-brand" />
          <span>Tools and workflows for your business</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          AI Solutions by Industry
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Select your business type. Each one has its own page, where you can choose several operational bottlenecks or areas to improve and see the tools that fit each area.
        </p>
      </div>

      <Suspense fallback={null}>
        <BusinessQueryRedirect />
      </Suspense>

      <BusinessTypePicker />
    </div>
  );
}
