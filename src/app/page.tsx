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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Layers,
  Lock,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
};

export default async function HomePage() {
  const [categories, featuredExperts] = await Promise.all([
    getCategories(),
    getFeaturedExperts(),
  ]);

  return (
    <div className="flex flex-col gap-20 pb-24">
      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-20 pb-16 overflow-hidden tech-grid radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>The Trust Standard in AI Automation</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Hire AI Specialists Who Put Real{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Human Accountability
            </span>{' '}
            First.
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Prompt wrappers hallucinate. Black-box agencies abandon you after go-live. We vet applied AI architects through two reviewed production case studies and mandatory human fallback guardrails.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02]"
            >
              Browse Verified Experts
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/match"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Request Founder Matchmaking
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">2 Case Studies Required</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Every verified expert proves real production ROI.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Audited Guardrails</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Mandatory human exception queues on uncertainty.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Zero Fake 5-Star Reviews</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Vetted by code & workflow demos, not bought stars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CATEGORY HUBS SECTION
      ====================================================================== */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
              Operational Taxonomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Browse by Business Bottleneck
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Search the exact operational problem you need resolved — from automated invoice ingestion to 24/7 emergency dispatch.
            </p>
          </div>
          <Link
            href="/experts"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
          >
            All 5 Hubs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon_name] || Workflow;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="glass-panel rounded-2xl p-6 glass-panel-hover group flex flex-col justify-between border border-white/[0.08] bg-[#11131c]/70 hover:bg-[#141724]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-mono text-emerald-400/90 font-medium">
                    {category.expert_count ?? 0} Listed Specialist{category.expert_count === 1 ? '' : 's'}
                  </span>
                  <span className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all">
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
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HITL Certified Vetting</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Verified Specialists
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Architects who have documented at least 2 reviewed production case studies with explicit human fallback mechanisms.
            </p>
          </div>
          <Link
            href="/experts?verified=true"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
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
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/[0.08] bg-[#0d0f17]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
              The Accountability Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Generic Platforms Fail for AI Systems
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Unlike Upwork, Fiverr, or legacy directories, we do not rank people by self-reported claims or paid star reviews.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase font-mono text-[11px]">
                  <th className="pb-4 font-semibold">Vetting Dimension</th>
                  <th className="pb-4 font-semibold text-zinc-500">Generic Freelance Sites</th>
                  <th className="pb-4 font-semibold text-emerald-400">HITL Verified Directory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                <tr>
                  <td className="py-4 font-semibold text-white">Exception Handling Requirement</td>
                  <td className="py-4 text-zinc-500 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500/80 shrink-0" />
                    None (assumes 100% autonomous)
                  </td>
                  <td className="py-4 text-emerald-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Mandatory human fallback protocol
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Case Study Verification</td>
                  <td className="py-4 text-zinc-500 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500/80 shrink-0" />
                    Self-reported screenshots
                  </td>
                  <td className="py-4 text-emerald-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ≥2 reviewed production case studies
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Review System Integrity</td>
                  <td className="py-4 text-zinc-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500/80 shrink-0" />
                    Fake 5.0 star feedback loops
                  </td>
                  <td className="py-4 text-emerald-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      No unvetted ratings; evidence-based
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-white">Paid Verification Badges</td>
                  <td className="py-4 text-zinc-500 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500/80 shrink-0" />
                    Pay monthly fee to get &quot;Top Rated&quot;
                  </td>
                  <td className="py-4 text-emerald-300 font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-[#090a0f] shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
              Need Direct Guidance?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Let Our Team Handpick 2 Verified Specialists for Your Workflow.
            </h2>
            <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
              Tell us your current operational bottleneck, tech stack, and budget. We will review your request privately and connect you with two verified experts with proven domain case studies.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/match"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Submit Matchmaking Request
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 font-semibold text-sm border border-white/10 transition-colors"
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
