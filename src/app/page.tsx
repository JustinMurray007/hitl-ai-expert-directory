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
  Truck,
  Stethoscope,
  Compass,
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
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    text: 'text-[#2563eb]',
    hoverBorder: 'hover:border-[#2563eb]',
    badge: 'bg-[#dbeafe] text-[#1d4ed8]',
  },
  'sales-lead-qualification': {
    bg: 'bg-[#e4f7e6]',
    border: 'border-[#b2e8b8]',
    text: 'text-[#108a00]',
    hoverBorder: 'hover:border-[#108a00]',
    badge: 'bg-[#cbf2cf] text-[#0f7a00]',
  },
  'customer-support-knowledge-base': {
    bg: 'bg-[#f0fdfa]',
    border: 'border-[#99f6e4]',
    text: 'text-[#0d9488]',
    hoverBorder: 'hover:border-[#0d9488]',
    badge: 'bg-[#ccfbf1] text-[#0f766e]',
  },
  'marketing-programmatic-content': {
    bg: 'bg-[#f5f3ff]',
    border: 'border-[#ddd6fe]',
    text: 'text-[#7c3aed]',
    hoverBorder: 'hover:border-[#7c3aed]',
    badge: 'bg-[#ede9fe] text-[#6d28d9]',
  },
  'executive-personal-ai-ops': {
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    text: 'text-[#d97706]',
    hoverBorder: 'hover:border-[#d97706]',
    badge: 'bg-[#fef3c7] text-[#b45309]',
  },
  'ai-advertising-paid-media': {
    bg: 'bg-[#fff1f2]',
    border: 'border-[#fecdd3]',
    text: 'text-[#e11d48]',
    hoverBorder: 'hover:border-[#e11d48]',
    badge: 'bg-[#ffe4e6] text-[#be123c]',
  },
  'custom-ai-models-integration': {
    bg: 'bg-[#f8fafc]',
    border: 'border-[#cbd5e1]',
    text: 'text-[#0284c7]',
    hoverBorder: 'hover:border-[#0284c7]',
    badge: 'bg-[#e2e8f0] text-[#0369a1]',
  },
};

export default async function HomePage() {
  const [categories, featuredExperts] = await Promise.all([
    getCategories(),
    getFeaturedExperts(),
  ]);

  return (
    <div className="flex flex-col bg-[#f9f9fb]">
      {/* =====================================================================
          HERO SECTION (Rich Mesh Gradient & Symmetrical Trust Stat Deck)
      ====================================================================== */}
      <section className="relative pt-20 pb-20 overflow-hidden mesh-gradient-hero border-b border-[#e4ebe4]">
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-6 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#108a00]" />
            <span>The Verified Standard in Applied AI Automation</span>
          </div>

          {/* Symmetrical Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#001e00] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Hire AI Specialists Who Put Real{' '}
            <span className="text-[#108a00]">Human Accountability</span> First.
          </h1>

          {/* Controlled Line-Length Paragraph */}
          <p className="mt-6 text-base sm:text-xl text-[#334133] max-w-2xl mx-auto leading-relaxed font-normal">
            Autonomous prompt wrappers hallucinate and generic platforms rank paid reviews. We audit applied AI architects through reviewed production case studies and mandatory human fallback guardrails.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Browse Verified Specialists
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/recommendations"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-base border border-[#cbd5cb] shadow-xs transition-all hover:border-[#108a00]"
            >
              <Sparkles className="w-5 h-5 text-[#2563eb]" />
              Find Your Business
            </Link>
          </div>

          {/* Symmetrical 3-Column Trust Pillar Deck */}
          <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-[#e4ebe4] shadow-xs hover:border-[#b2e8b8] transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#108a00]" />
              </div>
              <div>
                <h4 className="text-base font-black text-[#001e00]">2+ Case Studies</h4>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 font-normal leading-relaxed">
                  Real client production deployments with verified ROI data.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-[#e4ebe4] shadow-xs hover:border-[#bfdbfe] transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <h4 className="text-base font-black text-[#001e00]">Audited Fallbacks</h4>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 font-normal leading-relaxed">
                  Mandatory human exception queues on model uncertainty.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm border border-[#e4ebe4] shadow-xs hover:border-[#fde68a] transition-colors flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#fffbeb] border border-[#fde68a] flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-5 h-5 text-[#d97706]" />
              </div>
              <div>
                <h4 className="text-base font-black text-[#001e00]">Zero Bought Stars</h4>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 font-normal leading-relaxed">
                  Vetted through technical audits, not self-reported ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE AI ROADMAP SPOTLIGHT (Sleek Preview Leading to /recommendations)
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 border border-[#b2e8b8] bg-gradient-to-br from-[#f0f9f1] via-white to-[#eff6ff] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (Content & Value Proposition) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-bold text-[#1d4ed8] mb-4 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#2563eb]" />
                  <span>Find Your Business — 12 Industry Solutions</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#001e00] tracking-tight leading-tight">
                  Find Your Business &amp; Recommended AI Workflows
                </h2>
                <p className="mt-4 text-base text-[#475569] max-w-xl font-normal leading-relaxed">
                  Select your business type and current operational bottleneck. Our interactive generator maps out the exact automation pipeline, required human fallback guardrails, and matches you with verified specialists who can build it.
                </p>

                {/* Key Features List */}
                <div className="mt-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-sm text-[#1e2a1e] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                    <span>12 Tailored Industries (Logistics, Dental, HVAC, E-Commerce, Auto, Legal, Hospitality...)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1e2a1e] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                    <span>Exact Human Guardrails (Slack quarantines, warm SIP transfers, citation sign-offs)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#1e2a1e] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                    <span>Direct Links to Verified Production Architects</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href="/recommendations"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Find Your Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/match"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#001e00] font-bold text-sm border border-slate-300 transition-colors"
                  >
                    <span>Need Custom Match?</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Interactive Blueprint Teaser Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-6 bg-white border border-[#cbd5cb] shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center">
                        <Truck className="w-4 h-4 text-[#108a00]" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono font-bold text-slate-400">Sample Blueprint</div>
                        <div className="text-sm font-bold text-[#001e00]">Freight & Logistics Pipeline</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      High ROI
                    </span>
                  </div>

                  {/* Architecture Diagram Snippet */}
                  <div className="rounded-xl p-3 bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-700 space-y-1">
                    <div className="text-slate-400"># Autonomous Extraction + Fallback Flow</div>
                    <div>1. Carrier PDF Ingestion ──▶ Claude 3.5 Sonnet OCR</div>
                    <div>2. Validation Check: Line-item deviation &lt; $0.05?</div>
                    <div className="text-[#108a00] font-bold">
                      ├─▶ YES: Direct Webhook Post to NetSuite
                    </div>
                    <div className="text-amber-700 font-bold">
                      └─▶ NO: Suspend &amp; Route to Slack Triage Desk
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-[#108a00]">
                      <Clock className="w-3.5 h-3.5" /> 2-3 week setup
                    </span>
                    <Link
                      href="/recommendations?industry=freight_logistics"
                      className="font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                    >
                      View Live Blueprint →
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
      <section id="categories" className="py-20 border-b border-[#e4ebe4] bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#1d4ed8] font-bold">
                Operational Taxonomy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#001e00] mt-1 tracking-tight">
                Browse by Business Bottleneck
              </h2>
              <p className="text-base text-[#475569] mt-2 max-w-2xl font-normal leading-relaxed">
                Explore specialized hubs organized by operational hurdle — from 24/7 telephony agents to high-compliance knowledge bases and ERP synchronization.
              </p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1.5 shrink-0"
            >
              View All 6 Hubs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Symmetrical 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = categoryIcons[category.icon_name] || Workflow;
              const theme = categoryThemes[category.slug] || {
                bg: 'bg-[#eff6ff]',
                border: 'border-[#bfdbfe]',
                text: 'text-[#2563eb]',
                hoverBorder: 'hover:border-[#2563eb]',
                badge: 'bg-[#dbeafe] text-[#1d4ed8]',
              };

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className={`rounded-3xl p-8 group flex flex-col justify-between border border-[#e4ebe4] bg-white shadow-xs hover:shadow-xl ${theme.hoverBorder} transition-all duration-300`}
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

                    <h3 className="text-xl font-black text-[#001e00] group-hover:text-[#108a00] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed font-normal">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#f0f3f0] flex items-center justify-between text-sm text-[#738273]">
                    <span className="text-[#334133] font-bold group-hover:text-[#108a00] transition-colors">
                      Explore Specialists
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#108a00] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FEATURED VERIFIED SPECIALISTS (Symmetrical 2x2 Grid)
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>HITL Certified Vetting</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#001e00] tracking-tight">
                Featured Verified Specialists
              </h2>
              <p className="text-base text-[#475569] mt-2 max-w-2xl font-normal leading-relaxed">
                Applied AI architects who have proven their systems with reviewed production case studies and documented human oversight protocols.
              </p>
            </div>
            <Link
              href="/experts"
              className="text-sm font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1.5 shrink-0"
            >
              Browse All Specialists <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Symmetrical 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE TRUST MOAT: SYMMETRICAL 3-COLUMN VETTING MATRIX
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              The Accountability Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Why Generic Freelance Sites Fail for AI Systems
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
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
                <h3 className="text-xl font-black text-[#001e00] mt-1">Generic Freelance Sites</h3>
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
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Anyone can buy monthly &quot;Top Rated&quot; badges</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-600">
                Outcome: Expensive abandonments after deployment.
              </div>
            </div>

            {/* Card 2: Black-Box Autonomous Danger */}
            <div className="rounded-3xl p-8 bg-white border border-amber-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  Unchecked Autonomy
                </span>
                <h3 className="text-xl font-black text-[#001e00] mt-1">Prompt-Wrapper Agencies</h3>
                <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                  Agencies selling 100% autonomous magic without failure safeguards.
                </p>

                <div className="mt-6 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Hallucinations silently corrupting production ERP data</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Callers trapped in unresponsive voice agent loops</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Zero dead-letter queues or audit logging</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-700">
                Outcome: Reputational damage &amp; lost client trust.
              </div>
            </div>

            {/* Card 3: The HITL Standard */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#e4f7e6]/60 via-white to-white border-2 border-[#108a00] shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 right-6 bg-[#108a00] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Audited Standard
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#108a00]" />
                </div>
                <span className="text-xs font-mono font-bold text-[#108a00] uppercase tracking-wider">
                  The HITL Standard
                </span>
                <h3 className="text-xl font-black text-[#001e00] mt-1">Human-in-the-Loop Verified</h3>
                <p className="text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                  Every specialist audited for production reliability and fail-safes.
                </p>

                <div className="mt-6 space-y-3 text-sm text-[#001e00] font-semibold">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0 mt-0.5" />
                    <span>Mandatory human fallback protocol (Slack, SIP, queues)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0 mt-0.5" />
                    <span>≥2 reviewed production case studies with client ROI</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0 mt-0.5" />
                    <span>Payment NEVER confers verification status</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#b2e8b8] text-xs font-bold text-[#108a00]">
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
          <div className="rounded-3xl p-8 sm:p-14 border border-[#bfdbfe] bg-gradient-to-r from-[#eff6ff] via-white to-[#edf7ee] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-mono tracking-wider text-[#1d4ed8] font-bold">
                Personalized Founder Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#001e00] mt-2 leading-tight">
                Let Our Team Handpick 2 Verified Specialists for Your Workflow.
              </h2>
              <p className="text-base text-[#475569] mt-3 leading-relaxed font-normal">
                Tell us your current operational bottleneck, tech stack, and budget. We will review your request privately and connect you with two verified experts with proven domain case studies.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/match"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5" />
                  Submit Matchmaking Request
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-base border border-[#cbd5cb] transition-colors"
                >
                  Read Vetting Standards
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
                  <span className="font-bold text-[#001e00]">&lt; 24 Hours</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Curated Candidates</span>
                  <span className="font-bold text-[#108a00]">Exactly 2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Placement Escrow</span>
                  <span className="font-bold text-[#2563eb]">100% Protected</span>
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
