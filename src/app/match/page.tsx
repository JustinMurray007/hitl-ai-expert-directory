import { Suspense } from 'react';
import MatchFormClient from './MatchFormClient';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Request AI Specialist Matchmaking | Find Ai Pros',
  description:
    'Private concierge matchmaking with verified AI specialists. We review your workflow bottleneck and introduce two audited specialists with demonstrated case studies.',
};

export default function MatchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Founder Concierge Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#001e00] tracking-tight">
          Request AI Specialist Matchmaking
        </h1>
        <p className="text-base sm:text-lg text-[#5e6d55] mt-3 leading-relaxed font-normal">
          Tell us about your business process, stack, and budget. We will review your request privately and introduce two verified specialists with demonstrable domain case studies.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="rounded-3xl p-12 border border-[#e4ebe4] bg-white text-center text-[#5e6d55]">
            <div className="w-8 h-8 border-4 border-[#108a00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            Loading matchmaking intake form...
          </div>
        }
      >
        <MatchFormClient />
      </Suspense>
    </div>
  );
}
