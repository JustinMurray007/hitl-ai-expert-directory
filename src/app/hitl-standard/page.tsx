import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/hitl-standard', {
  title: 'The HITL Standard: Human Fallback for AI Systems',
  description:
    'Find AI Pros lists an AI expert only if they name an accountable person and the exact handoff when the system is uncertain or wrong.',
});

export default function HitlStandardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">The HITL Standard</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Find AI Pros lists AI experts only if they name an accountable person and describe exactly what happens when their AI is uncertain or wrong. Featured placements are paid and labeled. Experts who break the standard can be removed.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-ink">The question every applicant answers</h2>
      <blockquote className="mt-4 border-l-4 border-brand pl-4 text-lg font-medium text-ink">
        What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?
      </blockquote>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        If an applicant cannot describe a concrete human check, such as a team approval alert, an error review step, or a live phone handoff to staff, the application is rejected. Case studies are optional. A reference we can contact is still required before a listing is marked verified.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        How the directory uses this rule is also on{' '}
        <Link href="/about" className="font-medium text-brand">
          How Find AI Pros works
        </Link>
        .
      </p>
      <FaqList
        entries={[
          {
            question: 'What is human-in-the-loop AI here?',
            answer:
              'It means a named person can step in when the system is unsure or wrong. The expert has to describe that handoff before they are listed.',
          },
          {
            question: 'What happens if an expert breaks the standard?',
            answer: 'They can be suspended or removed, including on a paid placement.',
          },
        ]}
      />
    </div>
  );
}
