import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { getExperts } from '@/lib/store';
import { withCanonical } from '@/lib/seo';
import type { BudgetTier } from '@/lib/types';

export const metadata: Metadata = withCanonical('/ai-consultant-cost', {
  title: 'AI Consultant Cost: Starting Budgets on Find AI Pros',
  description:
    'Starting project budgets published by vetted AI consultants on Find AI Pros, plus the $49.99 concierge match. Hourly rates are not listed.',
});

const TIERS: { id: BudgetTier; label: string }[] = [
  { id: 'under_2500', label: 'Under $2,500' },
  { id: '2500_to_5000', label: '$2,500 to $5,000' },
  { id: '5000_to_15000', label: '$5,000 to $15,000' },
  { id: '15000_plus', label: '$15,000 and up' },
];

export default async function AiConsultantCostPage() {
  const experts = await getExperts();
  const listed = experts.filter((expert) => expert.starting_budget);
  const counts = TIERS.map((tier) => ({
    ...tier,
    count: listed.filter((expert) => expert.starting_budget === tier.id).length,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm font-medium text-brand">Updated from the live directory</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">AI consultant cost</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Find AI Pros publishes each listed expert&apos;s starting project budget. Of {listed.length} published profiles with a budget, the counts below are what those profiles say. This is not an hourly rate card, and it is not a quote for your project.
      </p>
      <table className="mt-8 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2 font-semibold text-ink">Starting budget on the profile</th>
            <th className="py-2 font-semibold text-ink">Profiles</th>
          </tr>
        </thead>
        <tbody>
          {counts.map((row) => (
            <tr key={row.id} className="border-b border-line">
              <td className="py-3 text-ink">{row.label}</td>
              <td className="py-3 text-ink">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm text-muted">
        TODO: hourly rates, retainers, and typical timelines are not stored on profiles. Do not add them until the directory records them.
      </p>
      <p className="mt-6 text-base leading-relaxed text-muted-strong">
        Concierge Match is a separate {''}
        <Link href="/match" className="font-medium text-brand">
          $49.99 introduction
        </Link>
        . It does not include the build. Listing plans for experts are on{' '}
        <Link href="/apply" className="font-medium text-brand">
          the apply page
        </Link>
        .
      </p>
      <FaqList
        entries={[
          {
            question: 'How much does it cost to hire an AI expert?',
            answer:
              'The directory shows a starting project budget on each profile. Use the table on this page for the current counts. The concierge introduction is $49.99 and does not include the project.',
          },
          {
            question: 'Do these numbers include hourly rates?',
            answer: 'No. Profiles list a starting budget tier, not an hourly rate.',
          },
        ]}
      />
    </div>
  );
}
