import { execFileSync } from 'node:child_process';
import { getCategories, getExperts } from './store';
import { getExpertsByCity, getExpertsByState, getExpertsByZip, getLocationsSummary } from './locations';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH, businessPath, listBusinessTypes } from './business-routes';
import { listPublicTools } from './tool-catalog';
import { absoluteUrl, SITE_ORIGIN } from './site-url';
import { isRetiredExpertSlug } from './listing';
import type { Expert } from './types';
import { isStaticExportPlaceholder, STATIC_EXPORT_PLACEHOLDER } from './static-params';

/** Used only when a row has no timestamp and git history is unavailable. */
export const SITEMAP_CONTENT_DATE = '2026-11-12';

export const CHANGE_FREQUENCIES = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'] as const;
export type ChangeFrequency = (typeof CHANGE_FREQUENCIES)[number];

export const SITEMAP_GROUPS = [
  { id: 'main', title: 'Main pages' },
  { id: 'ai-solutions', title: 'AI Solutions by Industry' },
  { id: 'tools', title: 'AI tools' },
  { id: 'categories', title: 'Categories' },
  { id: 'experts', title: 'Experts' },
  { id: 'locations', title: 'Locations' },
] as const;

export type SitemapGroupId = (typeof SITEMAP_GROUPS)[number]['id'];

export interface PublicPage {
  path: string;
  title: string;
  group: SitemapGroupId;
  lastmod: string;
  changefreq: ChangeFrequency;
  priority: number;
}

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: ChangeFrequency;
  priority: number;
}

const W3C_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Date portion of an ISO timestamp. Empty when the value is missing or invalid. */
export function explicitLastmod(value?: string | null): string | null {
  if (!value) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  if (match && W3C_DATE.test(match[1])) return match[1];
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

/** Date portion of an ISO timestamp, which is the W3C datetime form sitemaps allow. */
export function toW3cDate(value?: string | null): string {
  return explicitLastmod(value) || SITEMAP_CONTENT_DATE;
}

const gitDates = new Map<string, string | null>();

/** Last commit date of a source file. Null when git is not available. */
export function gitLastmod(file: string): string | null {
  if (gitDates.has(file)) return gitDates.get(file) ?? null;
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const value = W3C_DATE.test(date) ? date : null;
    gitDates.set(file, value);
    return value;
  } catch {
    gitDates.set(file, null);
    return null;
  }
}

export function resolveLastmod(explicit?: string | null, sourceFile?: string): string {
  return explicitLastmod(explicit) || (sourceFile ? gitLastmod(sourceFile) : null) || SITEMAP_CONTENT_DATE;
}

function newestExpertDate(experts: readonly Expert[]): string | null {
  let newest: string | null = null;
  for (const expert of experts) {
    const date = explicitLastmod(expert.updated_at || expert.created_at);
    if (date && (!newest || date > newest)) newest = date;
  }
  return newest;
}

function page(
  path: string,
  title: string,
  group: SitemapGroupId,
  changefreq: ChangeFrequency,
  priority: number,
  explicit?: string | null,
  sourceFile?: string,
): PublicPage {
  return { path, title, group, changefreq, priority, lastmod: resolveLastmod(explicit, sourceFile) };
}

/**
 * Every indexable public URL.
 * Omitted on purpose: noindex routes (/apply/success, /apply/thanks, /match/thanks,
 * demo profiles, static-export placeholders), redirects (/business, /ai-tools,
 * /recommendations, legacy industry aliases, /tools/anthropic-claude,
 * /experts/withn-tech), robots-disallowed /admin, and non-canonical state
 * abbreviations that duplicate /locations/state/<full-name>.
 */
export async function listPublicPages(): Promise<PublicPage[]> {
  const [categories, experts] = await Promise.all([getCategories(), getExperts()]);
  const { states, cities, zips } = getLocationsSummary(experts);
  const directoryDate = newestExpertDate(experts);
  const pages: PublicPage[] = [
    page('/', 'Home', 'main', 'daily', 1, directoryDate, 'src/app/page.tsx'),
    page('/about', 'About', 'main', 'monthly', 0.7, null, 'src/app/about/page.tsx'),
    page('/apply', 'Apply to be listed', 'main', 'weekly', 0.8, null, 'src/app/apply/page.tsx'),
    page('/match', 'Concierge match', 'main', 'weekly', 0.8, null, 'src/app/match/page.tsx'),
    page('/tools', 'AI tools', 'main', 'weekly', 0.8, null, 'src/app/tools/page.tsx'),
    page(AI_SOLUTIONS_BY_INDUSTRY_PATH, 'AI Solutions by Industry', 'main', 'weekly', 0.9, null, 'src/app/ai-solutions-by-industry/page.tsx'),
    page('/categories', 'Categories', 'main', 'weekly', 0.9, directoryDate, 'src/app/categories/page.tsx'),
    page('/experts', 'Experts', 'main', 'daily', 0.9, directoryDate, 'src/app/experts/page.tsx'),
    page('/locations', 'Locations', 'main', 'weekly', 0.8, directoryDate, 'src/app/locations/page.tsx'),
    page('/construction-lp', 'Construction and remodeling', 'main', 'monthly', 0.6, null, 'src/app/construction-lp/page.tsx'),
    page('/outdoor-lp', 'Outdoor and landscaping', 'main', 'monthly', 0.6, null, 'src/app/outdoor-lp/page.tsx'),
    page('/sitemap', 'Sitemap', 'main', 'weekly', 0.3, null, 'src/app/sitemap/page.tsx'),
    page('/ai-consultant-cost', 'AI consultant cost', 'main', 'monthly', 0.8, null, 'src/app/ai-consultant-cost/page.tsx'),
    page('/for-ai-experts', 'For AI experts', 'main', 'monthly', 0.8, null, 'src/app/for-ai-experts/page.tsx'),
    page('/hitl-standard', 'HITL Standard', 'main', 'monthly', 0.7, null, 'src/app/hitl-standard/page.tsx'),
    page('/blog', 'Guides', 'main', 'weekly', 0.6, null, 'src/app/blog/page.tsx'),
    page('/ai-consultant-for-small-business', 'AI consultant for small business', 'main', 'monthly', 0.7, null, 'src/app/ai-consultant-for-small-business/page.tsx'),
    page('/compare/upwork-vs-find-ai-pros', 'Find AI Pros vs freelance sites', 'main', 'monthly', 0.5, null, 'src/app/compare/upwork-vs-find-ai-pros/page.tsx'),
    page('/faq', 'FAQ', 'main', 'monthly', 0.5, null, 'src/app/faq/page.tsx'),
    page('/ai-for-contractors', 'AI for contractors', 'main', 'monthly', 0.7, null, 'src/app/ai-for-contractors/page.tsx'),
  ];

  for (const industry of listBusinessTypes()) {
    if (isStaticExportPlaceholder(industry.industrySlug)) continue;
    pages.push(
      page(businessPath(industry.industrySlug), industry.industryName, 'ai-solutions', 'weekly', 0.8, null, 'src/lib/recommendations.ts'),
    );
  }

  for (const tool of listPublicTools()) {
    if (isStaticExportPlaceholder(tool.slug)) continue;
    const toolExperts = experts.filter((expert) => (expert.tools ?? []).some((item) => item.slug === tool.slug));
    pages.push(page(`/tools/${tool.slug}`, tool.name, 'tools', 'monthly', 0.6, newestExpertDate(toolExperts), 'src/lib/tool-catalog.ts'));
  }

  for (const category of categories) {
    if (!category.slug || isStaticExportPlaceholder(category.slug)) continue;
    const inCategory = experts.filter((expert) => expert.categories.some((item) => item.slug === category.slug));
    pages.push(
      page(`/categories/${category.slug}`, category.name, 'categories', 'weekly', 0.8, newestExpertDate(inCategory), 'src/app/categories/[slug]/page.tsx'),
    );
  }

  for (const expert of experts) {
    if (expert.is_demo || !expert.slug || isStaticExportPlaceholder(expert.slug) || isRetiredExpertSlug(expert.slug)) continue;
    pages.push(
      page(
        `/experts/${expert.slug}`,
        expert.full_name,
        'experts',
        'weekly',
        0.7,
        expert.updated_at || expert.created_at,
        'src/lib/seed.ts',
      ),
    );
  }

  for (const state of states) {
    if (!state.slug || isStaticExportPlaceholder(state.slug)) continue;
    const inState = getExpertsByState(state.slug, experts).experts;
    pages.push(page(`/locations/state/${state.slug}`, state.name, 'locations', 'weekly', 0.7, newestExpertDate(inState), 'src/app/locations/state/[state]/page.tsx'));
  }
  for (const city of cities) {
    if (!city.slug || isStaticExportPlaceholder(city.slug)) continue;
    const inCity = getExpertsByCity(city.slug, experts).experts;
    pages.push(page(`/locations/city/${city.slug}`, `${city.name}, ${city.stateCode}`, 'locations', 'weekly', 0.6, newestExpertDate(inCity), 'src/app/locations/city/[city]/page.tsx'));
  }
  for (const zip of zips) {
    if (!zip.slug || isStaticExportPlaceholder(zip.slug)) continue;
    const inZip = getExpertsByZip(zip.slug, experts).experts;
    pages.push(page(`/locations/zip/${zip.slug}`, `${zip.zip} · ${zip.cityName}`, 'locations', 'monthly', 0.5, newestExpertDate(inZip), 'src/app/locations/zip/[zip]/page.tsx'));
  }

  const seen = new Set<string>();
  const unique: PublicPage[] = [];
  for (const entry of pages) {
    if (seen.has(entry.path)) continue;
    seen.add(entry.path);
    unique.push(entry);
  }
  return unique;
}

export function toSitemapUrls(pages: readonly PublicPage[]): SitemapUrl[] {
  return pages.map((entry) => ({
    loc: absoluteUrl(entry.path),
    lastmod: entry.lastmod,
    changefreq: entry.changefreq,
    priority: entry.priority,
  }));
}

export function sitemapValidationErrors(pages: readonly PublicPage[]): string[] {
  const errors: string[] = [];
  const locs = new Set<string>();
  const urls = toSitemapUrls(pages);
  if (pages.length !== urls.length) errors.push('url count drifted');
  if (pages.length > 50000) errors.push('sitemap exceeds 50,000 URLs');

  for (const entry of pages) {
    if (!entry.path.startsWith('/')) errors.push(`path must start with /: ${entry.path}`);
    if (entry.path !== '/' && entry.path.endsWith('/')) errors.push(`trailing slash: ${entry.path}`);
    if (entry.path.includes('?') || entry.path.includes('#')) errors.push(`not canonical: ${entry.path}`);
    if (entry.path.includes(STATIC_EXPORT_PLACEHOLDER)) errors.push(`placeholder: ${entry.path}`);
    if (!W3C_DATE.test(entry.lastmod)) errors.push(`lastmod: ${entry.path}`);
    if (!CHANGE_FREQUENCIES.includes(entry.changefreq)) errors.push(`changefreq: ${entry.path}`);
    if (entry.priority < 0 || entry.priority > 1) errors.push(`priority: ${entry.path}`);
  }

  for (const url of urls) {
    if (!url.loc.startsWith(`${SITE_ORIGIN}/`) && url.loc !== SITE_ORIGIN) {
      errors.push(`loc host: ${url.loc}`);
    }
    if (url.loc.includes('?') || url.loc.includes('#') || url.loc.endsWith('/')) {
      errors.push(`loc shape: ${url.loc}`);
    }
    if (locs.has(url.loc)) errors.push(`duplicate: ${url.loc}`);
    locs.add(url.loc);
  }

  return errors;
}
