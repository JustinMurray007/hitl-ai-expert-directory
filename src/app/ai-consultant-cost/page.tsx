import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/ai-consultant-cost', {
  title: 'AI Consultant Cost: Hourly and Project Ranges',
  description:
    'Hourly and project ranges for AI consultants from Upwork, ZipRecruiter, and Clutch, read on November 13, 2026. Find AI Pros match is $49.99.',
});

const READ = 'November 13, 2026';

export default function AiConsultantCostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-sm font-medium text-brand">Figures read {READ}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">What AI consultants charge</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Published ranges differ by whether you are hiring a freelancer, looking at an employed salary, or hiring a firm. The numbers below are copied from pages read on {READ}. They are not quotes from Find AI Pros, and they are not a price for your project. Glassdoor and Indeed did not load, so those sites are not included.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-ink">Hourly</h2>
      <ul className="mt-4 space-y-4 text-base leading-relaxed text-ink">
        <li>
          <a className="font-medium text-brand" href="https://www.upwork.com/hire/ai-consultants/">
            Upwork&apos;s AI consultants hiring page
          </a>{' '}
          (page titled for November 2026) says hiring an AI consultant on Upwork generally ranges from $35 to $60 per hour, similar to AI engineers, and that the most experienced consultants charge $100 per hour or more.
        </li>
        <li>
          <a className="font-medium text-brand" href="https://www.ziprecruiter.com/Salaries/Ai-Consultant-Salary">
            ZipRecruiter&apos;s AI Consultant salary page
          </a>{' '}
          says that as of November 13, 2026 the average annual pay in the United States is $86,430, about $41.55 an hour. It also says the majority of salaries range from $61,000 a year (25th percentile) to $103,000 (75th percentile). That is an employed-role estimate, not a freelance invoice rate.
        </li>
        <li>
          <a className="font-medium text-brand" href="https://clutch.co/consulting/ai">
            Clutch&apos;s AI consulting directory
          </a>{' '}
          (ratings updated November 11, 2026) lists firm-level rates rather than one market range. Two profiles on the first screen: Azumo in San Francisco lists a $25 to $49 average hourly rate and a $10,000+ minimum project size. ISBX Corp in Los Angeles lists a $150 to $199 average hourly rate and a $25,000+ minimum project size.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold text-ink">Per project</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        The same Upwork page publishes these project bands. They are Upwork&apos;s categories, not Find AI Pros packages.
      </p>
      <table className="mt-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2 pr-4 font-semibold text-ink">Upwork category</th>
            <th className="py-2 font-semibold text-ink">Published range</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">AI readiness audit</td>
            <td className="py-3">$1,500 to $4,000</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">AI strategy and roadmap</td>
            <td className="py-3">$4,000 to $10,000</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">Proof of concept build</td>
            <td className="py-3">$8,000 to $20,000</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-3 pr-4">Ongoing advisory and deployment</td>
            <td className="py-3">$3,000 to $12,000</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        A strategy engagement lines up with Upwork&apos;s &quot;AI strategy and roadmap&quot; row. A small build lines up more closely with the readiness audit or the proof-of-concept row, depending on whether you want a written plan or a working prototype. This page does not add a separate price for a chatbot or a voice receptionist, because none of the pages read on {READ} published one.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-strong">
        Find AI Pros Concierge Match is $49.99 one time for introductions. That fee is not the consultant&apos;s project price.{' '}
        <Link href="/match" className="font-medium text-brand">
          See the match page
        </Link>
        .
      </p>
      <FaqList
        entries={[
          {
            question: 'Why do the hourly numbers disagree?',
            answer:
              'Upwork is describing freelance invoices. ZipRecruiter is describing an employed salary converted to an hour. Clutch lists individual firms, and those firms are not in the same band.',
          },
          {
            question: 'Does $49.99 hire the consultant?',
            answer: 'No. It is the directory match fee. The project price is whatever you agree with the consultant.',
          },
        ]}
      />
    </div>
  );
}
