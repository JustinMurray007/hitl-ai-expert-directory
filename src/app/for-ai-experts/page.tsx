import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { CATALOG_PRICES } from '@/lib/billing/catalog';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/for-ai-experts', {
  title: 'List Your AI Agency: Flat Fee, No Commission | Find AI Pros',
  description:
    'AI consultants can list free for 30 days, then pay a flat monthly fee. Find AI Pros does not take a commission on client work.',
});

function dollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ForAiExpertsPage() {
  const monthly = CATALOG_PRICES.filter((price) => price.interval === 'month' && price.tier !== 'extra_category');
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">List your AI consulting business</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Business owners search Find AI Pros by industry, business need, and city. A new listing is free for 30 days in one category, with no card. After that, plans are a flat fee. Find AI Pros does not take a commission on the work you win.
      </p>
      <ul className="mt-6 space-y-2 text-base text-ink">
        {monthly.map((price) => (
          <li key={price.lookupKey}>
            {price.tier === 'basic' ? 'Basic' : price.tier === 'premium' ? '$59.99 plan' : '$29.99 plan'}: {dollars(price.unitAmount)} per month
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        Extra categories past the plan&apos;s included set are priced on the apply page. Yearly prices are there too.
      </p>
      <p className="mt-6 text-base leading-relaxed text-muted-strong">
        The application form stays on{' '}
        <Link href="/apply" className="font-medium text-brand">
          /apply
        </Link>
        .
      </p>
      <FaqList
        entries={[
          {
            question: 'Is it free to list my AI agency?',
            answer: 'Yes for 30 days in one category, with no card. After that, a paid plan is required to keep links and match eligibility.',
          },
          {
            question: 'Do you take a commission on projects?',
            answer: 'No. Listing fees are flat. Find AI Pros does not take a percentage of client work.',
          },
        ]}
      />
    </div>
  );
}
