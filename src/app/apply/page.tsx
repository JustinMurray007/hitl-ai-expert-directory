import { Metadata } from 'next';
import {
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import Script from 'next/script';
import ApplyPricing from '@/components/ApplyPricing';
import { getCategories } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Apply to Be Listed | Find Ai Pros',
  description:
    'Apply to be listed on Find Ai Pros. A new profile is free for 30 days in one category, no card required, and nothing is charged automatically.',
};

export default async function ApplyPage() {
  const categories = await getCategories();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-3 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Free to apply</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
          Apply to Be Listed
        </h1>
        <p className="text-base sm:text-lg text-muted mt-3 leading-relaxed font-normal">
          Joining is free. Any new profile is free for the first 30 days in one category, no card required, and nothing is charged automatically. But, to retain your profile for over 30 days and for extra categories or featured locations on the website, please pay the affordable options below.
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
        <div className="w-full min-h-[680px] rounded-2xl overflow-hidden bg-white">
          <iframe
            data-tally-src="https://tally.so/embed/Nq5NDp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            src="https://tally.so/embed/Nq5NDp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            loading="lazy"
            width="100%"
            height="680"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Apply to Be Listed | Find Ai Pros"
            className="w-full border-0"
          />
        </div>

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
