import { Suspense } from 'react';
import MatchFormClient from '../MatchFormClient';

export const metadata = {
  title: 'Concierge request | Find Ai Pros',
  description: 'Payment received. Tell us about your business process and stack so we can introduce at least 3 experts within 48 hours.',
  robots: { index: false, follow: false },
};

export default function MatchThanksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Payment received
        </h1>
        <p className="text-base sm:text-lg text-muted mt-3 leading-relaxed font-normal">
          Tell us about your business process and stack. We will review your request privately and introduce at least 3 experts that match your needs, within 48 hours.
        </p>
      </div>
      <Suspense fallback={<div className="rounded-3xl p-12 border border-line bg-white text-center text-muted">Loading the request form...</div>}>
        <MatchFormClient />
      </Suspense>
    </div>
  );
}
