import { Metadata } from 'next';
import { withCanonical } from '@/lib/seo';
import { ExternalLink } from 'lucide-react';
import ApplyPricing from '@/components/ApplyPricing';
import DeferredTally from '@/components/DeferredTally';
import { getCategories } from '@/lib/store';

export const metadata: Metadata = withCanonical('/apply', {
  title: 'List Your AI Consulting Business Free | Find AI Pros',
  description:
    'AI consultants and automation agencies: get listed free for 30 days, no card. Reach business owners searching by industry, need, and city.',
});

export default async function ApplyPage() {
  const categories = await getCategories();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
          List Your AI Consulting Business: Free for 30 Days
        </h1>
        <p className="text-base sm:text-lg text-muted mt-3 leading-relaxed font-normal">
          A new profile is free for the first 30 days in one category. No card is required, and nothing is charged automatically. After that, $9.99 a month keeps the listing. The $29.99 and $59.99 plans are the other options below.
        </p>
      </div>

      <ApplyPricing categories={categories.map((category) => ({ slug: category.slug, name: category.name }))} />

      <div id="application" className="scroll-mt-28 rounded-3xl p-4 sm:p-8 border border-line bg-white shadow-sm">
        <div className="mb-4 px-2">
          <h2 className="text-2xl font-semibold text-ink">Application</h2>
          <p className="text-sm text-muted mt-1">
            Apply at no charge. Choose a paid plan only when you want to.
          </p>
        </div>
        <DeferredTally
          src="https://tally.so/embed/Nq5NDp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
          title="Apply to Be Listed | Find Ai Pros"
          height={680}
        />

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Form not loading properly?{' '}
          <a
            href="https://tally.so/r/Nq5NDp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-bold hover:underline inline-flex items-center gap-1"
          >
            Open application in new window <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
