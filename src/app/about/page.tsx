import Link from 'next/link';
import { withCanonical } from '@/lib/seo';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH } from '@/lib/business-routes';
import { ArrowRight } from 'lucide-react';

export const metadata = withCanonical('/about', {
  title: 'How Find AI Pros Works',
  description:
    'Browse AI consultants by industry, need, or city, or pay $49.99 for introductions within 48 hours. Listing plans for experts start after 30 free days.',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <section id="how-it-works" className="text-center space-y-8">
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          How Find AI Pros Works
        </h1>
        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-normal">
          Search our database of AI experts directly, or search by your business type and needs, and choose one or multiple options to get estimates or bids for your projects.
        </p>
        <ol data-reveal-stagger className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <li className="rounded-2xl border border-line bg-white p-6">
            <span className="text-sm font-medium text-brand">1</span>
            <h2 className="mt-2 text-lg font-medium text-ink">Search experts directly</h2>
            <p className="mt-2 text-sm text-muted-strong leading-relaxed">Open the directory and look through AI specialists.</p>
            <Link href="/experts" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Browse experts <ArrowRight className="w-4 h-4" />
            </Link>
          </li>
          <li className="rounded-2xl border border-line bg-white p-6">
            <span className="text-sm font-medium text-brand">2</span>
            <h2 className="mt-2 text-lg font-medium text-ink">Search by business type</h2>
            <p className="mt-2 text-sm text-muted-strong leading-relaxed">Start from your industry and the work you need done.</p>
            <Link href={AI_SOLUTIONS_BY_INDUSTRY_PATH} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Match by category <ArrowRight className="w-4 h-4" />
            </Link>
          </li>
          <li className="rounded-2xl border border-line bg-white p-6">
            <span className="text-sm font-medium text-brand">3</span>
            <h2 className="mt-2 text-lg font-medium text-ink">Request estimates</h2>
            <p className="mt-2 text-sm text-muted-strong leading-relaxed">Choose one or several options and ask for bids on the project.</p>
            <Link href="/match" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Concierge match <ArrowRight className="w-4 h-4" />
            </Link>
          </li>
        </ol>
      </section>

      {/* Listing plans */}
      <section data-reveal className="space-y-6 rounded-3xl border border-line bg-white p-6 shadow-rest sm:p-10">
        <div className="border-b border-line-soft pb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
            Placement is what you pay for.
          </h2>
          <p className="text-sm sm:text-base text-muted mt-1.5 leading-relaxed font-normal">
            Each category has its own page, and people can filter and search the directory by category. The more categories you&apos;re in, the more of those pages and filters you show up in. Your plan includes a set number of categories. Choose which ones you want to appear in.
          </p>
        </div>

        <ul className="space-y-3 text-ink-soft text-sm sm:text-base leading-relaxed">
          <li>New profiles are free for the first 30 days in one category. No card required. Nothing is charged automatically. Website and social links show during those 30 days and on any paid plan. If you pay during the 30 days, the paid plan starts that day. It is not a Stripe trial. When a subscription ends, the listing becomes a limited profile.</li>
          <li><strong>Basic</strong> — $9.99/month or $79/year. One category, including a link to their website.</li>
          <li><strong>Featured</strong> — $29.99/month or $299.99/year. Labeled Featured, and listed above Basic listings in 3 categories.</li>
          <li><strong>Premium Featured</strong> — $59.99/month or $599.99/year. Labeled Premium Featured. Homepage listing plus the top of every category.</li>
          <li>Extra categories are $9.99/month or $79/year each. Basic includes 1, Featured includes 3, and Premium Featured includes every category, so Premium does not need extras.</li>
          <li>After 30 days without a plan, the listing stays visible as a limited profile (name and category). The website link, social links, contact and lead routing, and match eligibility come off. It is not hidden and it is not auto-charged. Reminder emails go out at day 15 and on day 30 if they have not picked a plan.</li>
        </ul>

        <Link
          href="/apply#pricing"
          className="inline-flex items-center gap-2 text-brand font-bold hover:underline"
        >
          See plans and apply <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-md transition-all"
        >
          Submit Your Application <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
