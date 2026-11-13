import { Suspense } from 'react';
import JsonLd from '@/components/JsonLd';
import { CONCIERGE_MATCH_AMOUNT_CENTS } from '@/lib/billing/catalog';
import { graph } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-url';
import MatchFormClient from './MatchFormClient';
import { Sparkles } from 'lucide-react';
import { ConciergeCheckoutNotice, ConciergePayButton, ConciergePrice, CONCIERGE_CHECKOUT_ENABLED } from '@/components/ConciergePayButton';

export const metadata = withCanonical('/match', {
  title: 'Concierge Match | Find Ai Pros',
  description:
    'Tell us about your business process, stack, and budget. We will review your request privately and introduce at least 3 experts that match your needs, within 48 hours. $49.99 one-time payment.',
});

export default function MatchPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={graph({
          '@type': 'Service',
          name: 'Concierge Match',
          url: absoluteUrl('/match'),
          provider: { '@type': 'Organization', name: 'Find AI Pros', url: 'https://findaipros.com' },
          offers: {
            '@type': 'Offer',
            price: (CONCIERGE_MATCH_AMOUNT_CENTS / 100).toFixed(2),
            priceCurrency: 'USD',
            url: absoluteUrl('/match'),
          },
        })}
      />
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-sm font-medium text-brand mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Concierge Match</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Concierge Match
        </h1>
        <p className="text-base sm:text-lg text-muted mt-3 leading-relaxed font-normal">
          Tell us about your business process, stack, and budget. We will review your request privately and introduce at least 3 experts that match your needs, within 48 hours.
        </p>
        <ConciergePrice className="mt-6" />
        <div className="mt-6 flex justify-center">
          <ConciergePayButton
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-medium text-base shadow-md"
            fallbackHref="#request"
            fallbackLabel="Send the request"
          />
        </div>
        <ConciergeCheckoutNotice className="mt-3 text-sm text-muted-strong" />
      </div>

      {CONCIERGE_CHECKOUT_ENABLED ? (
        <p className="text-center text-sm text-muted-strong">
          After payment you land on the request form.
        </p>
      ) : (
        <div id="request" data-reveal>
          <Suspense
            fallback={
              <div className="rounded-3xl p-12 border border-line bg-white text-center text-muted">
                Loading matchmaking intake form...
              </div>
            }
          >
            <MatchFormClient />
          </Suspense>
        </div>
      )}
    </div>
  );
}
