import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Vetting Standards & The HITL Standard | Find Ai Pros',
  description: 'Learn why human accountability is the single trust moat in applied AI. Read our two-case-study verification rule and failure safeguard checklist.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00]">
          <ShieldCheck className="w-4 h-4" />
          <span>The Vetting Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-tight">
          The Find Ai Pros Standard for Accountable AI
        </h1>
        <p className="text-base sm:text-lg text-[#5e6d55] max-w-2xl mx-auto leading-relaxed font-normal">
          We built this directory because small and mid-sized businesses are terrified of handing their brand, finances, and client relationships to hallucinating, zero-touch black boxes.
        </p>
      </div>

      {/* SECTION 1: THE CORE TRUST MOAT */}
      <section id="the-standard" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Our Differentiator
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            The Single Question No Other Directory Enforces
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#334133] leading-relaxed">
          On Upwork, Clutch, and generic AI directories, agencies compete by listing the newest foundation model they wired up. They promise &quot;100% autonomous, zero-human, set-and-forget&quot; systems. In production, these systems inevitably encounter edge cases, drift, or hallucinate.
        </p>

        <div className="p-6 sm:p-7 rounded-2xl bg-[#f2faf3] border-2 border-[#b2e8b8] space-y-3">
          <span className="text-sm font-bold text-[#108a00] uppercase tracking-wider block">
            The Mandatory HITL Standard:
          </span>
          <blockquote className="text-lg sm:text-xl font-bold text-[#0f3d17] italic leading-snug">
            &quot;What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?&quot;
          </blockquote>
          <p className="text-sm sm:text-base text-[#13544e] pt-1 font-medium leading-relaxed">
            This question filters out unreliable, generic AI agencies before they ever get listed. If an applicant cannot describe a concrete human safety check (a team approval alert, an error review dashboard, or an immediate live phone handoff to staff), their application is automatically rejected.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE TWO CASE STUDIES RULE */}
      <section id="two-case-studies" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Verification Gate
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            The Two Case Studies Rule
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#334133] leading-relaxed">
          The green <strong>Verified Specialist</strong> badge is never sold. Payment never confers verification. To earn the badge, an applicant must have at least <strong>two reviewed production case studies</strong> with demonstrable business outcomes and audited human oversight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-[#001e00] text-base">
              <FileCheck className="w-5 h-5 text-[#108a00]" />
              <span>Study 1: Primary Workflow</span>
            </div>
            <p className="text-[#5e6d55] leading-relaxed font-normal">
              Submitted at initial application intake. Verifies real client industry, baseline architecture, and quantitative ROI.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-[#001e00] text-base">
              <ShieldCheck className="w-5 h-5 text-[#108a00]" />
              <span>Study 2: Independent Evidence</span>
            </div>
            <p className="text-[#5e6d55] leading-relaxed font-normal">
              Reviewed before granting verification. Confirms repeatable methodology and robust edge-case resilience across diverse clients.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: VETTING CHECKLIST */}
      <section id="guardrail-interview" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Rigorous Criteria
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            The Three-Part Vetting Checklist
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#001e00] text-base sm:text-lg">Human Safety Checks &amp; Error Prevention</h4>
              <p className="text-[#5e6d55] text-sm sm:text-base mt-1.5 leading-relaxed font-normal">
                The specialist articulates concrete human checkpoints: staff alerts, review dashboards, and error-prevention steps before any action affects a customer or database. Submissions claiming &quot;100% autonomous zero-touch&quot; are automatically rejected.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#001e00] text-base sm:text-lg">Entity & Identity Confirmation</h4>
              <p className="text-[#5e6d55] text-sm sm:text-base mt-1.5 leading-relaxed font-normal">
                Active corporate domain, verifiable business entity registration (LLC, S-Corp, etc.), real LinkedIn presence, and verifiable past project ownership.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#001e00] text-base sm:text-lg">Execution Artifact</h4>
              <p className="text-[#5e6d55] text-sm sm:text-base mt-1.5 leading-relaxed font-normal">
                A Loom walkthrough, code repository review, or live workflow architecture demonstration showing how the solution handles failure states in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LISTING TIERS & PRICING HYPOTHESIS */}
      <section className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Monetization Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            Listing Tiers & Pricing Model
          </h2>
          <p className="text-sm sm:text-base text-[#5e6d55] mt-1.5 leading-relaxed font-normal">
            Pricing is an ongoing hypothesis. Verified status is earned first; monetization scales with verified value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#001e00] text-lg">Community</h3>
              <p className="text-[#5e6d55] text-xs sm:text-sm mt-1">For budding automation specialists</p>
              <div className="text-3xl font-black text-[#001e00] mt-4">Free</div>
              <ul className="mt-5 space-y-3 text-[#334133] text-sm sm:text-base">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Public directory card</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Tool stack tags</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Booking URL integration</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4ebe4] text-xs sm:text-sm text-[#738273]">
              Basic intake review
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#edf7ee] border-2 border-[#108a00] flex flex-col justify-between relative shadow-sm">
            <span className="absolute -top-3.5 right-4 px-3.5 py-1 rounded-full text-xs font-bold bg-[#108a00] text-white tracking-wide">
              RECOMMENDED
            </span>
            <div>
              <h3 className="font-bold text-[#001e00] text-lg">Verified HITL Specialist</h3>
              <p className="text-[#13544e] text-xs sm:text-sm mt-1 font-medium">The accountability trust standard</p>
              <div className="text-3xl font-black text-[#001e00] mt-4">$29–$79<span className="text-sm text-[#5e6d55] font-normal">/mo</span></div>
              <ul className="mt-5 space-y-3 text-[#0f3d17] text-sm sm:text-base font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Verified badge on profile</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Priority category placement</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Founder matchmaking pool</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#b2e8b8] text-xs sm:text-sm text-[#108a00] font-bold">
              Requires ≥2 audited case studies
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#001e00] text-lg">Featured Spotlight</h3>
              <p className="text-[#5e6d55] text-xs sm:text-sm mt-1">Maximum visibility on category hubs</p>
              <div className="text-3xl font-black text-[#001e00] mt-4">$199<span className="text-sm text-[#5e6d55] font-normal">/mo</span></div>
              <ul className="mt-5 space-y-3 text-[#334133] text-sm sm:text-base">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Pinned top of category hub</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Featured newsletter sponsor</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" /> Dedicated case study blast</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4ebe4] text-xs sm:text-sm text-[#738273]">
              Requires active Verified status
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <div className="text-center pt-6">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all"
        >
          Submit Your Application <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
