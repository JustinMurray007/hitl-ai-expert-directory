'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import type { BillingPeriod, CheckoutPlan } from '@/lib/stripe-links';

const APPLICATION_HREF = '#application';
const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';

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
      'The same vetted badge as every listed specialist',
      'Vetting is included. Paying does not skip it',
    ],
  },
  {
    id: 'featured',
    name: 'Featured',
    ribbon: '4 categories · labeled Featured',
    monthly: '$29.99',
    yearly: '$299.99',
    yearlyNote: '$25.00 / month, billed yearly',
    highlighted: true,
    points: [
      'Listed above Basic listings in 4 categories',
      'Always labeled Featured',
      'Everything in Basic, including your website link',
      'Placement only. It does not skip vetting',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Featured',
    ribbon: 'Homepage · top of 6 categories',
    monthly: '$59.99',
    yearly: '$599.99',
    yearlyNote: '$50.00 / month, billed yearly',
    points: [
      'Homepage listing, plus the absolute top of 6 categories',
      'Always labeled Premium Featured',
      'Everything in Featured, including your website link',
      'Placement only. It does not skip vetting',
    ],
  },
];

function CheckoutIds() {
  const params = useSearchParams();
  return (
    <>
      <input type="hidden" name="expert_id" value={params.get('expert') || ''} />
      <input type="hidden" name="referrer_expert_id" value={params.get('ref') || ''} />
    </>
  );
}

export default function ApplyPricing() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [extraCategories, setExtraCategories] = useState(0);

  return (
    <section id="pricing" className="scroll-mt-24 mb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-[#001e00] tracking-tight">
          Listing plans
        </h2>
        <p className="text-base sm:text-lg text-[#5e6d55] mt-3 leading-relaxed">
          Vetting is always free. A new profile is free for the first 30 days in one category.
          No card required. Nothing is charged automatically. Contractors browse free.
        </p>
        <div className="inline-flex mt-5 px-4 py-2 rounded-full bg-[#108a00] text-white text-sm font-bold">
          Free for 30 days, no card required
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const href = CHECKOUT_ENABLED ? undefined : APPLICATION_HREF;
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
              <ul className="mt-4 space-y-3 text-sm sm:text-base text-[#334133] flex-1">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {href ? (
                <a
                  href={href}
                  className={`mt-6 inline-flex items-center justify-center px-5 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors ${
                    plan.highlighted
                      ? 'bg-[#108a00] hover:bg-[#14a800] text-white shadow-sm'
                      : 'bg-white hover:bg-[#f2faf3] text-[#108a00] border border-[#108a00]'
                  }`}
                >
                  Get started — {plan.name === 'Premium Featured' ? 'Premium' : plan.name}
                </a>
              ) : (
                <form action="/api/stripe/checkout" method="POST" className="mt-6">
                  <input type="hidden" name="plan" value={plan.id} />
                  <input type="hidden" name="interval" value={period === 'yearly' ? 'year' : 'month'} />
                  <input type="hidden" name="extra_category_quantity" value={extraCategories} />
                  <Suspense fallback={null}>
                    <CheckoutIds />
                  </Suspense>
                  <button
                    type="submit"
                    className={`w-full inline-flex items-center justify-center px-5 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors ${
                      plan.highlighted
                        ? 'bg-[#108a00] hover:bg-[#14a800] text-white shadow-sm'
                        : 'bg-white hover:bg-[#f2faf3] text-[#108a00] border border-[#108a00]'
                    }`}
                  >
                    Get started — {plan.name === 'Premium Featured' ? 'Premium' : plan.name}
                  </button>
                </form>
              )}
              <p className="mt-3 text-xs text-[#738273] text-center leading-relaxed">
                You are only charged when you choose this plan. New profiles are free for 30 days, no card required.
              </p>
            </article>
          );
        })}
      </div>

      <aside className="mt-5 rounded-3xl p-6 sm:p-7 bg-white border border-[#e4ebe4] shadow-xs">
        <h3 className="text-xl font-black text-[#001e00]">Extra categories</h3>
        <p className="text-[#5e6d55] mt-2 leading-relaxed">
          Need to be listed in more categories than your plan includes? Extra categories are <strong className="text-[#001e00]">$9.99/month</strong> or <strong className="text-[#001e00]">$79/year</strong> each, on top of your plan. Basic includes 1 category, Featured includes 4, and Premium Featured includes 6.
        </p>
        <label className="mt-4 flex flex-col gap-1 text-sm font-semibold text-[#001e00]">
          Extra categories to add at checkout
          <input
            type="number"
            min={0}
            max={20}
            value={extraCategories}
            onChange={(event) => setExtraCategories(Math.max(0, Math.min(20, Number(event.target.value) || 0)))}
            className="w-28 rounded-lg border border-[#dbe3db] px-3 py-2 font-bold"
          />
        </label>
      </aside>

      <div className="mt-5 rounded-3xl p-6 sm:p-8 bg-white border border-[#e4ebe4] shadow-xs">
        <h3 className="text-xl font-black text-[#001e00]">How listings work</h3>
        <ul className="mt-4 space-y-3 text-sm sm:text-base text-[#334133] leading-relaxed">
          <li>
            <strong>Vetting is always free.</strong> Every specialist is checked the same way. Paying never skips or softens vetting.
          </li>
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
            <strong>After 30 days, if you have not picked a plan,</strong> the listing stays visible as a limited profile: your name, category, and vetted badge remain public. Your website link, social links, contact and lead routing, and match eligibility come off until you start a plan. The listing is not hidden, and you are not charged automatically.
          </li>
          <li>
            <strong>Featured and Premium Featured are paid placements, and they are clearly labeled.</strong> They change where you appear. They do not change whether you are vetted.
          </li>
          <li>
            The Directory does not guarantee results, leads, or hired work. A specialist who breaks the standard can be suspended or removed, including on a paid placement.
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
            If you have not picked a plan, your listing stays on the site as a limited profile: your name, category, and vetted badge stay public.
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
          <summary className="cursor-pointer font-bold text-[#001e00]">Does paying skip vetting?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            No. Vetting is free for every applicant and is never a paid upgrade. Featured and Premium Featured buy placement. They do not buy a different vetting bar, and they do not buy the badge.
          </p>
        </details>
        <details className="border-t border-[#e4ebe4] py-4">
          <summary className="cursor-pointer font-bold text-[#001e00]">Do you guarantee results or leads?</summary>
          <p className="mt-2 text-sm sm:text-base text-[#5e6d55] leading-relaxed">
            No. The Directory does not guarantee results, lead volume, or hired work. If a specialist offers their own terms, those belong in the written plan with the contractor before work starts.
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
