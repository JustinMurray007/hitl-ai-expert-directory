import { CONCIERGE_MATCH_PRODUCT } from '@/lib/billing/catalog';
import Link from 'next/link';

export const CONCIERGE_CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CONCIERGE_CHECKOUT_ENABLED === 'true';

const PRICE_LABEL = '$49.99';

export function ConciergePrice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-ink ${className}`}>
      <span className="text-3xl font-semibold tracking-tight">{PRICE_LABEL}</span>
      <span className="ml-2 text-base font-normal text-muted-strong">one-time payment</span>
    </p>
  );
}

export function ConciergePayButton({
  className,
  label = 'Pay $49.99 and continue',
  fallbackHref = '/match',
  fallbackLabel = 'Continue to the request form',
}: {
  className: string;
  label?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
}) {
  if (!CONCIERGE_CHECKOUT_ENABLED) {
    return (
      <Link href={fallbackHref} className={className}>
        {fallbackLabel}
      </Link>
    );
  }

  return (
    <form action="/api/stripe/checkout" method="POST">
      <input type="hidden" name="product" value={CONCIERGE_MATCH_PRODUCT} />
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
