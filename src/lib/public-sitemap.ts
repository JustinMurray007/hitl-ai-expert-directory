import { getCategories, getExperts } from './store';
import { getLocationsSummary } from './locations';
import { businessOverviewPath, businessPath, listBusinessTypes } from './business-routes';
import { listPublicTools } from './tool-catalog';
import { absoluteUrl, SITE_ORIGIN } from './site-url';
import { isRetiredExpertSlug } from './listing';
import { isStaticExportPlaceholder, STATIC_EXPORT_PLACEHOLDER } from './static-params';

export const SITEMAP_CONTENT_DATE = '2026-11-13';

export const CHANGE_FREQUENCIES = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'] as const;
export type ChangeFrequency = (typeof CHANGE_FREQUENCIES)[number];

export const SITEMAP_GROUPS = [
  { id: 'main', title: 'Main pages' },
  { id: 'business', title: 'Business types' },
  { id: 'recommendations', title: 'Recommendations by business' },
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

/** Date portion of an ISO timestamp, which is the W3C datetime form sitemaps allow. */
export function toW3cDate(value?: string | null): string {
  if (!value) return SITEMAP_CONTENT_DATE;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  if (match && W3C_DATE.test(match[1])) return match[1];
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return SITEMAP_CONTENT_DATE;
  return parsed.toISOString().slice(0, 10);
}

function page(
  path: string,
  title: string,
  group: SitemapGroupId,
  changefreq: ChangeFrequency,
  priority: number,
  lastmod = SITEMAP_CONTENT_DATE,
): PublicPage {
  return { path, title, group, changefreq, priority, lastmod: toW3cDate(lastmod) };
}

/**
 * Every indexable public URL.
 * Omitted on purpose: noindex routes (/apply/thanks, /match/thanks, demo profiles,
 * static-export placeholders), redirects (/ai-tools, legacy industry aliases,
 * /tools/anthropic-claude, /experts/withn-tech), robots-disallowed /admin, and
 * non-canonical state abbreviations that duplicate /locations/state/<full-name>.
 */
export async function listPublicPages(): Promise<PublicPage[]> {
  const [categories, experts] = await Promise.all([getCategories(), getExperts()]);
  const { states, cities, zips } = getLocationsSummary(experts);
  const pages: PublicPage[] = [
    page('/', 'Home', 'main', 'daily', 1),
    page('/about', 'About', 'main', 'monthly', 0.7),
    page('/apply', 'Apply to be listed', 'main', 'weekly', 0.8),
    page('/apply/success', 'Payment received', 'main', 'yearly', 0.2),
    page('/match', 'Concierge match', 'main', 'weekly', 0.8),
    page('/tools', 'AI tools', 'main', 'weekly', 0.8),
    page('/recommendations', 'Recommendations', 'main', 'weekly', 0.9),
    page('/categories', 'Categories', 'main', 'weekly', 0.9),
    page('/experts', 'Experts', 'main', 'daily', 0.9),
    page('/locations', 'Locations', 'main', 'weekly', 0.8),
    page('/construction-lp', 'Construction and remodeling', 'main', 'monthly', 0.6),
    page('/outdoor-lp', 'Outdoor and landscaping', 'main', 'monthly', 0.6),
    page('/sitemap', 'Sitemap', 'main', 'weekly', 0.3),
  ];

  for (const industry of listBusinessTypes()) {
    if (isStaticExportPlaceholder(industry.industrySlug)) continue;
    pages.push(page(businessOverviewPath(industry.industrySlug), industry.industryName, 'business', 'weekly', 0.8));
    pages.push(page(businessPath(industry.industrySlug), industry.industryName, 'recommendations', 'weekly', 0.8));
  }

  for (const tool of listPublicTools()) {
    if (isStaticExportPlaceholder(tool.slug)) continue;
    pages.push(page(`/tools/${tool.slug}`, tool.name, 'tools', 'monthly', 0.6));
  }

  for (const category of categories) {
    if (!category.slug || isStaticExportPlaceholder(category.slug)) continue;
    pages.push(page(`/categories/${category.slug}`, category.name, 'categories', 'weekly', 0.8));
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
      ),
    );
  }

  for (const state of states) {
    if (!state.slug || isStaticExportPlaceholder(state.slug)) continue;
    pages.push(page(`/locations/state/${state.slug}`, state.name, 'locations', 'weekly', 0.7));
  }
  for (const city of cities) {
    if (!city.slug || isStaticExportPlaceholder(city.slug)) continue;
    pages.push(page(`/locations/city/${city.slug}`, `${city.name}, ${city.stateCode}`, 'locations', 'weekly', 0.6));
  }
  for (const zip of zips) {
    if (!zip.slug || isStaticExportPlaceholder(zip.slug)) continue;
    pages.push(page(`/locations/zip/${zip.slug}`, `${zip.zip} · ${zip.cityName}`, 'locations', 'monthly', 0.5));
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
