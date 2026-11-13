import Link from 'next/link';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH } from '@/lib/business-routes';
import { getCategories, getFeaturedExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
import { ConciergeCheckoutNotice, ConciergePayButton, ConciergePrice } from '@/components/ConciergePayButton';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Target,
  Clock,
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
          {/* Trust Badge */}
          <div className="mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-bold text-brand shadow-rest">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
            <span>Matching Business Owners With The Ai Experts They Need</span>
          </div>

          {/* Symmetrical Heading */}
          <h1 className="mx-auto max-w-5xl text-3xl font-semibold leading-[1.12] tracking-tight text-ink min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
            Find the <span className="text-brand">Best AI Experts</span> in the World To Elevate Your Business With the Latest in AI
          </h1>

          {/* Controlled Line-Length Paragraph */}
          <p className="mt-6 text-base sm:text-xl text-ink-soft max-w-3xl mx-auto leading-relaxed font-normal">
            Our team has one of the largest databases of AI experts globally and locally for small businesses and corporations to find the best match for their needs.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experts"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 py-4 text-base font-bold text-white shadow-raised sm:w-auto"
            >
              Browse AI Experts
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-line-strong bg-white px-8 py-4 text-base font-bold text-ink shadow-rest hover:border-brand hover:bg-canvas-muted sm:w-auto"
            >
              <Sparkles className="w-5 h-5 text-brand" />
              Match by Your Business Category
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-xs font-bold text-brand mb-4 shadow-xs">
                  <Sparkles className="w-4 h-4 text-brand" />
                  <span>AI Solutions by Industry</span>
                </div>
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

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>AI Solutions by Industry</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/match"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-ink font-bold text-sm border border-slate-300 transition-colors"
                  >
                    <span>Need Custom Match?</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Common AI Integrations List with Checkmarks */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-white border border-line-strong shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-soft border border-brand-line flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono font-bold text-slate-400">Proven Automations</div>
                        <div className="text-sm font-bold text-ink">Common AI Integrations</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-soft text-brand border border-brand-line">
                      Popular
                    </span>
                  </div>

                  {/* Checkmarked List of Common Integrations */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-ink">CRM Ai Integrations</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-normal">
                          Auto-sync customer notes, update deal stages, and trigger personalized follow-ups without manual data entry.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-ink">Ai Voice Agents / Dispatch</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-normal">
                          Answer calls 24/7, book appointments into your calendar, and transfer urgent callers directly to live staff.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-ink">Ai Competitor Research</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-normal">
                          Track competitor pricing, monitor local market changes, and spot new customer opportunities automatically.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-canvas border border-slate-100 hover:border-brand-line transition-colors flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-ink">Ai Marketing &amp; Ad Management</div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-normal">
                          Generate high-converting ads, write targeted local content, and protect ad budgets from wasted spend.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-semibold text-brand">
                      <Clock className="w-3.5 h-3.5" /> 1–3 week setup
                    </span>
                    <Link
                      href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
                      className="font-bold text-brand hover:underline flex items-center gap-1"
                    >
                      See Your Industry Solution →
                    </Link>
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand">
                Business Solutions
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold text-ink mt-1 tracking-tight">
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
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${theme.badge}`}>
                        {category.expert_count ?? 0} Listed
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-ink group-hover:text-brand transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-strong mt-3 leading-relaxed font-normal">
                      {category.description}
                    </p>
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
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand">
                <ShieldCheck className="w-4 h-4" />
                <span>Human safety checks</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                Featured AI Experts
              </h2>
              <p className="text-base text-muted-strong mt-2 max-w-2xl font-normal leading-relaxed">
                Applied AI architects who name an accountable person and publish how a human steps in when the system is unsure.
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
              <ExpertCard key={expert.id} expert={expert} featured />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE TRUST MOAT: SYMMETRICAL 3-COLUMN COMPARISON
      ====================================================================== */}
      <section className="py-20 border-b border-line bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-xs uppercase font-mono tracking-wider text-brand font-bold">
              The Accountability Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-ink mt-2 tracking-tight">
              Why Generic Freelance Sites Fail for AI Systems
            </h2>
            <p className="text-base text-muted-strong mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Autonomous AI will occasionally hallucinate or hit edge cases. The difference between failure and enterprise ROI is whether human fallback safeguards are built in.
            </p>
          </div>

          {/* 3 Symmetrical Cards */}
          <div data-reveal-stagger className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {/* Card 1: Legacy Freelance Sites */}
            <div className="hover-lift flex flex-col justify-between rounded-3xl border border-rose-200/80 bg-white p-6 shadow-rest sm:p-8">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-6">
                  <XCircle className="w-6 h-6 text-rose-500" />
                </div>
                <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider">
                  Legacy Platforms
                </span>
                <h3 className="text-xl font-semibold text-ink mt-1">Generic Freelance Sites</h3>
                <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                  Upwork, Fiverr, and standard directories that rank by self-reported claims.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>No exception handling or fallback protocols required</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Self-reported screenshot reviews easily faked</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-600">
                Outcome: Expensive abandonments after deployment.
              </div>
            </div>

            {/* Card 2: Hands-off AI agencies */}
            <div className="hover-lift flex flex-col justify-between rounded-3xl border border-amber-200/80 bg-white p-6 shadow-rest sm:p-8">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  Unchecked Automation
                </span>
                <h3 className="text-xl font-semibold text-ink mt-1">Hands-off AI Agencies</h3>
                <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                  Agencies selling &quot;100% hands-off AI&quot; with zero error protection.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>AI errors and wrong answers sent directly to your paying clients</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Callers trapped in repetitive voice loops with no way to reach staff</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Zero staff alerts or approval steps when the AI gets confused</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-700">
                Outcome: Reputational damage &amp; lost customer trust.
              </div>
            </div>

            {/* Card 3: The HITL Standard */}
            <div className="hover-lift relative flex flex-col justify-between rounded-3xl border-2 border-brand bg-gradient-to-b from-brand-soft/60 via-white to-white p-6 shadow-raised sm:p-8">
              <div className="absolute -top-3 right-6 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Audited Standard
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-soft border border-brand-line flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-brand" />
                </div>
                <span className="text-xs font-mono font-bold text-brand uppercase tracking-wider">
                  The HITL Standard
                </span>
                <h3 className="text-xl font-semibold text-ink mt-1">Human-in-the-Loop</h3>
                <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                  Every specialist describes production reliability and fail-safes.
                </p>

                <div className="mt-6 space-y-3 text-sm text-ink font-semibold">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Built-in human safety checks (instant staff alerts &amp; live phone transfers)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>References we can contact before anyone is listed</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>A paid plan does not change the human safety checks</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-line text-xs font-bold text-brand">
                Outcome: Predictable, scalable automation that protects your business.
              </div>
            </div>
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
              <span className="text-xs uppercase font-mono tracking-wider text-brand font-bold">
                Concierge Match
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2 leading-tight">
                Introduce at least 3 experts for your project.
              </h2>
              <p className="text-base text-muted-strong mt-3 leading-relaxed font-normal">
                Tell us about your business process, stack, and budget. We will review your request privately and introduce at least 3 experts that match your needs, within 48 hours.
              </p>
              <ConciergePrice className="mt-5" />
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <ConciergePayButton
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-medium text-base shadow-md"
                  fallbackLabel="Request Concierge Match"
                />
                <Link
                  href="/about#how-it-works"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-canvas-muted text-ink font-medium text-base border border-line-strong transition-colors"
                >
                  How it works
                </Link>
              </div>
              <ConciergeCheckoutNotice className="mt-4 text-sm text-muted-strong" />
            </div>

            <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs max-w-sm w-full space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Founder Concierge Stats
              </div>
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
