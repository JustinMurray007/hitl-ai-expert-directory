import Link from 'next/link';
import { expertForPage } from '@/lib/listing';
import { withCanonical } from '@/lib/seo';

export const metadata = withCanonical('/', {
  title: 'Hire AI Consultants and Automation Pros | Find AI Pros',
  description:
    'Find AI consultants and automation experts for your business. Browse by industry, need, or city, or get 3 matched experts in 48 hours.',
});
import { AI_SOLUTIONS_BY_INDUSTRY_PATH } from '@/lib/business-routes';
import { getCategories, getFeaturedExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
import { ConciergeCheckoutNotice, ConciergePayButton, ConciergePrice } from '@/components/ConciergePayButton';
import {
  ArrowRight,
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  Cpu,
  CheckCircle2,
  Target,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
  Cpu: Cpu,
  Target: Target,
};

const categoryThemes: Record<string, { bg: string; border: string; text: string; hoverBorder: string; badge: string }> = {
  'operations-workflow-automation': {
    bg: 'bg-brand-soft',
    border: 'border-brand-line',
    text: 'text-brand',
    hoverBorder: 'hover:border-brand',
    badge: 'bg-brand-tint text-brand',
  },
  'sales-lead-qualification': {
    bg: 'bg-hub-indigo-soft',
    border: 'border-hub-indigo-line',
    text: 'text-hub-indigo',
    hoverBorder: 'hover:border-hub-indigo',
    badge: 'bg-hub-indigo-tint text-hub-indigo',
  },
  'customer-support-knowledge-base': {
    bg: 'bg-hub-teal-soft',
    border: 'border-hub-teal-line',
    text: 'text-hub-teal',
    hoverBorder: 'hover:border-hub-teal',
    badge: 'bg-hub-teal-tint text-hub-teal',
  },
  'marketing-programmatic-content': {
    bg: 'bg-hub-violet-soft',
    border: 'border-hub-violet-line',
    text: 'text-hub-violet',
    hoverBorder: 'hover:border-hub-violet',
    badge: 'bg-hub-violet-tint text-hub-violet',
  },
  'executive-personal-ai-ops': {
    bg: 'bg-accent-soft',
    border: 'border-accent-line',
    text: 'text-accent',
    hoverBorder: 'hover:border-accent',
    badge: 'bg-accent-tint text-accent',
  },
  'ai-advertising-paid-media': {
    bg: 'bg-danger-soft',
    border: 'border-danger-line',
    text: 'text-danger-bright',
    hoverBorder: 'hover:border-danger-bright',
    badge: 'bg-danger-tint text-danger',
  },
  'custom-ai-models-integration': {
    bg: 'bg-canvas',
    border: 'border-line-strong',
    text: 'text-hub-sky',
    hoverBorder: 'hover:border-hub-sky',
    badge: 'bg-line text-hub-sky',
  },
};

export default async function HomePage() {
  const [categories, featuredExperts] = await Promise.all([
    getCategories(),
    getFeaturedExperts(),
  ]);

  return (
    <div className="flex flex-col bg-canvas">
      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-20 pb-20 overflow-hidden mesh-gradient-hero border-b border-line">
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="mx-auto max-w-5xl text-3xl font-semibold leading-[1.12] tracking-tight text-ink min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
            Hire AI Consultants and Automation Experts
          </h1>

          <p className="mt-6 text-base sm:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed font-normal">
            Find AI Pros is a directory of AI consultants and automation agencies for small and mid-sized businesses. Browse by industry, business need, or city, or pay $49.99 to be introduced to at least 3 matched experts within 48 hours.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4">
            <Link
              href="/experts"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-bold text-white shadow-raised sm:w-auto"
            >
              Browse AI Experts
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={AI_SOLUTIONS_BY_INDUSTRY_PATH} className="text-base font-medium text-brand hover:text-brand-hover">
              Match by your business category
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE AI ROADMAP SPOTLIGHT (Sleek Preview Leading to /ai-solutions-by-industry)
      ====================================================================== */}
      <section className="py-20 border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="rounded-3xl border border-brand-line bg-gradient-to-br from-brand-soft via-white to-brand-soft p-6 shadow-rest sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (Content & Value Proposition) */}
              <div className="lg:col-span-7">
                <h2 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
                  AI Solutions by Industry
                </h2>
                <p className="mt-4 text-base text-muted-strong max-w-xl font-normal leading-relaxed">
                  Select your business type and the areas you want to improve. Each business has its own page with an AI solution that may fit, the tools for those areas, and specialists who can build it.
                </p>

                {/* Key Features List */}
                <div className="mt-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Tailored Industry Solutions (Logistics, Dental, HVAC, Retail, Wellness, Legal, Hospitality...)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Recommended tools for each operational bottleneck, with a page for every tool</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Direct Links to AI Specialists Ready to Build It</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-start gap-4">
                  <Link
                    href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm"
                  >
                    <span>AI Solutions by Industry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/match" className="text-sm font-medium text-brand hover:text-brand-hover">
                    Need a custom match?
                  </Link>
                </div>
              </div>

              {/* Right Column: Common AI Integrations List with Checkmarks */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-white border border-line-strong shadow-md space-y-4">
                  <h3 className="border-b border-line pb-3 text-base font-semibold text-ink">Common AI integrations</h3>

                  {/* Checkmarked List of Common Integrations */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div className="text-sm font-bold text-ink">CRM Ai Integrations</div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div className="text-sm font-bold text-ink">Ai Voice Agents / Dispatch</div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div className="text-sm font-bold text-ink">Ai Competitor Research</div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div className="text-sm font-bold text-ink">Ai Marketing &amp; Ad Management</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CATEGORY HUBS SECTION (Symmetrical 3x2 Grid)
      ====================================================================== */}
      <section id="categories" className="py-20 border-b border-line bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div data-reveal className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                Browse by Business Need
              </h2>
              <p className="text-base text-muted-strong mt-2 max-w-2xl font-normal leading-relaxed">
                Explore specialized solutions organized by business need — from 24/7 phone answering and CRM synchronization to customer support and automated marketing.
              </p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1.5 shrink-0"
            >
              View All 6 Hubs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Symmetrical 3x2 Grid */}
          <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category.icon_name] || Workflow;
              const theme = categoryThemes[category.slug] || {
                bg: 'bg-brand-soft',
                border: 'border-brand-line',
                text: 'text-brand',
                hoverBorder: 'hover:border-brand',
                badge: 'bg-brand-tint text-brand',
              };

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-rest sm:p-8 ${theme.hoverBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className={`w-7 h-7 ${theme.text}`} />
                      </div>
                      <span className="text-sm text-muted">
                        {category.expert_count ?? 0} listed
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-ink group-hover:text-brand transition-colors">
                      {category.name}
                    </h3>
                  </div>

                  <div className="mt-8 pt-5 border-t border-line-soft flex items-center justify-between text-sm text-muted">
                    <span className="text-ink-soft font-bold group-hover:text-brand transition-colors">
                      Explore Specialists
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURED SPECIALISTS
      ====================================================================== */}
      <section className="py-20 border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                AI Experts
              </h2>
              <p className="text-base text-muted-strong mt-2 max-w-2xl font-normal leading-relaxed">
                Consultants and agencies in the directory, with the tools they list.
              </p>
            </div>
            <Link
              href="/experts"
              className="text-sm font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1.5 shrink-0"
            >
              Browse All AI Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Symmetrical 3x2 Grid */}
          <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {featuredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expertForPage(expert)} compact />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOUNDER CONCIERGE MATCH CTA
      ====================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="flex flex-col justify-between gap-10 rounded-3xl border border-brand-line bg-gradient-to-r from-brand-soft via-white to-brand-soft p-6 shadow-rest sm:p-14 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight">
                Introduce at least 3 experts for your project.
              </h2>
              <p className="text-base text-muted-strong mt-3 leading-relaxed font-normal">
                Tell us about your business process and stack. We will review your request privately and introduce at least 3 experts that match your needs, within 48 hours.
              </p>
              <ConciergePrice className="mt-5" />
              <div className="mt-8 flex flex-col items-start gap-4">
                <ConciergePayButton
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-medium text-base shadow-md"
                  fallbackLabel="Request Concierge Match"
                />
                <Link href="/about#how-it-works" className="text-sm font-medium text-brand hover:text-brand-hover">
                  How it works
                </Link>
              </div>
              <ConciergeCheckoutNotice className="mt-4 text-sm text-muted-strong" />
            </div>

            <div className="rounded-2xl p-6 bg-white border border-line max-w-sm w-full space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Response time</span>
                  <span className="font-medium text-ink">Within 48 hours</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Experts introduced</span>
                  <span className="font-medium text-brand">At least 3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Price</span>
                  <span className="font-medium text-brand">$49.99 one-time</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-normal">
                No endless bidding wars. We only introduce specialists with audited code in your specific tech stack.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
