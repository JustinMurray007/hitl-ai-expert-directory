import { AI_TOOLS } from './ai-tools';
import { COMMON_GROWTH_BOTTLENECKS, INDUSTRY_RECOMMENDATIONS, type BottleneckItem } from './recommendations';

/**
 * Build-time tool pages.
 *
 * The public directory (`AI_TOOLS`) has descriptions and official sites.
 * Supabase `tools` is seeded with 22 rows (slug, name, category only) in
 * `db/schema.sql`. Static export cannot rely on that table for page copy, so
 * those 22 slugs are represented here and enriched from the directory when the
 * product is the same. Recommendation-only names (Shopify, Meta Marketing API,
 * Google Ads scripts) get a page too, so every recommended tool can link out.
 */

export interface ToolFit {
  /** Null when the area is one of the shared bottlenecks on every business page. */
  businessSlug: string | null;
  businessName: string;
  areaId: string;
  areaLabel: string;
}

export interface PublicTool {
  slug: string;
  name: string;
  description: string;
  category: string;
  websiteUrl: string;
  company?: string;
  bestFor?: string;
  pricing?: string;
  sponsored?: boolean;
  fits: ToolFit[];
}

interface CatalogSeed {
  slug: string;
  name: string;
  category: string;
  description: string;
  websiteUrl: string;
  company?: string;
  bestFor?: string;
}

/** The 22 tools inserted in db/schema.sql. `pageSlug` is the canonical /tools path. */
export const SEEDED_DIRECTORY_TOOLS: { slug: string; pageSlug: string; name: string }[] = [
  { slug: 'make', pageSlug: 'make', name: 'Make' },
  { slug: 'zapier', pageSlug: 'zapier', name: 'Zapier' },
  { slug: 'n8n', pageSlug: 'n8n', name: 'n8n' },
  { slug: 'openai-api', pageSlug: 'openai-api', name: 'OpenAI API' },
  { slug: 'anthropic-claude', pageSlug: 'claude', name: 'Anthropic Claude' },
  { slug: 'gemini', pageSlug: 'gemini', name: 'Google Gemini' },
  { slug: 'perplexity', pageSlug: 'perplexity', name: 'Perplexity' },
  { slug: 'vapi', pageSlug: 'vapi', name: 'Vapi' },
  { slug: 'retell-ai', pageSlug: 'retell-ai', name: 'Retell AI' },
  { slug: 'bland-ai', pageSlug: 'bland-ai', name: 'Bland.ai' },
  { slug: 'twilio', pageSlug: 'twilio', name: 'Twilio' },
  { slug: 'supabase-postgres', pageSlug: 'supabase-postgres', name: 'Supabase / PostgreSQL' },
  { slug: 'pinecone', pageSlug: 'pinecone', name: 'Pinecone' },
  { slug: 'hubspot', pageSlug: 'hubspot', name: 'HubSpot' },
  { slug: 'zoho-crm', pageSlug: 'zoho-crm', name: 'Zoho CRM' },
  { slug: 'gohighlevel', pageSlug: 'gohighlevel', name: 'GoHighLevel' },
  { slug: 'zendesk', pageSlug: 'zendesk', name: 'Zendesk AI' },
  { slug: 'intercom', pageSlug: 'intercom', name: 'Intercom AI' },
  { slug: 'cursor', pageSlug: 'cursor', name: 'Cursor' },
  { slug: 'python', pageSlug: 'python', name: 'Python' },
  { slug: 'typescript', pageSlug: 'typescript', name: 'TypeScript' },
  { slug: 'ollama', pageSlug: 'ollama', name: 'Ollama / Local LLM' },
];

const SUPPLEMENTAL_TOOLS: CatalogSeed[] = [
  {
    slug: 'openai-api',
    name: 'OpenAI API',
    company: 'OpenAI',
    category: 'LLM Provider',
    websiteUrl: 'https://platform.openai.com',
    description:
      'OpenAI’s API for GPT models. Business workflows use it to draft replies, score inbound leads, and run text steps inside a CRM or database.',
    bestFor: 'Lead scoring, draft replies, and text steps that need to run inside another system.',
  },
  {
    slug: 'bland-ai',
    name: 'Bland.ai',
    company: 'Bland.ai',
    category: 'Voice AI',
    websiteUrl: 'https://www.bland.ai',
    description: 'Bland.ai places and answers phone calls with a voice agent for intake, follow-up, and appointment booking.',
    bestFor: 'Teams that want a phone agent for inbound or outbound calls.',
  },
  {
    slug: 'twilio',
    name: 'Twilio',
    company: 'Twilio',
    category: 'Voice AI',
    websiteUrl: 'https://www.twilio.com',
    description:
      'Twilio provides the phone numbers, SMS, and call routing that voice agents use to reach customers and hand a call to a person.',
    bestFor: 'Phone numbers, SMS follow-up, and live transfer underneath a voice agent.',
  },
  {
    slug: 'supabase-postgres',
    name: 'Supabase / PostgreSQL',
    company: 'Supabase',
    category: 'Database',
    websiteUrl: 'https://supabase.com',
    description:
      'Supabase hosts Postgres, including pgvector, for the records, documents, and embeddings an AI workflow reads and writes.',
    bestFor: 'Storing extracted documents, lead tables, and searchable internal knowledge.',
  },
  {
    slug: 'pinecone',
    name: 'Pinecone',
    company: 'Pinecone',
    category: 'Vector DB',
    websiteUrl: 'https://www.pinecone.io',
    description: 'Pinecone is a vector database for searching embeddings when a workflow has to retrieve passages from long documents.',
    bestFor: 'Retrieval over contracts, policies, and other long source documents.',
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    company: 'HubSpot',
    category: 'CRM',
    websiteUrl: 'https://www.hubspot.com',
    description: 'HubSpot is a CRM where leads, deals, and follow-up tasks land after an AI workflow qualifies or re-engages someone.',
    bestFor: 'Logging leads, deals, and follow-up from a voice or form workflow.',
  },
  {
    slug: 'zoho-crm',
    name: 'Zoho CRM',
    company: 'Zoho',
    category: 'CRM',
    websiteUrl: 'https://www.zoho.com/crm/',
    description: 'Zoho CRM stores contacts and deals for teams that want an AI workflow to create or update customer records.',
    bestFor: 'CRM record updates for teams already on Zoho.',
  },
  {
    slug: 'gohighlevel',
    name: 'GoHighLevel',
    company: 'HighLevel',
    category: 'CRM',
    websiteUrl: 'https://www.gohighlevel.com',
    description:
      'GoHighLevel is a CRM and marketing platform for agencies and local businesses, used here for estimate follow-up, reviews, and pipelines.',
    bestFor: 'Local service businesses that want follow-up, reviews, and a pipeline in one place.',
  },
  {
    slug: 'zendesk',
    name: 'Zendesk AI',
    company: 'Zendesk',
    category: 'Support',
    websiteUrl: 'https://www.zendesk.com',
    description: 'Zendesk AI sits on support tickets so a team can draft replies and route questions that come from a help center.',
    bestFor: 'Support teams that already answer customers in Zendesk.',
  },
  {
    slug: 'intercom',
    name: 'Intercom AI',
    company: 'Intercom',
    category: 'Support',
    websiteUrl: 'https://www.intercom.com',
    description: 'Intercom AI answers customer questions in chat and routes the conversations that need a person.',
    bestFor: 'Chat support that should answer from your docs and hand off the rest.',
  },
  {
    slug: 'python',
    name: 'Python',
    company: 'Python Software Foundation',
    category: 'Dev Tools',
    websiteUrl: 'https://www.python.org',
    description:
      'Python is the language specialists use to script document extraction, data cleanup, and the custom steps around an AI model.',
    bestFor: 'Document extraction, data cleanup, and custom workflow scripts.',
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    company: 'Microsoft',
    category: 'Dev Tools',
    websiteUrl: 'https://www.typescriptlang.org',
    description: 'TypeScript is the language used for the custom web apps and typed services in these recommendations.',
    bestFor: 'Custom apps that connect a model, a database, and a review step.',
  },
  {
    slug: 'ollama',
    name: 'Ollama / Local LLM',
    company: 'Ollama',
    category: 'LLM Provider',
    websiteUrl: 'https://ollama.com',
    description: 'Ollama runs open models on your own machine or server when a workflow should stay off a public API.',
    bestFor: 'Drafting and search that need to stay on hardware you control.',
  },
  {
    slug: 'meta-marketing-api',
    name: 'Meta Marketing API',
    company: 'Meta',
    category: 'Advertising',
    websiteUrl: 'https://developers.facebook.com/docs/marketing-apis/',
    description:
      'The Meta Marketing API is how an advertising workflow reads and updates Facebook and Instagram campaigns, creative, and spend.',
    bestFor: 'Workflows that check Meta ad performance or prepare creative changes for review.',
  },
  {
    slug: 'google-ads-scripts',
    name: 'Google Ads Scripts',
    company: 'Google',
    category: 'Advertising',
    websiteUrl: 'https://developers.google.com/google-ads/scripts/docs/start',
    description: 'Google Ads scripts automate checks and budget rules inside a Google Ads account.',
    bestFor: 'Pacing rules and alerts that run inside Google Ads.',
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    company: 'Shopify',
    category: 'Commerce',
    websiteUrl: 'https://www.shopify.com',
    description: 'Shopify is the commerce platform these retail workflows sync with for orders, inventory, and returns.',
    bestFor: 'Stores that need inventory or returns to stay in step with the point of sale.',
  },
];

/** Recommendation labels and seeded slugs that should open an existing directory page. */
const STACK_ALIASES: Record<string, string> = {
  'google gemini': 'gemini',
  gohighlevel: 'gohighlevel',
  make: 'make',
  'make.com': 'make',
  zapier: 'zapier',
  'zapier & central': 'zapier',
  'meta marketing api': 'meta-marketing-api',
  'google ads scripts': 'google-ads-scripts',
  'claude 3.5 sonnet': 'claude',
  'anthropic claude': 'claude',
  claude: 'claude',
  vapi: 'vapi',
  'retell ai': 'retell-ai',
  twilio: 'twilio',
  hubspot: 'hubspot',
  'openai api': 'openai-api',
  chatgpt: 'chatgpt',
  python: 'python',
  n8n: 'n8n',
  'supabase / postgresql': 'supabase-postgres',
  pinecone: 'pinecone',
  typescript: 'typescript',
  perplexity: 'perplexity',
  'perplexity ai': 'perplexity',
  cursor: 'cursor',
  'ollama / local llm': 'ollama',
  shopify: 'shopify',
  'bland.ai': 'bland-ai',
  'zendesk ai': 'zendesk',
  'intercom ai': 'intercom',
  'anthropic-claude': 'claude',
};

const SLUG_ALIASES: Record<string, string> = {
  'anthropic-claude': 'claude',
};

let catalog: PublicTool[] | null = null;
let stackIndex = new Map<string, string>();

function considerArea(
  fits: ToolFit[],
  seen: Set<string>,
  businessSlug: string | null,
  businessName: string,
  area: BottleneckItem,
  resolve: (name: string) => string | null,
  slug: string,
) {
  const matched = area.recommendedWorkflow.recommendedStack.some((name) => resolve(name) === slug);
  if (!matched) return;
  const key = `${businessSlug ?? '*'}|${area.id}`;
  if (seen.has(key)) return;
  seen.add(key);
  fits.push({
    businessSlug,
    businessName,
    areaId: area.id,
    areaLabel: area.label,
  });
}

function buildCatalog(): PublicTool[] {
  const aiSlugs = new Set(AI_TOOLS.map((tool) => tool.id));
  const base: Omit<PublicTool, 'fits'>[] = [
    ...AI_TOOLS.map((tool) => ({
      slug: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.categoryLabel,
      websiteUrl: tool.websiteUrl,
      company: tool.company,
      bestFor: tool.bestFor,
      pricing: tool.pricing,
      sponsored: tool.sponsored,
    })),
    ...SUPPLEMENTAL_TOOLS.filter((tool) => !aiSlugs.has(tool.slug)).map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      websiteUrl: tool.websiteUrl,
      company: tool.company,
      bestFor: tool.bestFor,
    })),
  ];

  const index = new Map<string, string>();
  for (const tool of base) {
    index.set(tool.slug, tool.slug);
    index.set(tool.name.trim().toLowerCase(), tool.slug);
  }
  for (const [key, slug] of Object.entries(STACK_ALIASES)) index.set(key, slug);
  stackIndex = index;

  const resolve = (name: string) => index.get(name.trim().toLowerCase()) ?? null;

  return base.map((tool) => {
    const fits: ToolFit[] = [];
    const seen = new Set<string>();
    for (const industry of INDUSTRY_RECOMMENDATIONS) {
      for (const area of industry.commonBottlenecks) {
        considerArea(fits, seen, industry.industrySlug, industry.industryName, area, resolve, tool.slug);
      }
    }
    for (const area of COMMON_GROWTH_BOTTLENECKS) {
      considerArea(fits, seen, null, 'Every business type', area, resolve, tool.slug);
    }
    return { ...tool, fits };
  });
}

export function listPublicTools(): PublicTool[] {
  if (!catalog) catalog = buildCatalog();
  return catalog;
}

export function toolSlugForStackName(name: string): string | null {
  listPublicTools();
  return stackIndex.get(name.trim().toLowerCase()) ?? null;
}

export function resolveToolSlug(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim().toLowerCase();
  if (!value) return null;
  if (SLUG_ALIASES[value]) return SLUG_ALIASES[value];
  return listPublicTools().some((tool) => tool.slug === value) ? value : null;
}

export function toolBySlug(slug: string): PublicTool | null {
  const canonical = resolveToolSlug(slug);
  if (!canonical) return null;
  return listPublicTools().find((tool) => tool.slug === canonical) ?? null;
}

export function toolByRecommendedName(name: string): PublicTool | null {
  const slug = toolSlugForStackName(name);
  return slug ? toolBySlug(slug) : null;
}

export function toolPath(slug: string): string {
  const canonical = resolveToolSlug(slug) ?? slug;
  return `/tools/${canonical}`;
}

export function toolSitemapPaths(): string[] {
  return listPublicTools().map((tool) => toolPath(tool.slug));
}

export function toolAliasSlugs(): { slug: string; canonical: string }[] {
  return SEEDED_DIRECTORY_TOOLS.filter((tool) => tool.slug !== tool.pageSlug).map((tool) => ({
    slug: tool.slug,
    canonical: tool.pageSlug,
  }));
}

export function toolStaticSlugs(): string[] {
  return [...new Set([...listPublicTools().map((tool) => tool.slug), ...toolAliasSlugs().map((tool) => tool.slug)])];
}

/** Seeded and recommendation tools that are not already a card in the AI tools directory. */
export function toolsBeyondDirectory(): PublicTool[] {
  const ids = new Set(AI_TOOLS.map((tool) => tool.id));
  return listPublicTools().filter((tool) => !ids.has(tool.slug));
}

export interface GroupedToolFit {
  businessSlug: string | null;
  businessName: string;
  areas: { id: string; label: string }[];
}

export function groupToolFits(fits: readonly ToolFit[]): GroupedToolFit[] {
  const order: string[] = [];
  const groups = new Map<string, GroupedToolFit>();
  for (const fit of fits) {
    const key = fit.businessSlug ?? '*';
    let group = groups.get(key);
    if (!group) {
      group = { businessSlug: fit.businessSlug, businessName: fit.businessName, areas: [] };
      groups.set(key, group);
      order.push(key);
    }
    if (!group.areas.some((area) => area.id === fit.areaId)) {
      group.areas.push({ id: fit.areaId, label: fit.areaLabel });
    }
  }
  const shared = order.filter((key) => key === '*');
  const specific = order.filter((key) => key !== '*');
  return [...specific, ...shared].map((key) => groups.get(key)!);
}
