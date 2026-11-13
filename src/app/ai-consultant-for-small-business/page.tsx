import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/ai-consultant-for-small-business', {
  title: 'AI Consultant for a Small Business | Find AI Pros',
  description:
    'How a small business can hire a vetted AI consultant: browse the directory, compare starting budgets, or get 3 introductions in 48 hours.',
});

export default function SmallBusinessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">AI consultant for a small business</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        A small business can hire from the Find AI Pros directory by browsing specialists, comparing the starting budget and tools on each profile, or paying $49.99 for at least three introductions within 48 hours. Every listed expert names a human fallback for when the AI is unsure.
      </p>
      <ul className="mt-6 space-y-2 text-base">
        <li>
          <Link href="/experts" className="font-medium text-brand">
            Browse the directory
          </Link>
        </li>
        <li>
          <Link href="/ai-solutions-by-industry" className="font-medium text-brand">
            Start from your industry
          </Link>
        </li>
        <li>
          <Link href="/match" className="font-medium text-brand">
            Get a concierge match
          </Link>
        </li>
        <li>
          <Link href="/ai-consultant-cost" className="font-medium text-brand">
            See starting budgets
          </Link>
        </li>
      </ul>
      <p className="mt-6 text-sm text-muted">
        TODO: a published price table for common small-business projects is not in the directory yet. Link the cost guide instead of inventing project prices.
      </p>
      <FaqList
        entries={[
          {
            question: 'How do I find a good AI consultant for my business?',
            answer:
              'Read the human-fallback note, starting budget, and tools on each profile, or ask for a concierge match if you want introductions instead of browsing.',
          },
        ]}
      />
    </div>
  );
}
