import { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  ExternalLink,
} from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Apply to Be Listed | Find Ai Pros',
  description:
    'Apply to be listed on Find Ai Pros. We verify real AI specialists who build systems with verifiable human oversight and production case studies.',
};

export default function ApplyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tally Widget Script */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3 shadow-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Strict Vetting Application</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight">
          Apply to Be Listed
        </h1>
        <p className="text-base sm:text-lg text-[#5e6d55] mt-3 leading-relaxed font-normal">
          We only list specialists who build systems with verifiable human oversight. Free public community listing on approval; Verified badge requires two reviewed production case studies.
        </p>
      </div>

      {/* Trust & Vetting Standards Pill Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl p-4 bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e4f7e6] text-[#108a00] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5e6d55] font-bold">Standard 1</div>
            <div className="text-sm font-bold text-[#001e00]">Production Deployments</div>
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5e6d55] font-bold">Standard 2</div>
            <div className="text-sm font-bold text-[#001e00]">Human Safety Checkpoints</div>
          </div>
        </div>

        <div className="rounded-2xl p-4 bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#fffbeb] text-[#d97706] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5e6d55] font-bold">Standard 3</div>
            <div className="text-sm font-bold text-[#001e00]">Verified Client ROI</div>
          </div>
        </div>
      </div>

      {/* Embedded Tally Application Form */}
      <div className="rounded-3xl p-4 sm:p-8 border border-[#e4ebe4] bg-white shadow-sm">
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

        {/* Fallback Direct Link */}
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
