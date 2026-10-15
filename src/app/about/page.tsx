import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00]">
          <ShieldCheck className="w-4 h-4" />
          <span>The Vetting Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-tight">
          The HITL Standard for Accountable AI
        </h1>
        <p className="text-base text-[#5e6d55] max-w-2xl mx-auto leading-relaxed font-medium">
          We built this directory because small and mid-sized businesses are terrified of handing their brand, finances, and client relationships to hallucinating, zero-touch black boxes.
        </p>
      </div>

      {/* SECTION 1: THE CORE TRUST MOAT */}
      <section id="the-standard" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Our Differentiator
          </span>
          <h2 className="text-2xl font-black text-[#001e00] mt-1">
            The Single Question No Other Directory Enforces
          </h2>
        </div>

        <p className="text-sm text-[#4b554b] leading-relaxed">
          On Upwork, Clutch, and generic AI directories, agencies compete by listing the newest foundation model they wired up. They promise &quot;100% autonomous, zero-human, set-and-forget&quot; systems. In production, these systems inevitably encounter edge cases, drift, or hallucinate.
        </p>

        <div className="p-6 rounded-2xl bg-[#f2faf3] border-2 border-[#b2e8b8] space-y-2">
          <span className="text-xs font-bold text-[#108a00] uppercase tracking-wider block">
            The Mandatory HITL Standard:
          </span>
          <blockquote className="text-base font-bold text-[#0f3d17] italic">
            &quot;What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?&quot;
          </blockquote>
          <p className="text-xs text-[#13544e] pt-1 font-medium">
            This question filters out prompt-wrapper agencies before they ever get listed. If an applicant cannot describe a concrete human fallback (a Slack approval webhook, a confidence quarantine queue, or an automated SIP warm transfer), their application is automatically rejected.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE TWO CASE STUDIES RULE */}
      <section id="two-case-studies" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Verification Gate
          </span>
          <h2 className="text-2xl font-black text-[#001e00] mt-1">
            The Two Case Studies Rule
          </h2>
        </div>

        <p className="text-sm text-[#4b554b] leading-relaxed">
          The green <strong>Verified Specialist</strong> badge is never sold. Payment never confers verification. To earn the badge, an applicant must have at least <strong>two reviewed production case studies</strong> with demonstrable business outcomes and audited human oversight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#001e00]">
              <FileCheck className="w-4 h-4 text-[#108a00]" />
              <span>Study 1: Primary Workflow</span>
            </div>
            <p className="text-[#5e6d55] leading-relaxed font-medium">
              Submitted at initial application intake. Verifies real client industry, baseline architecture, and quantitative ROI.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#001e00]">
              <ShieldCheck className="w-4 h-4 text-[#108a00]" />
              <span>Study 2: Independent Evidence</span>
            </div>
            <p className="text-[#5e6d55] leading-relaxed font-medium">
              Reviewed before granting verification. Confirms repeatable methodology and robust edge-case resilience across diverse clients.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: VETTING CHECKLIST */}
      <section id="guardrail-interview" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Rigorous Criteria
          </span>
          <h2 className="text-2xl font-black text-[#001e00] mt-1">
            The Three-Part Vetting Checklist
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-7 h-7 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#001e00]">Guardrail & Exception Verification</h4>
              <p className="text-[#5e6d55] text-xs mt-1 leading-relaxed font-medium">
                The specialist articulates a concrete human fallback: confidence scoring thresholds, review webhooks, DLQs (Dead Letter Queues), and exception quarantines. Submissions claiming &quot;100% autonomous&quot; are automatically rejected.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-7 h-7 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#001e00]">Entity & Identity Confirmation</h4>
              <p className="text-[#5e6d55] text-xs mt-1 leading-relaxed font-medium">
                Active corporate domain, verifiable business entity registration (LLC, S-Corp, etc.), real LinkedIn presence, and verifiable past project ownership.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-7 h-7 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#001e00]">Execution Artifact</h4>
              <p className="text-[#5e6d55] text-xs mt-1 leading-relaxed font-medium">
                A Loom walkthrough, code repository review, or live workflow architecture demonstration showing how the solution handles failure states in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LISTING TIERS & PRICING HYPOTHESIS */}
      <section className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Monetization Architecture
          </span>
          <h2 className="text-2xl font-black text-[#001e00] mt-1">
            Listing Tiers & Pricing Model
          </h2>
          <p className="text-xs text-[#5e6d55] mt-1">
            Pricing is an ongoing hypothesis. Verified status is earned first; monetization scales with verified value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#001e00] text-sm">Community</h3>
              <p className="text-[#5e6d55] text-[11px] mt-1">For budding automation specialists</p>
              <div className="text-2xl font-black text-[#001e00] mt-4">Free</div>
              <ul className="mt-4 space-y-2 text-[#4b554b] text-[11px]">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Public directory card</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Tool stack tags</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Booking URL integration</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4ebe4] text-[10px] text-[#738273]">
              Basic intake review
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#edf7ee] border-2 border-[#108a00] flex flex-col justify-between relative shadow-sm">
            <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold bg-[#108a00] text-white">
              RECOMMENDED
            </span>
            <div>
              <h3 className="font-bold text-[#001e00] text-sm">Verified HITL Specialist</h3>
              <p className="text-[#13544e] text-[11px] mt-1 font-medium">The accountability trust standard</p>
              <div className="text-2xl font-black text-[#001e00] mt-4">$29–$79<span className="text-xs text-[#5e6d55] font-normal">/mo</span></div>
              <ul className="mt-4 space-y-2 text-[#0f3d17] text-[11px] font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Verified badge on profile</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Priority category placement</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Founder matchmaking pool</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#b2e8b8] text-[10px] text-[#108a00] font-bold">
              Requires ≥2 audited case studies
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#001e00] text-sm">Featured Spotlight</h3>
              <p className="text-[#5e6d55] text-[11px] mt-1">Maximum visibility on category hubs</p>
              <div className="text-2xl font-black text-[#001e00] mt-4">$199<span className="text-xs text-[#5e6d55] font-normal">/mo</span></div>
              <ul className="mt-4 space-y-2 text-[#4b554b] text-[11px]">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Pinned top of category hub</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Featured newsletter sponsor</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#108a00]" /> Dedicated case study blast</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4ebe4] text-[10px] text-[#738273]">
              Requires active Verified status
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-md transition-all"
        >
          Submit Your Application <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
