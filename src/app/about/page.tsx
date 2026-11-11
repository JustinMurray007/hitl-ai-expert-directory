import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  FileCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Vetting Standards & The HITL Standard | Find Ai Pros',
  description: 'Learn how Find Ai Pros vets specialists: a named accountable person, human safety checks, and references we can contact. Case studies are not required.',
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
      <section id="references" className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            References, not a case-study quota
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#334133] leading-relaxed">
          The green <strong>Verified Specialist</strong> badge is never sold. Payment never confers verification, and it never skips vetting. Case studies are not required to be listed or to earn the badge. A specialist may still choose to show examples of past work on their profile.
        </p>

        <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-[#001e00] text-base">
            <FileCheck className="w-5 h-5 text-[#108a00]" />
            <span>References we can contact</span>
          </div>
          <p className="text-[#5e6d55] leading-relaxed font-normal">
            Before listing, the specialist gives references we can speak with about their work. That remains the proof requirement. A sample written plan and a sample handoff guide are part of the same review.
          </p>
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
                Active corporate domain, a real business identity we can confirm, and references we can contact.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#e4f7e6] text-[#108a00] font-mono font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#001e00] text-base sm:text-lg">Sample plan and handoff</h4>
              <p className="text-[#5e6d55] text-sm sm:text-base mt-1.5 leading-relaxed font-normal">
                A sample scope in plain language, with the success measures the specialist would agree with a contractor, and a sample handoff guide. This is not a case-study requirement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LISTING TIERS & PRICING HYPOTHESIS */}
      <section className="rounded-3xl p-8 sm:p-10 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="border-b border-[#f0f3f0] pb-4">
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            Listing plans
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00] mt-1.5">
            Vetting is free. Placement is what you pay for.
          </h2>
          <p className="text-sm sm:text-base text-[#5e6d55] mt-1.5 leading-relaxed font-normal">
            Every listed specialist is vetted the same way. Paying does not buy the badge and does not skip vetting. The Directory does not guarantee results.
          </p>
        </div>

        <ul className="space-y-3 text-[#334133] text-sm sm:text-base leading-relaxed">
          <li>New profiles are free for the first 30 days in one category. No card required. Nothing is charged automatically. Website and social links show during those 30 days and on any paid plan.</li>
          <li><strong>Basic</strong> — $9.99/month or $79/year. One category, including a link to their website.</li>
          <li><strong>Featured</strong> — $29.99/month or $299.99/year. Labeled Featured, and listed above Basic listings in 4 categories.</li>
          <li><strong>Premium Featured</strong> — $59.99/month or $599.99/year. Labeled Premium Featured. Homepage listing plus the absolute top of 6 categories.</li>
          <li>Extra categories are $9.99 each.</li>
          <li>After 30 days without a plan, the listing stays visible as a limited profile (name, category, and vetted badge). The website link, social links, contact and lead routing, and match eligibility come off. It is not hidden and it is not auto-charged. Reminder emails go out at day 15 and on day 30 if they have not picked a plan.</li>
        </ul>

        <Link
          href="/apply#pricing"
          className="inline-flex items-center gap-2 text-[#108a00] font-bold hover:underline"
        >
          See plans and apply <ArrowRight className="w-4 h-4" />
        </Link>
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
