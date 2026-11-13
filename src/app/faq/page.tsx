import type { Metadata } from 'next';
import FaqList from '@/components/FaqList';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/faq', {
  title: 'Find AI Pros FAQ',
  description: 'Answers about hiring, listing, and the $49.99 concierge match. Prices below are the ones this site charges.',
});

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Questions about Find AI Pros</h1>
      <FaqList
        title="Hiring and listing"
        entries={[
          {
            question: 'How do I find a good AI consultant for my business?',
            answer: 'Browse the directory by industry, need, or city, or pay $49.99 to be introduced to at least 3 experts within 48 hours.',
          },
          {
            question: 'How much does it cost to hire an AI expert?',
            answer: 'The concierge introduction is $49.99 and does not include the build. Project prices are whatever you agree with the consultant. The cost guide cites third-party hourly and project ranges.',
          },
          {
            question: 'Can I list my AI agency on Find AI Pros?',
            answer: 'Yes. Listing is free for 30 days in one category, then $9.99, $29.99, or $59.99 a month. There is no commission on client work.',
          },
          {
            question: 'What do I get for $49.99?',
            answer: 'A private review of your process and tools, and an introduction to at least 3 experts within 48 hours. You do not have to hire any of them.',
          },
          {
            question: 'Are listings paid?',
            answer: 'The first 30 days are free. After that, placement plans are paid and labeled.',
          },
        ]}
      />
    </div>
  );
}
