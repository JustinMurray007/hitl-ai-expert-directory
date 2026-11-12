'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { isExpertId } from '@/lib/billing/pay-link';
import type { BillingPeriod, CheckoutPlan } from '@/lib/stripe-links';
import { extraCategoryQuantity, includedCategoryPhrase } from '@/lib/billing/category-cap';

const APPLICATION_HREF = '#application';
const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';

export type PricingCategory = {
  slug: string;
  name: string;
};

const PLANS: {
  id: CheckoutPlan;
  name: string;
  ribbon: string;
  monthly: string;
  yearly: string;
  yearlyNote: string;
  points: string[];
  highlighted?: boolean;
}[] = [
  {
    id: 'basic',
    name: 'Basic',
    ribbon: 'One category',
    monthly: '$9.99',
    yearly: '$79',
    yearlyNote: '$6.58 / month, billed yearly',
    points: [
      'Listed in 1 category',
      'Link to your website',
    ],
  },
  {
    id: 'featured',
    name: 'Featured',
    ribbon: '3 categories · labeled Featured',
    monthly: '$29.99',
    yearly: '$299.99',
    yearlyNote: '$25.00 / month, billed yearly',
    highlighted: true,
    points: [
      'Listed above Basic listings in 3 categories',
      'Always labeled Featured',
      'Everything in Basic, including your website link',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Featured',
    ribbon: 'Homepage · every category',
    monthly: '$59.99',
    yearly: '$599.99',
    yearlyNote: '$50.00 / month, billed yearly',
    points: [
      'Homepage listing, plus the top of every category',
      'Always labeled Premium Featured',
      'Everything in Featured, including your website link',
    ],
  },
];

function ApplyPricingFromQuery({ categories }: { categories: PricingCategory[] }) {
  const params = useSearchParams();
  const rawExpert = params.get('expert');
  const expertId = isExpertId(rawExpert) ? rawExpert : '';
  return <ApplyPricingBody categories={categories} expertId={expertId} referrer={params.get('ref') || ''} />;
}

function extraPriceLabel(period: BillingPeriod, quantity: number): string {
  const each = period === 'monthly' ? '$9.99/month' : '$79/year';
  const noun = quantity === 1 ? 'category' : 'categories';
  return `${quantity} extra ${noun} at ${each} each`;
}

export default function ApplyPricing({ categories = [] }: { categories?: PricingCategory[] }) {
  return (
    <Suspense fallback={<ApplyPricingBody categories={categories} expertId="" referrer="" />}>
      <ApplyPricingFromQuery categories={categories} />
    </Suspense>
  );
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
  const [selected, setSelected] = useState<string[]>([]);
  const canCheckout = CHECKOUT_ENABLED && expertId.length > 0;

  function toggleCategory(slug: string) {
    setSelected((current) => (
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    ));
  }

  return (
    <section id="pricing" className="scroll-mt-24 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-[#001e00] tracking-tight">
          Listing plans
        </h2>
        <p className="text-base sm:text-lg text-[#5e6d55] mt-3 leading-relaxed">
          A new profile is free for the first 30 days in one category.
          No card required. Nothing is charged automatically. Contractors browse free.
        </p>
        <div className="inline-flex mt-5 px-4 py-2 rounded-full bg-[#108a00] text-white text-sm font-bold">
          Free for 30 days, no card required
        </div>
        {!expertId && (
          <p className="text-sm sm:text-base text-[#5e6d55] mt-4 leading-relaxed">
            Apply first, at no charge. You can choose a paid plan after the application is saved.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="inline-flex rounded-full bg-[#f4f6f4] border border-[#dbe3db] p-1" role="group" aria-label="Billing period">
          <button
            type="button"
            aria-pressed={period === 'monthly'}
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              period === 'monthly' ? 'bg-white text-[#001e00] shadow-xs' : 'text-[#5e6d55]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={period === 'yearly'}
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              period === 'yearly' ? 'bg-white text-[#001e00] shadow-xs' : 'text-[#5e6d55]'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <aside className="mb-5 rounded-3xl p-6 sm:p-7 bg-white border border-[#e4ebe4] shadow-xs">
        <h3 className="text-xl font-black text-[#001e00]">Choose your categories</h3>
        <p className="text-[#5e6d55] mt-2 leading-relaxed">
          Each category has its own page, and people can filter and search the directory by category. The more categories you&apos;re in, the more of those pages and filters you show up in.
        </p>
        <p className="text-[#5e6d55] mt-2 leading-relaxed">
          Extra categories are <strong className="text-[#001e00]">$9.99/month</strong> or <strong className="text-[#001e00]">$79/year</strong> each, on top of your plan. Basic includes 1 category, Featured includes 3, and Premium Featured includes every category. You are only charged for categories past the ones your plan includes.
        </p>
        {categories.length > 0 ? (
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold text-[#001e00]">
              Categories to appear in
            </legend>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((category) => {
                const checked = selected.includes(category.slug);
                return (
                  <label
                    key={category.slug}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 cursor-pointer ${
                      checked ? 'border-[#108a00] bg-[#f2faf3]' : 'border-[#dbe3db] bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#108a00]"
                      checked={checked}
                      onChange={() => toggleCategory(category.slug)}
                    />
                    <span className="text-sm font-bold text-[#001e00]">{category.name}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : (
          <p className="mt-4 text-sm text-[#5e6d55]">Categories are not available right now. Refresh and try again.</p>
        )}
        {canCheckout && selected.length === 0 && (
          <p className="mt-3 text-sm font-semibold text-[#001e00]">Choose at least one category before checkout.</p>
        )}
      </aside>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const included = includedCategoryPhrase(plan.id, categories.length);
          const extra = extraCategoryQuantity(selected.length, plan.id, Math.max(categories.length, selected.length));
          const planLabel = plan.name === 'Premium Featured' ? 'Premium' : plan.name;
          const buttonLabel = canCheckout || expertId ? `Get started — ${planLabel}` : 'Apply free first';
          const buttonClass = `w-full inline-flex items-center justify-center px-5 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors ${
            plan.highlighted
              ? 'bg-[#108a00] hover:bg-[#14a800] text-white shadow-sm'
              : 'bg-white hover:bg-[#f2faf3] text-[#108a00] border border-[#108a00]'
          }`;
          return (
            <article
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 bg-white flex flex-col ${
                plan.highlighted
                  ? 'border-2 border-[#108a00] shadow-md'
                  : 'border border-[#e4ebe4] shadow-xs'
              }`}
            >
              <p className="text-xs font-mono uppercase tracking-wider text-[#108a00] font-bold">
                {plan.ribbon}
              </p>
              <h3 className="text-2xl font-black text-[#001e00] mt-2">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tight text-[#001e00]">
                  {period === 'monthly' ? plan.monthly : plan.yearly}
                </span>
                <span className="text-[#5e6d55] font-semibold">
                  {period === 'monthly' ? '/ month' : '/ year'}
                </span>
              </div>
              <p className="text-sm text-[#5e6d55] min-h-[1.25rem] mt-1">
                {period === 'yearly' ? plan.yearlyNote : ''}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#001e00] leading-relaxed">
                Your plan includes {included}. Choose which ones you want to appear in.
              </p>
              <ul className="mt-4 space-y-3 text-sm sm:text-base text-[#334133] flex-1">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#5e6d55] leading-relaxed min-h-[2.5rem]">
                {extra > 0
                  ? `Adds ${extraPriceLabel(period, extra)}.`
                  : plan.id === 'premium'
                    ? 'No extra category charge on this plan.'
                    : 'No extra category charge for this selection.'}
              </p>
              {canCheckout ? (
                <form action="/api/stripe/checkout" method="POST" className="mt-6">
                  <input type="hidden" name="plan" value={plan.id} />
                  <input type="hidden" name="interval" value={period === 'yearly' ? 'year' : 'month'} />
                  <input type="hidden" name="category_slugs" value={selected.join(',')} />
                  <input type="hidden" name="extra_category_quantity" value={extra} />
                  <input type="hidden" name="expert_id" value={expertId} />
                  <input type="hidden" name="referrer_expert_id" value={referrer} />
                  <button
                    type="submit"
                    disabled={selected.length === 0}
                    className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {buttonLabel}
                  </button>
                </form>
              ) : (
                <a
                  href={APPLICATION_HREF}
                  className={`mt-6 ${buttonClass}`}
                >
                  {buttonLabel}
                </a>
              )}
              <p className="mt-3 text-xs text-[#738273] text-center leading-relaxed">
                You are only charged when you choose this plan. New profiles are free for 30 days, no card required.
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-3xl p-6 sm:p-8 bg-white border border-[#e4ebe4] shadow-xs">
        <h3 className="text-xl font-black text-[#001e00]">How listings work</h3>
        <ul className="mt-4 space-y-3 text-sm sm:text-base text-[#334133] leading-relaxed">
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
            <strong>Featured and Premium Featured are paid placements, and they are clearly labeled.</strong> They change where you appear.
          </li>
          <li>
            A specialist who breaks the standard can be suspended or removed, including on a paid placement.
          </li>
        </ul>
      </div>

      <div className="mt-5 rounded-3xl p-6 sm:p-8 bg-white border border-[#e4ebe4] shadow-xs">
        <h3 className="text-xl font-black text-[#001e00] mb-2">FAQ</h3>
        <details open className="border-t border-[#e4ebe4] py-4 group">
          <summary className="cursor-pointer font-bold text-[#001e00]">What happens after 30 days?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            Nothing is charged automatically. You get a reminder email at day 15, and another on day 30 if you have not picked a plan.
            If you are on Basic, Featured, or Premium Featured, that plan continues, and your website and social links stay visible.
            If you have not picked a plan, your listing stays on the site as a limited profile: your name and category stay public.
            Your website link, social links, contact and lead routing, and match eligibility come off until you start a plan.
            The listing is not hidden. The same limited profile applies when a paid subscription ends.
          </p>
        </details>
        <details className="border-t border-[#e4ebe4] py-4">
          <summary className="cursor-pointer font-bold text-[#001e00]">If I pay during the 30 free days, when does the plan start?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            The paid plan starts immediately. No card is collected at signup, and the free 30 days are not a Stripe trial. Choosing a plan opens Stripe Checkout. You are only charged when you pay.
          </p>
        </details>
        <details className="border-t border-[#e4ebe4] py-4">
          <summary className="cursor-pointer font-bold text-[#001e00]">Why would I add more categories?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            Each category has its own page, and people can filter and search the directory by category. The more categories you&apos;re in, the more of those pages and filters you show up in. Your plan includes a set number of categories. Choose which ones you want to appear in. Categories past that number are $9.99/month or $79/year each. Premium Featured includes every category.
          </p>
        </details>
        <details className="border-t border-[#e4ebe4] py-4">
          <summary className="cursor-pointer font-bold text-[#001e00]">How are Featured and Premium Featured labeled?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            Paid placements are labeled Featured or Premium Featured on the profile and on expert cards, so a contractor can tell them from a Basic listing.
          </p>
        </details>
        <details className="border-t border-[#e4ebe4] py-4">
          <summary className="cursor-pointer font-bold text-[#001e00]">Do contractors pay to use the Directory?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            No. Contractors can browse and request a match at no charge.
          </p>
        </details>
      </div>
    </section>
  );
}
