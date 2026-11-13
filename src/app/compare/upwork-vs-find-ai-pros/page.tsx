import type { Metadata } from 'next';
import Link from 'next/link';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/compare/upwork-vs-find-ai-pros', {
  title: 'Find AI Pros vs Freelance Marketplaces',
  description:
    'Find AI Pros charges experts a flat listing fee. Published marketplace rates are cited on the cost guide.',
});

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Find AI Pros and freelance marketplaces</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Find AI Pros is a directory of AI consultants. Experts pay a flat listing fee after 30 free days. There is no commission on the project. Buyers can browse or pay $49.99 for introductions.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        Published hourly and project ranges from Upwork, ZipRecruiter, and Clutch are on the{' '}
        <Link href="/ai-consultant-cost" className="font-medium text-brand">
          cost guide
        </Link>
        . Find AI Pros listing fees are on{' '}
        <Link href="/for-ai-experts" className="font-medium text-brand">
          the expert page
        </Link>
        .
      </p>
    </div>
  );
}
