import { INDUSTRY_RECOMMENDATIONS, type IndustryRecommendation } from './recommendations';

/** Old mega-menu query values that do not match the canonical industry slug. */
const LEGACY_INDUSTRY_ALIASES: Record<string, string> = {
  freight_logistics: 'logistics-freight',
  medical_dental: 'healthcare-dental',
  home_services_trade: 'home-services-trades',
  legal_accounting: 'legal-finance-consulting',
  ecommerce_retail: 'ecommerce-retail',
  real_estate_property: 'real-estate-property',
};

export function businessPath(slug: string): string {
  return `/recommendations/${slug}`;
}

export function businessOverviewPath(slug: string): string {
  return `/business/${slug}`;
}

export function legacyBusinessSlugs(): string[] {
  return Object.keys(LEGACY_INDUSTRY_ALIASES);
}

/** Canonical business pages plus legacy aliases that should still resolve. */
export function businessStaticSlugs(): string[] {
  return [
    ...new Set([
      ...listBusinessTypes().map((item) => item.industrySlug),
      ...legacyBusinessSlugs(),
    ]),
  ];
}

export function recommendationPagePaths(): string[] {
  return listBusinessTypes().map((item) => businessPath(item.industrySlug));
}

export function listBusinessTypes(): IndustryRecommendation[] {
  return INDUSTRY_RECOMMENDATIONS;
}

/** Map a slug, id, or legacy `?industry=` value onto a canonical industry slug. */
export function canonicalBusinessSlug(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const value = raw.trim().toLowerCase();
  if (!value) return null;
  const alias = LEGACY_INDUSTRY_ALIASES[value];
  if (alias) return alias;
  const match = INDUSTRY_RECOMMENDATIONS.find(
    (item) =>
      item.industrySlug === value ||
      item.id === value ||
      item.industrySlug.replace(/-/g, '_') === value ||
      value.replace(/-/g, '_') === item.industrySlug.replace(/-/g, '_'),
  );
  return match?.industrySlug ?? null;
}

export function businessTypeBySlug(slug: string): IndustryRecommendation | null {
  const canonical = canonicalBusinessSlug(slug);
  if (!canonical) return null;
  return INDUSTRY_RECOMMENDATIONS.find((item) => item.industrySlug === canonical) ?? null;
}
