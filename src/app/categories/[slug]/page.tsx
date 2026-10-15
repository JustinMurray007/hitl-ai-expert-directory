import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, getExperts } from '@/lib/store';
import ExpertCard from '@/components/ExpertCard';
import {
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
  Cpu: Cpu,
};

// Category details from STRATEGY.md taxonomy
const categoryTaxonomyDetails: Record<
  string,
  { buyerProblem: string; typicalStack: string; commonSafeguards: string }
> = {
  'operations-workflow-automation': {
    buyerProblem: 'CRM syncing, invoice processing, PDF document extraction, internal handoffs and reporting automation.',
    typicalStack: 'Make, Zapier, n8n, OpenAI/Anthropic, Supabase / PostgreSQL, Python',
    commonSafeguards: 'Slack quarantine queues, regex accounting schema checks, transaction rollback triggers.',
  },
  'sales-lead-qualification': {
    buyerProblem: '24/7 inbound response, call routing, lead scoring, cold-outreach triage.',
    typicalStack: 'Bland.ai, Vapi, Retell, Twilio, HubSpot, Zoho CRM',
    commonSafeguards: 'Instant warm SIP transfer to human receptionist on high frustration or urgent keywords.',
  },
  'customer-support-knowledge-base': {
    buyerProblem: 'FAQ accuracy from internal docs, ticketing triage, RAG and documentation retrieval.',
    typicalStack: 'pgvector, Pinecone, Claude 3.5 Sonnet, Zendesk AI, Intercom AI',
    commonSafeguards: 'Strict source snippet citations with human sign-off on low entailment scores.',
  },
  'marketing-programmatic-content': {
    buyerProblem: 'Review generation, local SEO content workflows, automated estimate follow-ups.',
    typicalStack: 'Google Workspace, GA4, GoHighLevel, Gemini, Zapier',
    commonSafeguards: 'Draft preview staging URLs requiring human regional editor sign-off before publishing.',
  },
  'executive-personal-ai-ops': {
    buyerProblem: 'Daily scheduling, email triage, meeting action-item digestion, personal SOPs.',
    typicalStack: 'Claude, Gemini Workspaces, Perplexity, Cursor, Ollama / Local LLM',
    commonSafeguards: 'Zero-send API permissions; drafts created in client inbox requiring manual human review to send.',
  },
  'custom-ai-models-integration': {
    buyerProblem: 'Private LLM fine-tuning, vector search pipelines, bespoke ERP bridges, and high-security compliance workflows.',
    typicalStack: 'Ollama, vLLM, Supabase pgvector, Python, TypeScript, Docker',
    commonSafeguards: 'Air-gapped deployment fences, automated hallucination benchmarking, dual-engineer audit sign-offs.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | HITL Directory' };
  }

  return {
    title: `${category.name} — Verified AI Specialists | HITL Directory`,
    description: `Hire vetted AI experts in ${category.name}. Every specialist must prove their human oversight mechanism.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, experts] = await Promise.all([
    getCategoryBySlug(slug),
    getExperts({ category: slug }),
  ]);

  if (!category) {
    notFound();
  }

  const Icon = categoryIcons[category.icon_name] || Workflow;
  const taxonomyInfo = categoryTaxonomyDetails[slug] || {
    buyerProblem: category.description,
    typicalStack: 'Modern LLMs, Automation Engines, Vector DBs',
    commonSafeguards: 'Dual-step human sign-off on low confidence.',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/#categories"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5e6d55] hover:text-[#001e00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="rounded-3xl p-8 sm:p-12 border border-[#e4ebe4] bg-white mb-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-[#108a00]" />
            </div>
            <div>
              <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
                Category Hub
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#001e00] mt-1">
                {category.name}
              </h1>
              <p className="text-base sm:text-lg text-[#475569] mt-2 max-w-2xl leading-relaxed font-normal">
                {category.description}
              </p>
            </div>
          </div>

          <Link
            href={`/match?category=${category.slug}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-sm transition-all shrink-0 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            Match in this Category
          </Link>
        </div>

        {/* Taxonomy Metadata Strip */}
        <div className="mt-8 pt-6 border-t border-[#f0f3f0] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#f9faf9] border border-[#e4ebe4]">
            <h4 className="font-extrabold text-[#001e00] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#108a00]" />
              Core Buyer Problem
            </h4>
            <p className="text-[#475569] text-base leading-relaxed font-normal">
              {taxonomyInfo.buyerProblem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe]">
            <h4 className="font-extrabold text-[#1d4ed8] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#2563eb]" />
              Typical Tech Stack
            </h4>
            <p className="text-[#1e3a8a] text-base leading-relaxed font-mono font-medium">
              {taxonomyInfo.typicalStack}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffbeb] border border-[#fde68a]">
            <h4 className="font-extrabold text-[#92400e] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
              Required HITL Safeguard Focus
            </h4>
            <p className="text-[#78350f] text-base leading-relaxed font-normal">
              {taxonomyInfo.commonSafeguards}
            </p>
          </div>
        </div>
      </div>

      {/* Specialists List */}
      <div className="mb-6 flex items-center justify-between text-sm text-[#5e6d55]">
        <div>
          Showing <span className="font-bold text-[#001e00]">{experts.length}</span> listed specialist{experts.length === 1 ? '' : 's'} in {category.name}
        </div>
        <Link href="/experts" className="text-[#108a00] font-bold hover:underline">
          View all categories
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
}
