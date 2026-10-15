import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug, getCategories, getExperts } from '@/lib/store';
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
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Categories
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/[0.08] bg-[#11131c]/90 mb-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                Category Hub
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {category.name}
              </h1>
              <p className="text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          <Link
            href={`/match?category=${category.slug}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            Match in this Category
          </Link>
        </div>

        {/* Taxonomy Metadata Strip */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <h4 className="font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Core Buyer Problem
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              {taxonomyInfo.buyerProblem}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Typical Tech Stack
            </h4>
            <p className="text-zinc-400 leading-relaxed font-mono">
              {taxonomyInfo.typicalStack}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Required HITL Safeguard Focus
            </h4>
            <p className="text-zinc-400 leading-relaxed">
              {taxonomyInfo.commonSafeguards}
            </p>
          </div>
        </div>
      </div>

      {/* Specialists List */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
        <div>
          Showing <span className="font-bold text-white">{experts.length}</span> listed specialist{experts.length === 1 ? '' : 's'} in {category.name}
        </div>
        <Link href="/experts" className="text-emerald-400 hover:underline">
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
