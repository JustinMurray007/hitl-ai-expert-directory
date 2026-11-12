import { Suspense } from 'react';
import Link from 'next/link';
import SuccessActions from './SuccessActions';

export const metadata = {
  title: 'Payment received | Find Ai Pros',
  description: 'Stripe confirms the listing subscription from a webhook.',
};

export default function ApplySuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-xs">
        <h1 className="text-3xl font-semibold text-ink">Payment received</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Stripe is confirming the subscription. Your listing tier and categories update from the webhook, not from this page. If the subscription later ends, the public profile becomes limited: name and category stay, and website, social, contact, and match eligibility come off.
        </p>
        <Suspense fallback={null}>
          <SuccessActions />
        </Suspense>
        <Link href="/apply#pricing" className="mt-6 inline-block text-brand font-bold">
          Back to plans
        </Link>
      </div>
    </div>
  );
}
