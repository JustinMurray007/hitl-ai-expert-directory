import Link from 'next/link';
import { getCategories, getFeaturedExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
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
  Lock,
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
          HERO SECTION (Rich Mesh Gradient & Symmetrical Trust Stat Deck)
      ====================================================================== */}
      <section className="relative pt-20 pb-20 overflow-hidden mesh-gradient-hero border-b border-line">
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-6 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-brand" />
            <span>Matching Business Owners With The Ai Experts They Need</span>
          </div>

          {/* Symmetrical Heading */}
          <h1 className="text-4xl sm:text-6xl font-semibold text-ink tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Hire AI Experts Who Put Real{' '}
            <span className="text-brand">Human Accountability</span> First.
          </h1>

          {/* Controlled Line-Length Paragraph */}
          <p className="mt-6 text-base sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed font-normal">
            Generic AI tools make costly mistakes and freelance sites push paid ads. We verify real AI specialists who build dependable business automations with built-in human safety checks — so you stay in complete control.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Browse AI Experts
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/recommendations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-canvas-muted text-ink font-bold text-base border border-line-strong shadow-xs transition-all hover:border-brand"
            >
              <Sparkles className="w-5 h-5 text-brand" />
              Find Your Business
            </Link>
          </div>

          {/* Symmetrical 3-Column Trust Pillar Deck */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-line shadow-xs hover:border-brand-line transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-soft border border-brand-line flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-ink">References we contact</h4>
                <p className="text-xs sm:text-sm text-muted-strong mt-1 font-normal leading-relaxed">
                  We speak with references before listing. Case studies are optional.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-line shadow-xs hover:border-brand-line transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-soft border border-brand-line flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-ink">Human Safety Checks</h4>
                <p className="text-xs sm:text-sm text-muted-strong mt-1 font-normal leading-relaxed">
                  Instant staff alerts and human review if the AI is ever unsure.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-line shadow-xs hover:border-accent-line transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent-soft border border-accent-line flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-ink">Zero Bought Stars</h4>
                <p className="text-xs sm:text-sm text-muted-strong mt-1 font-normal leading-relaxed">
                  Listed for human safety checks, not self-reported ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE AI ROADMAP SPOTLIGHT (Sleek Preview Leading to /recommendations)
      ====================================================================== */}
      <section className="py-20 border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 border border-brand-line bg-gradient-to-br from-brand-soft via-white to-brand-soft shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (Content & Value Proposition) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-xs font-bold text-brand mb-4 shadow-xs">
                  <Sparkles className="w-4 h-4 text-brand" />
                  <span>Find Your Business — Tailored AI Solutions</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
                  Find Your Business &amp; Recommended AI Workflows
                </h2>
                <p className="mt-4 text-base text-muted-strong max-w-xl font-normal leading-relaxed">
                  Select your business type and biggest headache. Our interactive guide shows you the exact AI automations, built-in human safety checks, and matches you with specialists who can build it.
                </p>

                {/* Key Features List */}
                <div className="mt-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Tailored Industry Solutions (Logistics, Dental, HVAC, Retail, Wellness, Legal, Hospitality...)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Built-In Human Safety Checks (team alerts, live phone handoffs to staff, owner sign-offs)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-ink font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>Direct Links to AI Specialists Ready to Build It</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/recommendations"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Find Your Business</span>
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
                      href="/recommendations"
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-brand font-bold">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`rounded-3xl p-8 group flex flex-col justify-between border border-line bg-white shadow-xs hover:shadow-xl ${theme.hoverBorder} transition-all duration-300`}
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-soft border border-brand-line text-xs font-bold text-brand mb-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          <div className="text-center max-w-3xl mx-auto mb-14">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Legacy Freelance Sites */}
            <div className="rounded-3xl p-8 bg-white border border-rose-200/80 shadow-xs flex flex-col justify-between">
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
            <div className="rounded-3xl p-8 bg-white border border-amber-200/80 shadow-xs flex flex-col justify-between">
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
            <div className="rounded-3xl p-8 bg-gradient-to-b from-brand-soft/60 via-white to-white border-2 border-brand shadow-md flex flex-col justify-between relative">
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
          <div className="rounded-3xl p-8 sm:p-14 border border-brand-line bg-gradient-to-r from-brand-soft via-white to-brand-soft shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-mono tracking-wider text-brand font-bold">
                Personalized Founder Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2 leading-tight">
                Let Our Team Handpick 2 Specialists for Your Workflow.
              </h2>
              <p className="text-base text-muted-strong mt-3 leading-relaxed font-normal">
                Tell us what you want to automate, what software you use, and your budget. We will review your request privately and connect you with two specialists.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/match"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5" />
                  Submit Matchmaking Request
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-canvas-muted text-ink font-bold text-base border border-line-strong transition-colors"
                >
                  Read the HITL Standard
                </Link>
              </div>
            </div>

            <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-xs max-w-sm w-full space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Founder Concierge Stats
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Average Response</span>
                  <span className="font-bold text-ink">&lt; 24 Hours</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Curated Candidates</span>
                  <span className="font-bold text-brand">Exactly 2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Placement Escrow</span>
                  <span className="font-bold text-brand">100% Protected</span>
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
