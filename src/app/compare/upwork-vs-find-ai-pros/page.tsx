import type { Metadata } from 'next';
import Link from 'next/link';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/compare/upwork-vs-find-ai-pros', {
  title: 'Find AI Pros vs Freelance Marketplaces',
  description:
    'Find AI Pros charges experts a flat listing fee and requires a human fallback. This page does not invent competitor prices.',
});

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Find AI Pros and freelance marketplaces</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Find AI Pros is a directory of AI consultants who name an accountable person and a human fallback. Experts pay a flat listing fee after 30 free days. There is no commission on the project. Buyers can browse or pay $49.99 for introductions.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        TODO: do not add Upwork, Clutch, or other marketplace fees, commission rates, or rankings until each figure has a citation. The comparison that is safe to publish today is only the Find AI Pros side:{' '}
        <Link href="/for-ai-experts" className="font-medium text-brand">
          flat listing fees
        </Link>{' '}
        and the{' '}
        <Link href="/hitl-standard" className="font-medium text-brand">
          HITL Standard
        </Link>
        .
      </p>
    </div>
  );
}
