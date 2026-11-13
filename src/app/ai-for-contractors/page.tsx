import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/ai-for-contractors', {
  title: 'AI for Contractors and Remodelers: Never Miss a Lead',
  description:
    'AI voice dispatch, missed-call text-back, and estimate follow-up for remodelers and builders. The owner approves every price.',
});

export default function AiForContractorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">AI for contractors and remodelers</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Contractors lose jobs when calls go to voicemail while they are on site. AI receptionists can answer and text back, and book estimate visits, while the owner approves every price. The specialists who build this for home services are on the industry page.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        <Link href="/ai-solutions-by-industry/home-services-trades" className="font-medium text-brand">
          AI for home services and trades
        </Link>
      </p>
      <p className="mt-4 text-sm text-muted">
        TODO: an unsourced &quot;74% of the time&quot; claim appeared on the contractor landing pages. It is not repeated here. Add a statistic only with a citation.
      </p>
      <FaqList
        entries={[
          {
            question: 'What does an AI receptionist do for a contractor?',
            answer: 'It can answer calls, text back missed calls, and book an estimate visit. Pricing still waits for the owner or estimator.',
          },
          {
            question: 'Will AI give homeowners prices?',
            answer: 'Not on the Find AI Pros standard. The owner or a licensed estimator approves numbers before a proposal goes out.',
          },
        ]}
      />
    </div>
  );
}
