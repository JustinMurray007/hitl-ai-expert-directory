import Link from 'next/link';
import { getCategories } from '@/lib/store';
import {
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Operational AI Taxonomy & Solution Hubs | HITL Directory',
  description:
    'Explore verified AI automation categories categorized by operational business bottleneck — from voice dispatch to high-compliance RAG and ERP pipelines.',
};

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
  Cpu: Cpu,
};

const categoryThemes: Record<string, { bg: string; border: string; text: string; badgeBg: string }> = {
  'operations-workflow-automation': {
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    text: 'text-[#2563eb]',
    badgeBg: 'bg-[#dbeafe]',
  },
  'sales-lead-qualification': {
    bg: 'bg-[#e4f7e6]',
    border: 'border-[#b2e8b8]',
    text: 'text-[#108a00]',
    badgeBg: 'bg-[#cbf2cf]',
  },
  'customer-support-knowledge-base': {
    bg: 'bg-[#f0fdfa]',
    border: 'border-[#99f6e4]',
    text: 'text-[#0d9488]',
    badgeBg: 'bg-[#ccfbf1]',
  },
  'marketing-programmatic-content': {
    bg: 'bg-[#f5f3ff]',
    border: 'border-[#ddd6fe]',
    text: 'text-[#7c3aed]',
    badgeBg: 'bg-[#ede9fe]',
  },
  'executive-personal-ai-ops': {
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    text: 'text-[#d97706]',
    badgeBg: 'bg-[#fef3c7]',
  },
  'custom-ai-models-integration': {
    bg: 'bg-[#f8fafc]',
    border: 'border-[#cbd5e1]',
    text: 'text-[#0284c7]',
    badgeBg: 'bg-[#e2e8f0]',
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#f9f9fb] pb-24">
      {/* Header */}
      <section className="mesh-gradient-hero border-b border-[#e4ebe4] pt-16 pb-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#108a00]" />
            <span>Structured Operational Taxonomy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight max-w-3xl mx-auto leading-tight">
            Browse AI Specialists by Operational Bottleneck
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed font-normal">
            Every category hub groups vetted specialists, verified production architectures, and mandatory human fallback safeguards tailored to specific operational hurdles.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="text-[#5e6d55] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#108a00]" /> 6 Specialization Hubs
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[#5e6d55] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#108a00]" /> Audited Code & Safeguards
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[#5e6d55] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#108a00]" /> Guaranteed Fallbacks
            </span>
          </div>
        </div>
      </section>

      {/* Symmetrical 3x2 Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon_name] || Workflow;
            const theme = categoryThemes[category.slug] || {
              bg: 'bg-[#eff6ff]',
              border: 'border-[#bfdbfe]',
              text: 'text-[#2563eb]',
              badgeBg: 'bg-[#dbeafe]',
            };

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-3xl p-8 bg-white border border-[#e4ebe4] shadow-xs hover:shadow-xl hover:border-[#108a00]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${theme.text}`} />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${theme.badgeBg} ${theme.text}`}
                    >
                      {category.expert_count ?? 0} Listed Expert{category.expert_count === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-[#001e00] group-hover:text-[#108a00] transition-colors">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-base text-[#475569] leading-relaxed font-normal">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#f0f3f0] flex items-center justify-between text-sm font-bold text-[#108a00]">
                  <span>Explore Specialists & Blueprints</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl p-8 sm:p-10 border border-[#bfdbfe] bg-gradient-to-r from-[#eff6ff] via-white to-[#edf7ee] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#bfdbfe] text-xs font-bold text-[#1d4ed8] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
              Need an Automated Recommendation?
            </div>
            <h3 className="text-2xl font-black text-[#001e00]">
              Not sure which category fits your operational challenge?
            </h3>
            <p className="mt-2 text-base text-[#475569] font-normal">
              Take our interactive 2-minute business assessment to get an instant AI architecture blueprint with required human guardrails.
            </p>
          </div>
          <Link
            href="/recommendations"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all"
          >
            Launch AI Recommender →
          </Link>
        </div>
      </section>
    </div>
  );
}
