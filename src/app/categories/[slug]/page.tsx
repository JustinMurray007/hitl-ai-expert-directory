import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { breadcrumbList, graph, itemList } from '@/lib/schema';
import { expertForPage } from '@/lib/listing';
import { withCanonical } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-url';
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
  Cpu,
  Target,
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
  Cpu: Cpu,
  Target: Target,
};

// Category details from STRATEGY.md taxonomy
const categoryTaxonomyDetails: Record<
  string,
  { buyerProblem: string; typicalStack: string; commonSafeguards: string }
> = {
  'operations-workflow-automation': {
    buyerProblem: 'CRM syncing, invoice & receipt processing, data entry elimination, and automated financial reporting.',
    typicalStack: 'Make, Zapier, n8n, OpenAI/Anthropic, Supabase / PostgreSQL, Python',
    commonSafeguards: 'Team review alerts, accounting validation checks, and automatic reversal if an invoice numbers mismatch.',
  },
  'sales-lead-qualification': {
    buyerProblem: '24/7 inbound phone answering, lead qualification, appointment booking, and instant follow-ups.',
    typicalStack: 'Bland.ai, Vapi, Retell, Twilio, HubSpot, Zoho CRM',
    commonSafeguards: 'Instant live phone transfer to your staff or receptionist whenever a caller has urgent questions.',
  },
  'customer-support-knowledge-base': {
    buyerProblem: 'Answering customer questions from your company manuals, policy documents, and ticket triage.',
    typicalStack: 'PostgreSQL, Claude, Zendesk AI, Intercom AI',
    commonSafeguards: 'Staff check answers against source documents before any new policy answers are sent.',
  },
  'marketing-programmatic-content': {
    buyerProblem: '5-star review generation, local Google rankings, and automated quote follow-ups.',
    typicalStack: 'Google Workspace, GA4, GoHighLevel, Gemini, Zapier',
    commonSafeguards: 'Draft review links requiring owner or marketing manager sign-off before content goes live.',
  },
  'executive-personal-ai-ops': {
    buyerProblem: 'Daily scheduling, inbox triage, meeting summaries, and standard operating procedures.',
    typicalStack: 'Claude, Google Workspace, Perplexity, Cursor, Local AI',
    commonSafeguards: 'Draft-only permissions; emails and calendar invites are saved as drafts for your final 1-click approval.',
  },
  'ai-advertising-paid-media': {
    buyerProblem: 'Google & Meta Ads management, automated creative testing, budget optimization, and tracking lead cost.',
    typicalStack: 'Make, Meta Marketing API, Google Ads Scripts, Claude, Python',
    commonSafeguards: 'Hard daily spend limits requiring owner text or email confirmation before any budget increases.',
  },
  'custom-ai-models-integration': {
    buyerProblem: 'Private company AI systems, custom database connections, proprietary workflows, and data privacy.',
    typicalStack: 'Python, TypeScript, Secure Cloud / Local Hosting, PostgreSQL, Docker',
    commonSafeguards: 'Secure data isolation, strict privacy firewalls, and expert code reviews before production deployment.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | Find Ai Pros' };
  }

  if (category.slug === 'sales-lead-qualification') {
    return withCanonical(`/categories/${category.slug}`, {
      title: 'Hire an AI Voice Receptionist & Lead Follow-Up Expert',
      description:
        'Builders of AI receptionists, missed-call text-back, and speed-to-lead follow-up. See budgets, tools, and how each hands off to your staff.',
    });
  }
  return withCanonical(`/categories/${category.slug}`, {
    title: `Hire a ${category.name} Expert | Find AI Pros`,
    description: category.description,
  });
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
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            name: category.name,
            serviceType: category.name,
            url: absoluteUrl(`/categories/${category.slug}`),
            description: category.description,
            provider: { '@type': 'Organization', name: 'Find AI Pros' },
          },
          itemList(
            `${category.name} experts`,
            experts.map((expert) => ({ name: expert.full_name, path: `/experts/${expert.slug}` })),
          ),
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            { name: category.name, path: `/categories/${category.slug}` },
          ]),
        )}
      />
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/#categories"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="rounded-3xl p-8 sm:p-12 border border-line bg-white mb-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-start gap-5 min-[480px]:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft border border-brand-line flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-brand" />
            </div>
            <div>
              <span className="text-sm uppercase font-mono tracking-wider text-brand font-bold">
                Category Hub
              </span>
              <h1 className="text-3xl sm:text-4xl font-semibold text-ink mt-1">
                {category.slug === 'sales-lead-qualification'
                  ? 'Hire an AI Voice Receptionist and Lead Follow-Up Expert'
                  : category.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-strong mt-2 max-w-2xl leading-relaxed font-normal">
                {category.slug === 'sales-lead-qualification'
                  ? 'An AI voice receptionist answers every call, qualifies the caller, books the appointment, and texts back missed calls. The experts in this category build them on tools like Retell, Vapi, Bland, and Twilio, and each one transfers urgent or unclear calls to a live person.'
                  : category.description}
              </p>
            </div>
          </div>

          <Link
            href={`/match?category=${category.slug}`}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-rest sm:w-auto"
          >
            <Sparkles className="w-4 h-4" />
            Match in this Category
          </Link>
        </div>

        {/* Taxonomy Metadata Strip */}
        <div className="mt-8 pt-6 border-t border-line-soft grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-canvas-muted border border-line">
            <h2 className="font-semibold text-ink mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              Core Buyer Problem
            </h2>
            <p className="text-muted-strong text-base leading-relaxed font-normal">
              {taxonomyInfo.buyerProblem}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-soft border border-brand-line">
            <h2 className="font-semibold text-brand mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Layers className="w-4 h-4 text-brand" />
              Typical Tech Stack
            </h2>
            <p className="text-brand-ink text-base leading-relaxed font-mono font-medium">
              {taxonomyInfo.typicalStack}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-accent-soft border border-accent-line">
            <h2 className="font-semibold text-accent-ink mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              Common handoff
            </h2>
            <p className="text-accent-deep text-base leading-relaxed font-normal">
              {taxonomyInfo.commonSafeguards}
            </p>
          </div>
        </div>
      </div>

      {/* Specialists List */}
      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <div>
          Showing <span className="font-bold text-ink">{experts.length}</span> listed specialist{experts.length === 1 ? '' : 's'} in {category.name}
        </div>
        <Link href="/experts" className="text-brand font-bold hover:underline">
          View all categories
        </Link>
      </div>

      <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expertForPage(expert)} />
        ))}
      </div>
    </div>
  );
}
