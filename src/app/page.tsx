import Link from 'next/link';
import BusinessRecommender from '@/components/BusinessRecommender';
import { getCategories, getFeaturedExperts, getExperts } from '@/lib/store';
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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
};

const categoryThemes: Record<string, { bg: string; border: string; text: string; hoverBorder: string }> = {
  'operations-workflow-automation': {
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    text: 'text-[#2563eb]',
    hoverBorder: 'hover:border-[#2563eb]',
  },
  'sales-lead-qualification': {
    bg: 'bg-[#e4f7e6]',
    border: 'border-[#b2e8b8]',
    text: 'text-[#108a00]',
    hoverBorder: 'hover:border-[#108a00]',
  },
  'customer-support-knowledge-base': {
    bg: 'bg-[#f0fdfa]',
    border: 'border-[#99f6e4]',
    text: 'text-[#0d9488]',
    hoverBorder: 'hover:border-[#0d9488]',
  },
  'marketing-programmatic-content': {
    bg: 'bg-[#f5f3ff]',
    border: 'border-[#ddd6fe]',
    text: 'text-[#7c3aed]',
    hoverBorder: 'hover:border-[#7c3aed]',
  },
  'executive-personal-ai-ops': {
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    text: 'text-[#d97706]',
    hoverBorder: 'hover:border-[#d97706]',
  },
};

export default async function HomePage() {
  const [categories, featuredExperts, allExperts] = await Promise.all([
    getCategories(),
    getFeaturedExperts(),
    getExperts(),
  ]);

  return (
    <div className="flex flex-col gap-20 pb-24 bg-[#f9f9fb]">
      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-20 pb-16 overflow-hidden radial-glow border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#108a00]" />
            <span>The Trust Standard in AI Automation</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#001e00] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Hire AI Specialists Who Put Real{' '}
            <span className="text-[#108a00]">
              Human Accountability
            </span>{' '}
            First.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-[#5e6d55] max-w-2xl mx-auto leading-relaxed font-medium">
            Prompt wrappers hallucinate. Black-box agencies abandon you after go-live. We vet applied AI architects through two reviewed production case studies and mandatory human fallback guardrails.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              Browse Verified Specialists
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/match"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-sm border border-[#cbd5cb] shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#2563eb]" />
              Request Founder Matchmaking
            </Link>
          </div>

          {/* Trust points: Three distinct color pillars */}
          <div className="mt-14 pt-8 border-t border-[#e4ebe4] max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#108a00]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#001e00]">2 Case Studies Required</h4>
                <p className="text-[11px] text-[#5e6d55] mt-0.5 font-medium">Every verified specialist proves real production ROI.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#001e00]">Audited Guardrails</h4>
                <p className="text-[11px] text-[#5e6d55] mt-0.5 font-medium">Mandatory human exception queues on uncertainty.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#fffbeb] border border-[#fde68a] flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-4 h-4 text-[#d97706]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#001e00]">Zero Fake 5-Star Reviews</h4>
                <p className="text-[11px] text-[#5e6d55] mt-0.5 font-medium">Vetted by code & workflow demos, not bought stars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE SMB AI RECOMMENDER & SOLUTION FINDER
      ====================================================================== */}
      <section id="ai-recommender" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-xs font-bold text-[#1d4ed8] mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Interactive SMB Solution Finder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00]">
            Select Your Business Type to See AI Recommendations & Specialists
          </h2>
          <p className="text-xs sm:text-sm text-[#5e6d55] mt-1 font-medium max-w-2xl">
            Choose your industry and operational bottleneck below. We’ll generate a high-ROI AI workflow, outline the exact human guardrails required, and connect you with verified specialists who can build it.
          </p>
        </div>

        <BusinessRecommender allExperts={allExperts} />
      </section>

      {/* =====================================================================
          CATEGORY HUBS SECTION
      ====================================================================== */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-[#1d4ed8] font-bold">
              Operational Taxonomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001e00] mt-1">
              Browse by Business Bottleneck
            </h2>
            <p className="text-xs sm:text-sm text-[#5e6d55] mt-1 max-w-xl font-medium">
              Search the exact operational problem you need resolved — from automated invoice ingestion to 24/7 emergency dispatch.
            </p>
          </div>
          <Link
            href="/experts"
            className="text-xs font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1 shrink-0"
          >
            All 5 Hubs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon_name] || Workflow;
            const theme = categoryThemes[category.slug] || {
              bg: 'bg-[#eff6ff]',
              border: 'border-[#bfdbfe]',
              text: 'text-[#2563eb]',
              hoverBorder: 'hover:border-[#2563eb]',
            };
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`rounded-2xl p-6 group flex flex-col justify-between border border-[#e4ebe4] bg-white shadow-xs hover:shadow-md ${theme.hoverBorder} transition-all`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${theme.text}`} />
                  </div>
                  <h3 className="text-base font-bold text-[#001e00] group-hover:text-[#108a00] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#5e6d55] mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#f0f3f0] flex items-center justify-between text-xs text-[#738273]">
                  <span className={`font-mono font-bold ${theme.text}`}>
                    {category.expert_count ?? 0} Listed Specialist{category.expert_count === 1 ? '' : 's'}
                  </span>
                  <span className="text-[#5e6d55] font-semibold group-hover:text-[#108a00] group-hover:translate-x-1 transition-all">
                    Explore Hub →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          FEATURED VERIFIED SPECIALISTS
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HITL Certified Vetting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001e00]">
              Featured Verified Specialists
            </h2>
            <p className="text-xs sm:text-sm text-[#5e6d55] mt-1 font-medium">
              Architects who have documented at least 2 reviewed production case studies with explicit human fallback mechanisms.
            </p>
          </div>
          <Link
            href="/experts?verified=true"
            className="text-xs font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1 shrink-0"
          >
            View All Verified <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          THE TRUST MOAT: COMPARISON MATRIX
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl p-8 sm:p-12 border border-[#e4ebe4] bg-white shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              The Accountability Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001e00] mt-1">
              Why Generic Platforms Fail for AI Systems
            </h2>
            <p className="text-xs sm:text-sm text-[#5e6d55] mt-2 font-medium">
              Unlike Upwork, Fiverr, or legacy directories, we do not rank people by self-reported claims or paid star reviews.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#e4ebe4] text-[#5e6d55] uppercase font-mono text-[11px]">
                  <th className="pb-4 font-bold">Vetting Dimension</th>
                  <th className="pb-4 font-bold text-[#889888]">Generic Freelance Sites</th>
                  <th className="pb-4 font-bold text-[#108a00]">HITL Verified Directory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f3f0] text-[#223022]">
                <tr>
                  <td className="py-4 font-bold text-[#001e00]">Exception Handling Requirement</td>
                  <td className="py-4 text-[#738273] flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    None (assumes 100% autonomous)
                  </td>
                  <td className="py-4 text-[#108a00] font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      Mandatory human fallback protocol
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-[#001e00]">Case Study Verification</td>
                  <td className="py-4 text-[#738273] flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Self-reported screenshots
                  </td>
                  <td className="py-4 text-[#108a00] font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      ≥2 reviewed production case studies
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-[#001e00]">Review System Integrity</td>
                  <td className="py-4 text-[#738273] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    Fake 5.0 star feedback loops
                  </td>
                  <td className="py-4 text-[#108a00] font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      No unvetted ratings; evidence-based
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-[#001e00]">Paid Verification Badges</td>
                  <td className="py-4 text-[#738273] flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    Pay monthly fee to get &quot;Top Rated&quot;
                  </td>
                  <td className="py-4 text-[#108a00] font-bold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      Payment NEVER confers verification
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOUNDER CONCIERGE MATCH CTA
      ====================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-[#bfdbfe] bg-gradient-to-r from-[#eff6ff] via-white to-[#edf7ee] shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-wider text-[#1d4ed8] font-bold">
              Personalized Founder Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#001e00] mt-2 leading-tight">
              Let Our Team Handpick 2 Verified Specialists for Your Workflow.
            </h2>
            <p className="text-sm text-[#475569] mt-3 leading-relaxed font-medium">
              Tell us your current operational bottleneck, tech stack, and budget. We will review your request privately and connect you with two verified experts with proven domain case studies.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/match"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Submit Matchmaking Request
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-sm border border-[#cbd5cb] transition-colors"
              >
                Read Vetting Standards
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
