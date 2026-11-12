'use client';

import { useSearchParams } from 'next/navigation';

const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';

export default function SuccessActions() {
  const sessionId = useSearchParams().get('session_id');
  if (!CHECKOUT_ENABLED || !sessionId) return null;
  return (
    <form action="/api/stripe/portal" method="POST" className="mt-6">
      <input type="hidden" name="checkout_session_id" value={sessionId} />
      <button
        type="submit"
        className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-brand text-white font-bold"
      >
        Manage billing
      </button>
    </form>
  );
}
