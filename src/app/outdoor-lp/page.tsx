import { Metadata } from 'next';
import Link from 'next/link';
import {
  Trees,
  Waves,
  Sun,
  CloudRain,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Calendar,
  MessageSquare,
  Layers,
  Wrench,
  ExternalLink,
  Compass,
} from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'AI Automation for Landscaping, Pool & Outdoor Living Contractors | Find Ai Pros',
  description:
    'Capture every high-ticket outdoor living, pool, and landscaping lead automatically. 24/7 AI voice answering, automated weather delay notifications, and Jobber/Skimmer/LMN CRM syncing built for outdoor contractors.',
};

export default function OutdoorLandingPage() {
  return (
    <div className="flex flex-col bg-[#f8fbf9]">
      {/* Tally Widget Script */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
      />

      {/* =====================================================================
          HERO SECTION
      ====================================================================== */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-[#eaf6ee] via-white to-[#f8fbf9] border-b border-[#e4ebe4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Industry Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-6 shadow-xs">
            <Trees className="w-4 h-4 text-[#108a00]" />
            <span>Built for Landscaping, Hardscaping, Pool Builders &amp; Outdoor Living Pros</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#001e00] tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Capture Every <span className="text-[#108a00]">$30K–$150K Outdoor Living &amp; Pool Lead</span> While You&apos;re On-Site.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-[#334133] max-w-2xl mx-auto leading-relaxed font-normal">
            Spring rushes and busy field days mean dozens of missed inquiries. Our verified AI specialists build 24/7 call answering, instant project pre-qualification, and automated weather-delay notices tailored specifically for outdoor contractors.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#intake-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Get Your Outdoor Contractor AI Blueprint
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/experts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-base border border-[#cbd5cb] shadow-xs transition-all hover:border-[#108a00]"
            >
              Browse Outdoor Living Specialists
            </Link>
          </div>

          {/* 3 Key Outdoor Proof Badges */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#108a00]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">Instant Lead Capture</div>
                <div className="text-xs text-[#5e6d55]">Answers calls in 3 rings &amp; texts back in 60s</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                <Waves className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">Jobber, Skimmer &amp; LMN Sync</div>
                <div className="text-xs text-[#5e6d55]">Direct integration to your dispatch &amp; route stack</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#e4ebe4] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0">
                <CloudRain className="w-5 h-5 text-[#b45309]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#001e00]">Weather Delay Reschedules</div>
                <div className="text-xs text-[#5e6d55]">Automated rain notifications &amp; route updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          OUTDOOR TRADE REALITY: THE 3 BIGGEST HEADACHES
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              The Reality of Outdoor Contracting
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Why Outdoor Contractors Lose Their Most Profitable Jobs
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Homeowners investing $50,000 to $150,000 in custom pools, outdoor kitchens, and pavers call when the weather is warm. If they get a voicemail, they immediately dial the next contractor on Google.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl p-8 bg-[#fafafa] border border-rose-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-6 text-rose-600 font-black text-xl">
                  1
                </div>
                <h3 className="text-xl font-black text-[#001e00]">The Mower &amp; Skid-Steer Blindspot</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  You or your foremen are operating excavators, trenchers, or zero-turns. You can&apos;t hear your phone ring. A homeowner looking for an in-ground pool and travertine patio calls and moves on after no answer.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-100 text-xs font-bold text-rose-600">
                Average Lost Revenue: $45,000 per missed lead
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-[#fafafa] border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 text-amber-600 font-black text-xl">
                  2
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Tire-Kickers vs. High-Ticket Buyers</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  Your team drives 45 minutes to measure a property only to discover the customer has a $1,500 budget for a $25,000 retaining wall. Without automated budget qualification, hours of drive time are squandered.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-100 text-xs font-bold text-amber-600">
                Cuts 10+ Hours of Useless Estimator Drive Time
              </div>
            </div>

            <div className="rounded-3xl p-8 bg-[#fafafa] border border-blue-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6 text-blue-600 font-black text-xl">
                  3
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Rain Delays &amp; Route Confusion</h3>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  A thunderstorm hits at 10 AM. Your phone explodes with 30 customers asking &quot;when are you coming?&quot; Your office manager spends 4 hours manually texting homeowners instead of billing and quoting new work.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-blue-100 text-xs font-bold text-blue-600">
                Eliminates 100+ Panicked Reschedule Texts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 4-PILLAR OUTDOOR AI SYSTEM
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              Purpose-Built for Outdoor Trades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              What Our Outdoor Contractor AI Specialists Build
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Automations calibrated for the long sales cycle of pool builds and the high-volume speed required for landscape maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 text-[#108a00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">24/7 AI Voice Answering &amp; Lead Qualification</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Answers every call in natural voice. Inquires about lot access, yard slope, pool equipment, square footage, and budget range before booking estimate walk-throughs directly into your calendar.
                </p>
                <div className="mt-3 text-xs font-bold text-[#108a00] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> High-budget design-build leads immediately trigger an owner SMS
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                <CloudRain className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">Weather Delay &amp; Route Broadcasts</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  One click when weather turns bad alerts affected route customers via SMS with their updated service window, keeping homeowners informed and preventing phone flood.
                </p>
                <div className="mt-3 text-xs font-bold text-[#2563eb] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Answers &quot;when is my tech coming?&quot; calls directly from service logs
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6 text-[#b45309]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">8-Stage Design-Build Pipeline Tracking</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Keeps prospects warm across the 3–6 month pool and outdoor living sales cycle: from initial call to 3D design rendering, HOA approval, contract signing, and post-build 5-star review collection.
                </p>
                <div className="mt-3 text-xs font-bold text-[#b45309] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Closes high-ticket outdoor projects without prospects stalling
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2f8] border border-[#fbcfe8] flex items-center justify-center shrink-0">
                <Sun className="w-6 h-6 text-[#db2777]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#001e00]">Seasonal Upsell &amp; Renewal Engine</h3>
                <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                  Automatically reactivates past clients ahead of the season: spring cleanup, mulch, aeration, pool opening/closing, winterization, and landscape lighting enhancements.
                </p>
                <div className="mt-3 text-xs font-bold text-[#db2777] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Converts one-time jobs into predictable recurring revenue
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          REAL PROVEN EVIDENCE: OUTDOOR & POOL SPECIALISTS
      ====================================================================== */}
      <section className="py-20 border-b border-[#e4ebe4] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
              Specialists Who Understand Your Trade
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Real Builds for Pool, Patio &amp; Landscaping Contractors
            </h2>
            <p className="text-base text-[#475569] mt-3 font-normal leading-relaxed max-w-2xl mx-auto">
              Our listed experts include former pool company operators and dedicated outdoor living automation architects:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Case Study 1: Alan Debs */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Pools &amp; Outdoor Living</span>
                  <span className="text-xs text-slate-500 font-semibold">Phoenix, AZ</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Alan Debs Consulting</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Alan Debs (Former Pool Renovation Operator)</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>15-Year Pool Industry Background:</strong> Dedicated AI lead engine, instant proposals, client update automation, and review requests for pool and patio contractors.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;You ran a pool company for 15 years before building AI systems — that real operator background is what owners trust.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/alan-debs"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Case Study 2: Read Laboratories */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Landscaping Systems</span>
                  <span className="text-xs text-slate-500 font-semibold">Westlake Village, CA</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Read Laboratories</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Jake Read</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>Landscaping Workflow Roadmap:</strong> Automated lead follow-up, dispatch, weather-delay notifications, review requests, and Jobber/Make automations.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;Weather-delay reschedule notifications solve one of the biggest daily headaches landscape owners face.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/jake-read"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Case Study 3: Annexal */}
            <div className="rounded-3xl p-7 bg-[#fafafa] border border-[#e4ebe4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono uppercase text-[#108a00]">Pool Builders &amp; Spas</span>
                  <span className="text-xs text-slate-500 font-semibold">Chicago, IL</span>
                </div>
                <h3 className="text-xl font-black text-[#001e00]">Annexal</h3>
                <p className="text-xs text-[#108a00] font-bold mt-0.5">Nikhil Gautam</p>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  <strong>Lake Geneva Pool &amp; Spa Build:</strong> 5 separate service pipelines plus a pool cost estimator that qualifies homeowner budgets before consultations.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#e4f7e6] text-[#0f3d17] text-xs font-semibold">
                  &quot;Pre-qualifying high-ticket pool buyers before they get on the phone protects expensive estimator time.&quot;
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/experts/nikhil-gautam"
                  className="text-xs font-bold text-[#108a00] hover:underline inline-flex items-center gap-1"
                >
                  View Profile <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE INTAKE FORM: EMBEDDED TALLY FORM CONTAINER
      ====================================================================== */}
      <section id="intake-form" className="py-20 bg-gradient-to-b from-[#f8faf8] via-white to-[#eaf6ee] border-b border-[#e4ebe4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Get Your Outdoor AI Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight">
              Tell Us About Your Outdoor Trade
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed font-normal">
              Complete the quick questionnaire below. Tell us about your service focus (pools, landscaping, hardscaping, lawn care), current software, and goals. We will match you with a vetted outdoor living automation specialist.
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

            {/* Embedded Tally Iframe for Outdoor LP */}
            <div className="w-full min-h-[620px] rounded-2xl overflow-hidden bg-white">
              <iframe
                data-tally-src="https://tally.so/embed/vXjVW0?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                src="https://tally.so/embed/vXjVW0?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                loading="lazy"
                width="100%"
                height="620"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Outdoor Living, Landscaping &amp; Pool Contractor AI Intake"
                className="w-full border-0"
              />
            </div>

            {/* Fallback Direct Link */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Form not loading properly?{' '}
              <a
                href="https://tally.so/r/vXjVW0"
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
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-extrabold text-[#001e00] mt-2 tracking-tight">
              Questions from Outdoor Living Contractors
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                Can the AI differentiate between high-ticket pool/patio builds and simple lawn care?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                <strong>Yes, absolutely.</strong> Your specialist sets up multi-track qualification. Callers asking about $50,000+ pools, outdoor kitchens, or paver patios are routed into an in-depth design consultation calendar, while routine maintenance inquiries are handled through separate workflows.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                Does this work with Skimmer, Jobber, LMN, or Aspire?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                Yes. Pool companies running on Skimmer or Jobber, and commercial landscapers on Aspire or LMN can synchronize new lead inquiries, addresses, and call summaries directly into their customer records.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                How does the automated weather reschedule feature work?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                When rain or severe weather prevents field work, an authorized crew lead or dispatcher can trigger a single batch update that texts every customer on that day&apos;s route with their rescheduled service day, keeping phones calm.
              </p>
            </div>

            <div className="rounded-2xl p-6 bg-[#fafafa] border border-[#e4ebe4]">
              <h3 className="text-lg font-bold text-[#001e00]">
                Who owns the automation setup and customer phone numbers?
              </h3>
              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                You retain 100% ownership. Our vetted specialists build systems inside your own accounts (Twilio, GHL, Make, Jobber). You never get locked into an agency holding your data hostage.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#intake-form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all hover:scale-[1.02]"
            >
              Start Your Outdoor AI Intake
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
