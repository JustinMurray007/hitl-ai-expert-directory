'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { isExpertId } from '@/lib/billing/pay-link';
import type { BillingPeriod, CheckoutPlan } from '@/lib/stripe-links';
import { FREE_INCLUDED_CATEGORIES, includedCategoryCount, includedCategoryPhrase } from '@/lib/billing/category-cap';
import JsonLd from '@/components/JsonLd';
import { faqPage, graph } from '@/lib/schema';

const APPLICATION_HREF = '#application';
const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';

export type PricingCategory = {
  slug: string;
  name: string;
};

type ApplyPlanId = CheckoutPlan | 'start';

const STARTER_NAME = 'Free to Start (then only $9.99)';
const STARTER_MONTHLY = '$9.99';

const PLANS: {
  id: ApplyPlanId;
  name: string;
  monthly: string;
  yearly: string;
  yearlyNote: string;
  points: string[];
  highlighted?: boolean;
}[] = [
  {
    id: 'start',
    name: STARTER_NAME,
    monthly: STARTER_MONTHLY,
    yearly: STARTER_MONTHLY,
    yearlyNote: '',
    points: [
      'Free for the first 30 days',
      'No card required, and nothing is charged automatically',
      FREE_INCLUDED_CATEGORIES === 1 ? 'Listed in 1 category' : `Listed in ${FREE_INCLUDED_CATEGORIES} categories`,
      'After 30 days, $9.99/month keeps the listing',
    ],
  },
  {
    id: 'featured',
    name: '$29.99 plan',
    monthly: '$29.99',
    yearly: '$299.99',
    yearlyNote: '$25.00 / month, billed yearly',
    highlighted: true,
    points: [
      'Listed in 3 categories',
      'Includes your website link',
    ],
  },
  {
    id: 'premium',
    name: '$59.99 plan',
    monthly: '$59.99',
    yearly: '$599.99',
    yearlyNote: '$50.00 / month, billed yearly',
    points: [
      'Homepage listing, plus the top of every category',
      'Everything in the $29.99 plan, including your website link',
    ],
  },
];

function ApplyPricingFromQuery({ categories }: { categories: PricingCategory[] }) {
  const params = useSearchParams();
  const rawExpert = params.get('expert');
  const expertId = isExpertId(rawExpert) ? rawExpert : '';
  return <ApplyPricingBody categories={categories} expertId={expertId} referrer={params.get('ref') || ''} />;
}

export default function ApplyPricing({ categories = [] }: { categories?: PricingCategory[] }) {
  return (
    <Suspense fallback={<ApplyPricingBody categories={categories} expertId="" referrer="" />}>
      <ApplyPricingFromQuery categories={categories} />
    </Suspense>
  );
}

function limitFor(plan: ApplyPlanId, available: number): number {
  if (plan === 'start') return includedCategoryCount('basic', available);
  return includedCategoryCount(plan, available);
}

function ApplyPricingBody({
  categories,
  expertId,
  referrer,
}: {
  categories: PricingCategory[];
  expertId: string;
  referrer: string;
}) {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<ApplyPlanId>('start');
  const [selected, setSelected] = useState<string[]>([]);
  const canCheckout = CHECKOUT_ENABLED && expertId.length > 0;
  const categoryLimit = limitFor(selectedPlan, categories.length);
  const starterLimit = limitFor('start', categories.length);
  const starterCategories = starterLimit === 1 ? '1 category' : `${starterLimit} categories`;
  const activePlan = PLANS.find((plan) => plan.id === selectedPlan) ?? PLANS[0];

  function choosePlan(plan: ApplyPlanId) {
    setSelectedPlan(plan);
    const limit = limitFor(plan, categories.length);
    setSelected((current) => current.slice(0, limit));
  }

  function toggleCategory(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= categoryLimit) return current;
      return [...current, slug];
    });
  }

  return (
    <section id="pricing" className="mb-16 scroll-mt-24">
      <div data-reveal className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
          Listing plans
        </h2>
        <p className="text-base sm:text-lg text-muted mt-3 leading-relaxed">
          A new profile is free for the first 30 days in one category.
          No card required. Nothing is charged automatically. Contractors browse free.
        </p>
        <div className="inline-flex mt-5 px-4 py-2 rounded-full bg-brand text-white text-sm font-bold">
          Free for 30 days, no card required
        </div>
        {!expertId && (
          <p className="text-sm sm:text-base text-muted mt-4 leading-relaxed">
            Choose a plan, then the categories that plan includes. Starting the 30 days does not open checkout.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="inline-flex rounded-full bg-canvas-muted border border-line p-1" role="group" aria-label="Billing period">
          <button
            type="button"
            aria-pressed={period === 'monthly'}
            onClick={() => setPeriod('monthly')}
            className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-bold ${
              period === 'monthly' ? 'bg-white text-ink shadow-rest' : 'text-muted'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={period === 'yearly'}
            onClick={() => setPeriod('yearly')}
            className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-bold ${
              period === 'yearly' ? 'bg-white text-ink shadow-rest' : 'text-muted'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div data-reveal-stagger className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((plan) => {
          const chosen = selectedPlan === plan.id;
          const included = plan.id === 'start'
            ? (limitFor('start', categories.length) === 1 ? '1 category' : `${limitFor('start', categories.length)} categories`)
            : includedCategoryPhrase(plan.id, categories.length);
          const starter = plan.id === 'start';
          return (
            <article
              key={plan.id}
              className={`flex flex-col rounded-3xl bg-white p-6 sm:p-7 ${
                chosen ? 'border-2 border-brand shadow-md' : 'border border-line shadow-xs'
              }`}
            >
              <h3 className="text-2xl font-semibold text-ink">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink">
                  {starter ? STARTER_MONTHLY : period === 'monthly' ? plan.monthly : plan.yearly}
                </span>
                <span className="text-muted font-semibold">
                  {starter ? '/ month after 30 days' : period === 'monthly' ? '/ month' : '/ year'}
                </span>
              </div>
              <p className="text-sm text-muted min-h-[1.25rem] mt-1">
                {starter
                  ? 'Free for the first 30 days. No card required.'
                  : period === 'yearly' ? plan.yearlyNote : ''}
              </p>
              <p className="mt-3 text-sm font-semibold text-ink leading-relaxed">
                This plan includes {included}.
              </p>
              <ul className="mt-4 space-y-3 text-sm sm:text-base text-ink-soft flex-1">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-pressed={chosen}
                onClick={() => choosePlan(plan.id)}
                className={`mt-6 w-full inline-flex items-center justify-center px-5 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors ${
                  chosen
                    ? 'bg-warm text-white shadow-sm'
                    : 'bg-white text-brand border border-brand hover:bg-brand-soft'
                }`}
              >
                {chosen ? 'Selected' : `Choose ${plan.name}`}
              </button>
            </article>
          );
        })}
      </div>

      <aside className="mb-5 rounded-3xl p-6 sm:p-7 bg-white border border-line shadow-xs">
        <h3 className="text-xl font-semibold text-ink">Choose your categories</h3>
        <p className="text-muted mt-2 leading-relaxed">
          Each category has its own page, and people can filter and search the directory by category. The more categories you&apos;re in, the more of those pages and filters you show up in.
        </p>
        <p className="text-muted mt-2 leading-relaxed">
          The plan you selected sets how many categories you can choose. {STARTER_NAME} includes {starterCategories}, the $29.99 plan includes 3, and the $59.99 plan includes every category.
        </p>
        {categories.length > 0 ? (
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-ink">
              Categories to appear in ({selected.length} of {categoryLimit})
            </legend>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((category) => {
                const checked = selected.includes(category.slug);
                return (
                  <label
                    key={category.slug}
                    className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 ${
                      checked ? 'border-brand bg-brand-soft' : 'border-line bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-brand"
                      checked={checked}
                      disabled={!checked && selected.length >= categoryLimit}
                      onChange={() => toggleCategory(category.slug)}
                    />
                    <span className="text-sm font-bold text-ink">{category.name}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <p className="mt-4 text-sm text-muted">Categories are not available right now. Refresh and try again.</p>
        )}
        {activePlan.id !== 'start' && canCheckout && selected.length === 0 && (
          <p className="mt-3 text-sm font-semibold text-ink">Choose at least one category before checkout.</p>
        )}
      </aside>

      {activePlan.id !== 'start' && canCheckout ? (
        <form action="/api/stripe/checkout" method="POST" className="mt-5">
          <input type="hidden" name="plan" value={activePlan.id} />
          <input type="hidden" name="interval" value={period === 'yearly' ? 'year' : 'month'} />
          <input type="hidden" name="category_slugs" value={selected.join(',')} />
          <input type="hidden" name="extra_category_quantity" value="0" />
          <input type="hidden" name="expert_id" value={expertId} />
          <input type="hidden" name="referrer_expert_id" value={referrer} />
          <button
            type="submit"
            disabled={selected.length === 0}
            className="inline-flex items-center justify-center rounded-full bg-warm px-6 py-3.5 text-sm font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            Get started — {activePlan.name}
          </button>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            You are only charged when you choose this plan. New profiles are free for 30 days, no card required.
          </p>
        </form>
      ) : (
        <div className="mt-5">
          <a
            href={APPLICATION_HREF}
            className="inline-flex items-center justify-center rounded-full bg-warm px-6 py-3.5 text-sm font-bold text-white shadow-sm sm:text-base"
          >
            Continue to the application
          </a>
          {activePlan.id === 'start' && canCheckout && (
            <form action="/api/stripe/checkout" method="POST" className="mt-4">
              <input type="hidden" name="plan" value="basic" />
              <input type="hidden" name="interval" value="month" />
              <input type="hidden" name="category_slugs" value={selected.join(',')} />
              <input type="hidden" name="extra_category_quantity" value="0" />
              <input type="hidden" name="expert_id" value={expertId} />
              <input type="hidden" name="referrer_expert_id" value={referrer} />
              <button
                type="submit"
                disabled={selected.length === 0}
                className="inline-flex items-center justify-center rounded-full border border-brand bg-white px-6 py-3.5 text-sm font-bold text-brand disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
              >
                Keep the listing at {STARTER_MONTHLY}/month
              </button>
              <p className="mt-3 text-xs text-muted leading-relaxed">
                Starting does not open checkout. After the 30 days, this $9.99 checkout is what keeps the listing. Nothing is charged until you pay.
              </p>
            </form>
          )}
        </div>
      )}

      <div className="mt-5 rounded-3xl p-6 sm:p-8 bg-white border border-line shadow-xs">
        <h3 className="text-xl font-semibold text-ink">How listings work</h3>
        <ul className="mt-4 space-y-3 text-sm sm:text-base text-ink-soft leading-relaxed">
          <li>
            <strong>Your profile is free for the first 30 days</strong> in one category. No card is required at signup, and nothing is charged automatically. The 30 days are tracked in the directory, not as a Stripe trial. During those 30 days, your website and social links are shown.
          </li>
          <li>
            <strong>If you pay during those 30 days, the paid plan starts that day.</strong> There is no trial on the subscription. When a subscription ends, the listing becomes a limited profile the same way an unpaid listing does after day 30.
          </li>
          <li>
            <strong>On any paid plan,</strong> your website and social links stay on your public profile and expert cards.
          </li>
          <li>
            <strong>After 30 days, if you have not picked a plan,</strong> the listing stays visible as a limited profile: your name and category remain public. Your website link, social links, contact and lead routing, and match eligibility come off until you start a plan. The listing is not hidden, and you are not charged automatically.
          </li>
          <li>
            <strong>The $29.99 and $59.99 plans are paid placements.</strong> They change where you appear. Profiles are not labeled with a placement tag.
          </li>
        </ul>
      </div>

      <div className="mt-5 rounded-3xl p-6 sm:p-8 bg-white border border-line shadow-xs">
        <h3 className="text-xl font-semibold text-ink mb-2">FAQ</h3>
        <JsonLd
          data={graph(
            faqPage([
              {
                question: 'What happens after 30 days?',
                answer:
                  'Nothing is charged automatically. If you have not picked a plan, the listing stays visible as a limited profile: name and category stay public, and website, social, contact, and match eligibility come off until you start a plan.',
              },
              {
                question: 'If I pay during the 30 free days, when does the plan start?',
                answer: 'The paid plan starts immediately. The free 30 days are not a Stripe trial. You are only charged when you pay.',
              },
              {
                question: 'Why would I add more categories?',
                answer:
                  'Each category has its own page. Your plan includes a set number of categories. Categories past that number are $9.99/month or $79/year each. The $59.99 plan includes every category.',
              },
              {
                question: 'Do profiles show a placement label?',
                answer: 'No. Profiles and expert cards do not show a placement tag.',
              },
              {
                question: 'Do contractors pay to use the Directory?',
                answer: 'No. Contractors can browse and request a match at no charge.',
              },
            ]),
          )}
        />
        <details open className="border-t border-line py-4 group">
          <summary className="cursor-pointer font-bold text-ink">What happens after 30 days?</summary>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            Nothing is charged automatically. You get a reminder email at day 15, and another on day 30 if you have not picked a plan.
            If you keep the listing at $9.99 a month, or you are on the $29.99 plan or the $59.99 plan, that plan continues, and your website and social links stay visible.
            If you have not picked a plan, your listing stays on the site as a limited profile: your name and category stay public.
            Your website link, social links, contact and lead routing, and match eligibility come off until you start a plan.
            The listing is not hidden. The same limited profile applies when a paid subscription ends.
          </p>
        </details>
        <details className="border-t border-line py-4">
          <summary className="cursor-pointer font-bold text-ink">If I pay during the 30 free days, when does the plan start?</summary>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            The paid plan starts immediately. No card is collected at signup, and the free 30 days are not a Stripe trial. Starting the 30 days does not open checkout. The $9.99 checkout keeps the listing after that, and the $29.99 and $59.99 plans open checkout when you choose them. You are only charged when you pay.
          </p>
        </details>
        <details className="border-t border-line py-4">
          <summary className="cursor-pointer font-bold text-ink">Why would I add more categories?</summary>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            Each category has its own page, and people can filter and search the directory by category. The more categories you&apos;re in, the more of those pages and filters you show up in. Your plan includes a set number of categories. Choose which ones you want to appear in. Categories past that number are $9.99/month or $79/year each. The $59.99 plan includes every category.
          </p>
        </details>
        <details className="border-t border-line py-4">
          <summary className="cursor-pointer font-bold text-ink">Do profiles show a placement label?</summary>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            No. Profiles and expert cards do not show a placement tag.
          </p>
        </details>
        <details className="border-t border-line py-4">
          <summary className="cursor-pointer font-bold text-ink">Do contractors pay to use the Directory?</summary>
          <p className="mt-2 text-sm sm:text-base text-muted leading-relaxed">
            No. Contractors can browse and request a match at no charge.
          </p>
        </details>
      </div>
    </section>
  );
}
