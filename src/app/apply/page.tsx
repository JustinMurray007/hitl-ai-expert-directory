import { Metadata } from 'next';
import {
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import Script from 'next/script';
import ApplyPricing from '@/components/ApplyPricing';

export const metadata: Metadata = {
  title: 'Apply to Be Listed | Find Ai Pros',
  description:
    'Apply to be listed on Find Ai Pros. Vetting is free. A new profile is free for 30 days in one category, no card required, and nothing is charged automatically.',
};

export default function ApplyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Free to apply</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight">
          Apply to Be Listed
        </h1>
        <p className="text-base sm:text-lg text-[#5e6d55] mt-3 leading-relaxed font-normal">
          Vetting is free. We list specialists who name one accountable person and give references we can contact.
          Case studies are not required. A new profile is free for the first 30 days in one category, no card required, and nothing is charged automatically.
        </p>
      </div>

      <ApplyPricing />

      <div id="application" className="scroll-mt-28 rounded-3xl p-4 sm:p-8 border border-[#e4ebe4] bg-white shadow-sm">
        <div className="mb-4 px-2">
          <h2 className="text-2xl font-black text-[#001e00]">Application</h2>
          <p className="text-sm text-[#5e6d55] mt-1">
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
            className="text-[#108a00] font-bold hover:underline inline-flex items-center gap-1"
          >
            Open application in new window <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
