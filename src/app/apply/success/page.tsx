import { Suspense } from 'react';
import Link from 'next/link';
import SuccessActions from './SuccessActions';

export const metadata = {
  title: 'Payment received | Find Ai Pros',
  description: 'Stripe confirms the listing subscription from a webhook. Paying does not skip vetting.',
};

export default function ApplySuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="rounded-3xl border border-[#e4ebe4] bg-white p-8 shadow-xs">
        <h1 className="text-3xl font-black text-[#001e00]">Payment received</h1>
        <p className="mt-3 text-[#5e6d55] leading-relaxed">
          Stripe is confirming the subscription. Your listing tier updates from the webhook, not from this page. Paying does not skip vetting. If the subscription later ends, the public profile becomes limited: name, category, and vetted badge stay, and website, social, contact, and match eligibility come off.
        </p>
        <Suspense fallback={null}>
          <SuccessActions />
        </Suspense>
        <Link href="/apply#pricing" className="mt-6 inline-block text-[#108a00] font-bold">
          Back to plans
        </Link>
      </div>
    </div>
  );
}
