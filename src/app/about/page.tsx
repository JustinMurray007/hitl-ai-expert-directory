import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Vetting Standards & The HITL Standard | Human in the Loop Directory',
  description: 'Learn why human accountability is the single trust moat in applied AI. Read our two-case-study verification rule and failure safeguard checklist.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>The Vetting Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          The HITL Standard for Accountable AI
        </h1>
        <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          We built this directory because small and mid-sized businesses are terrified of handing their brand, finances, and client relationships to hallucinating, zero-touch black boxes.
        </p>
      </div>

      {/* SECTION 1: THE CORE TRUST MOAT */}
      <section id="the-standard" className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Our Differentiator
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            The Single Question No Other Directory Enforces
          </h2>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          On Upwork, Clutch, and generic AI directories, agencies compete by listing the newest foundation model they wired up. They promise &quot;100% autonomous, zero-human, set-and-forget&quot; systems. In production, these systems inevitably encounter edge cases, drift, or hallucinate.
        </p>

        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-transparent border border-emerald-500/40 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
            The Mandatory HITL Standard:
          </span>
          <blockquote className="text-base font-semibold text-white italic">
            &quot;What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?&quot;
          </blockquote>
          <p className="text-xs text-zinc-400 pt-1">
            This question filters out prompt-wrapper agencies before they ever get listed. If an applicant cannot describe a concrete human fallback (a Slack approval webhook, a confidence quarantine queue, or an automated SIP warm transfer), their application is automatically rejected.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE TWO CASE STUDIES RULE */}
      <section id="two-case-studies" className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
            Verification Gate
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            The Two Case Studies Rule
          </h2>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          The green <strong>Verified Specialist</strong> badge is never sold. Payment never confers verification. To earn the badge, an applicant must have at least <strong>two reviewed production case studies</strong> with demonstrable business outcomes and audited human oversight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              <span>Study 1: Primary Workflow</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Submitted at initial application intake. Verifies real client industry, baseline architecture, and quantitative ROI.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Study 2: Independent Evidence</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Reviewed before granting verification. Confirms repeatable methodology and robust edge-case resilience across diverse clients.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: VETTING CHECKLIST */}
      <section id="guardrail-interview" className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-purple-400 font-semibold">
            Rigorous Criteria
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            The Three-Part Vetting Checklist
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <h4 className="font-bold text-white">Guardrail & Exception Verification</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                The specialist articulates a concrete human fallback: confidence scoring thresholds, review webhooks, DLQs (Dead Letter Queues), and exception quarantines. Submissions claiming &quot;100% autonomous&quot; are automatically rejected.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <h4 className="font-bold text-white">Entity & Identity Confirmation</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                Active corporate domain, verifiable business entity registration (LLC, S-Corp, etc.), real LinkedIn presence, and verifiable past project ownership.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-purple-500/15 text-purple-400 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-white">Execution Artifact</h4>
              <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                A Loom walkthrough, code repository review, or live workflow architecture demonstration showing how the solution handles failure states in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LISTING TIERS & PRICING HYPOTHESIS */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 space-y-6">
        <div className="border-b border-white/[0.06] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
            Monetization Architecture
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Listing Tiers & Pricing Model
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Pricing is an ongoing hypothesis. Verified status is earned first; monetization scales with verified value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Community</h3>
              <p className="text-zinc-400 text-[11px] mt-1">For budding automation specialists</p>
              <div className="text-2xl font-extrabold text-white mt-4">Free</div>
              <ul className="mt-4 space-y-2 text-zinc-400 text-[11px]">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Public directory card</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Tool stack tags</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Booking URL integration</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-zinc-500">
              Basic intake review
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col justify-between relative shadow-lg">
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-zinc-950">
              RECOMMENDED
            </span>
            <div>
              <h3 className="font-bold text-white text-sm">Verified HITL Specialist</h3>
              <p className="text-emerald-300 text-[11px] mt-1">The accountability trust standard</p>
              <div className="text-2xl font-extrabold text-white mt-4">$29–$79<span className="text-xs text-zinc-400 font-normal">/mo</span></div>
              <ul className="mt-4 space-y-2 text-zinc-300 text-[11px]">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified badge on profile</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Priority category placement</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Founder matchmaking pool</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-[10px] text-emerald-400">
              Requires ≥2 audited case studies
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Featured Spotlight</h3>
              <p className="text-zinc-400 text-[11px] mt-1">Maximum visibility on category hubs</p>
              <div className="text-2xl font-extrabold text-white mt-4">$199<span className="text-xs text-zinc-400 font-normal">/mo</span></div>
              <ul className="mt-4 space-y-2 text-zinc-400 text-[11px]">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Pinned top of category hub</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Featured newsletter sponsor</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Dedicated case study blast</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-zinc-500">
              Requires active Verified status
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all"
        >
          Submit Your Application <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
