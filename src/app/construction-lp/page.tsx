import { Metadata } from 'next';
import Link from 'next/link';
import {
  Hammer,
  HardHat,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageSquare,
  Building,
  Layers,
  Wrench,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Automation for Construction & Remodeling Contractors | Find Ai Pros',
  description:
    'Stop losing high-ticket remodeling jobs while you are on the jobsite. 24/7 AI voice dispatch, speed-to-lead text-back, and automated estimate follow-up built specifically for construction and remodeling businesses.',
};

export default function ConstructionLandingPage() {
  return (
    <div className="flex flex-col bg-[#f9fbf9]">
      {/* Tally Widget Script */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />

      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-[#f0f7f1] via-white to-[#f9fbf9] border-b border-[#e4ebe4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Industry Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-6 shadow-xs">
            <HardHat className="w-4 h-4 text-[#108a00]" />
            <span>Built for General Contractors, Kitchen &amp; Bath Remodelers &amp; Builders</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#001e00] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Stop Losing <span className="text-[#108a00]">$50,000+ Remodel Jobs</span> While You&apos;re On The Jobsite.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-[#334133] max-w-2xl mx-auto leading-relaxed font-normal">
            When you&apos;re running crews, talking with subs, or on a roof, you can&apos;t answer every phone call. Our verified AI specialists build 24/7 voice dispatch, instant text-backs, and automated estimate follow-up — with 100% human control.
          </p>

          {/* Jump to Form CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#intake-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Get Your Custom Construction AI Blueprint
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-base border border-[#cbd5cb] shadow-xs transition-all hover:border-[#108a00]"
            >
              Browse Construction AI Specialists
            </Link>
          </div>

          {/* 3 Key Contractor Proof Badges */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#108a00]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">30-Second Speed-to-Lead</div>
                <div className="text-xs text-[#5e6d55]">Instant call answering &amp; missed-call text-back</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">Jobber &amp; CRM Sync</div>
                <div className="text-xs text-[#5e6d55]">Direct sync to your existing contractor tools</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#b45309]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">Human Price Approval</div>
                <div className="text-xs text-[#5e6d55]">AI qualifies scope; only you sign off on quotes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CONTRACTOR REALITY: THE 3 BIGGEST REVENUE LEAKS
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              The Cost of Business as Usual
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Where Construction Companies Lose Leads Every Week
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Homeowners shopping for kitchens, bathrooms, additions, or roofing call 3 to 4 contractors. The first contractor who answers and books an estimate walk-through wins the job 74% of the time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl p-8 bg-[#fafafa] border border-rose-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-6 text-rose-600 font-black text-xl">
                  1
                </div>
                <h3 className="text-xl font-black text-[#001e00]">The Jobsite Missed Call</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  You&apos;re measuring a wall, meeting a building inspector, or driving equipment. A homeowner calls ready to spend $65,000 on a kitchen remodel. It goes to voicemail. By 5 PM, they&apos;ve booked with someone else.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                <span>Revenue Lost: $20,000 – $100,000/mo</span>
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-[#fafafa] border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 text-amber-600 font-black text-xl">
                  2
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Slow Quote &amp; Estimate Follow-Up</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  You spend 3 hours driving to a site and writing an estimate. You email the proposal. Days pass. You forget to follow up because you&apos;re putting out fires. The prospect assumes you&apos;re too busy or uninterested.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-100 text-xs font-bold text-amber-600 flex items-center gap-1.5">
                <span>Close Rate Drops by 40% after Day 3</span>
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-[#fafafa] border border-blue-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-blue-600 font-black text-xl">
                  3
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Unqualified Tire-Kickers</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  Your team wastes hours driving across town to estimate a project for someone who has a $5,000 budget for a $45,000 job. Without automated budget pre-qualification, expensive drive time is wasted.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-100 text-xs font-bold text-blue-600 flex items-center gap-1.5">
                <span>Wastes 10–15 Hours of Estimator Drive Time/Wk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 4-PILLAR CONTRACTOR AI SYSTEM
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              Automated Business Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              What Our Construction AI Specialists Build For You
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Not generic AI chatbots. Battle-tested, custom-connected workflows wired directly into your existing contractor software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 text-[#108a00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">24/7 AI Receptionist &amp; Voice Dispatch</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Answers incoming calls 24/7 with natural conversation. Understands trade terminology (drywall, demo, rough-in, permits), pre-qualifies scope and timeline, and schedules on-site estimates into your calendar.
                </p>
                <div className="mt-3 text-xs font-bold text-[#108a00] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Urgent calls transfer directly to the owner&apos;s mobile phone
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">60-Second Missed Call Text-Back</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  If a call slips through while your crews are loud, the system sends an immediate friendly SMS within 30 seconds asking about the project, collecting address &amp; photos, and routing details into your CRM.
                </p>
                <div className="mt-3 text-xs font-bold text-[#2563eb] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Converts 65%+ of missed calls into scheduled appointments
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-[#db2777]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">Automated 5-Touch Estimate Follow-Up</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Once an estimate or bid is delivered, the system automatically checks in on Day 2, Day 5, Day 9, and Day 14 via SMS and email. Pauses immediately the moment the homeowner replies or signs.
                </p>
                <div className="mt-3 text-xs font-bold text-[#db2777] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Increases closed proposal rates by 28% without manual nagging
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6 text-[#b45309]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">Jobber, JobNimbus &amp; GHL Integration</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Wired straight into your operating stack: Jobber, BuilderTrend, JobNimbus, ServiceTitan, or GoHighLevel. Eliminates copy-pasting customer notes, addresses, and scopes between different apps.
                </p>
                <div className="mt-3 text-xs font-bold text-[#b45309] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You retain 100% ownership of your own accounts and client data
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          REAL PROVEN EVIDENCE: SPOTLIGHT ON CONSTRUCTION AI SPECIALISTS
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              Proven Contractor Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Real Builds Implemented for Construction Companies
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              We vet every specialist on our directory for demonstrable work with home service and remodeling contractors. Here are actual systems live in production:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1: Yotomations */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Remodeling &amp; Roofing</span>
                  <span className="text-xs text-slate-500 font-semibold">Tampa, FL</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Yotomations LLC</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Koby (Yaakov) Oranski</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>Kitchen &amp; Bath Remodeler Build:</strong> Yelp &amp; website lead integration with instant missed-call text-back, AI voice receptionist, and Jobber/JobNimbus dispatch.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;Homeowner AI conversations keep a live human one tap away with full staff notification.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/koby-oranski"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Verified Profile &amp; Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Case Study 2: Barrana.ai */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Contractors (Renovation)</span>
                  <span className="text-xs text-slate-500 font-semibold">Toronto, ON</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Barrana.ai</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Ikram Rana</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>Renovation Contractor System:</strong> Lead response, quote follow-up, after-hours voice capture, and Jobber + GHL + Make integration with strict control layers.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;Strict governance: owner approval required on large scope jobs, with full call logging.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/ikram-rana"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Verified Profile &amp; Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Case Study 3: Voxe AI */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Home Services &amp; Remodel</span>
                  <span className="text-xs text-slate-500 font-semibold">Orlando, FL</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Voxe AI</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Matt Aponte</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>Clean Cut Painting &amp; Handyman:</strong> 2+ year production partnership handling inbound call voice triage, lead reactivation, and estimate nurture.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;Framed as a Human + AI system supporting the trade crew, never replacing live staff.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/matt-aponte"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Verified Profile &amp; Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE INTAKE FORM: EMBEDDED TALLY FORM CONTAINER
      ====================================================================== */}
      <section id="intake-form" className="py-20 bg-gradient-to-b from-[#f8faf8] via-white to-[#f0f7f1] border-b border-[#e4ebe4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Get Your Construction AI Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight">
              Tell Us About Your Business
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed font-normal">
              Complete the quick questionnaire below. We will review your trade focus, current CRM, and bottlenecks, and match you with a vetted construction automation specialist.
            </p>
          </div>

          {/* Form Card Container */}
          <div className="rounded-3xl p-4 sm:p-8 bg-white border-2 border-[#b2e8b8] shadow-lg relative">
            <div className="mb-4 flex items-center justify-between text-xs text-[#5e6d55] px-2 font-medium">
              <span className="flex items-center gap-1.5 text-[#108a00] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#108a00]" />
                100% Private Contractor Intake
              </span>
              <span>No spam. No agency pitch calls.</span>
            </div>

            {/* Embedded Tally Iframe */}
            <div className="w-full min-h-[620px] rounded-2xl overflow-hidden bg-white">
              <iframe
                data-tally-src="https://tally.so/embed/2j857M?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                src="https://tally.so/embed/2j857M?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="620"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Construction &amp; Remodeling Business Owner AI Intake"
                className="w-full border-0"
              />
            </div>

            {/* Fallback Direct Link */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Form not loading properly?{' '}
              <a
                href="https://tally.so/r/2j857M"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#108a00] font-bold hover:underline inline-flex items-center gap-1"
              >
                Open form in new window <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CONTRACTOR FAQS
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              Contractor Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                Will the AI give homeowners prices or estimates without my permission?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                <strong>Never.</strong> Our standard requires strict guardrails. The AI only collects homeowner square footage, material preferences, timeline, and address. Only you or your licensed estimator certify and approve numbers before proposals are delivered.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                Does this integrate with Jobber, JobNimbus, or BuilderTrend?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                Yes. All verified specialists on our directory specialize in connecting voice agents and SMS workflows directly into standard contractor CRMs via webhooks and Make/Zapier, eliminating manual data entry.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                What happens when a caller has an emergency or complex question?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                The system has a built-in live transfer protocol. If a caller says &quot;water is pouring through the ceiling&quot; or requests to speak to the owner directly, the AI immediately transfers the call to your mobile phone with a transcribed summary.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                How quickly can an AI system be running for my remodeling business?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                Most specialists complete setup within 1 to 3 weeks, including call testing, prompt calibration with your specific services and service area, and CRM connection.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#intake-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Start Your Construction AI Intake
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
