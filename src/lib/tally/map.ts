import { FREE_INCLUDED_CATEGORIES, trimCategorySlugs } from '../billing/category-cap';
import { freePeriodEndsAt } from '../listing';
import {
  TALLY_QUESTION_LABELS,
  type CatalogEntry,
  type MappingFlags,
  type PendingListing,
  type TallyEnvelope,
  type TallyField,
} from './types';

const CATEGORY_QUESTION_LABELS = [
  TALLY_QUESTION_LABELS.categories,
  'Select 1 primary category',
  'Primary category',
  'Primary categories',
];

const TOOL_QUESTION_LABELS = [TALLY_QUESTION_LABELS.tools, 'Core Tool Stack', 'Tools'];

/**
 * Labels that mean one of the five live categories. The apply form still
 * offers "AI Advertising & Paid Media Ops", which is not in this map and is
 * stored on the submission instead of linked.
 */
const CATEGORY_ALIASES: Record<string, string> = {
  operations: 'operations-workflow-automation',
  'operations & workflow automation': 'operations-workflow-automation',
  sales: 'sales-lead-qualification',
  'sales & lead qualification': 'sales-lead-qualification',
  'customer support': 'customer-support-knowledge-base',
  'customer support & knowledge bases': 'customer-support-knowledge-base',
  marketing: 'marketing-programmatic-content',
  'marketing & programmatic content': 'marketing-programmatic-content',
  executive: 'executive-personal-ai-ops',
  'executive & personal ai ops': 'executive-personal-ai-ops',
};

export type MappedTallySubmission = {
  outcome: 'listing' | 'needs_review';
  listing?: PendingListing;
  flags: MappingFlags;
};

export function listingSlug(fullName: string, responseId: string): string {
  const base =
    fullName
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'specialist';
  const suffix =
    responseId
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '')
      .replace(/^-+|-+$/g, '')
      .slice(0, 12) || 'submission';
  return `${base}-${suffix}`;
}

export function normalizeLabel(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function mapTallySubmission(
  envelope: TallyEnvelope,
  catalog: { categories: CatalogEntry[]; tools: CatalogEntry[] },
  now: Date = new Date(),
): MappedTallySubmission {
  const fields = envelope.fields;
  const flags: MappingFlags = {
    unknownCategories: [],
    droppedCategories: [],
    unknownTools: [],
    notes: [],
  };

  const fullName = textAnswer(fields, TALLY_QUESTION_LABELS.fullName).replace(/\s+/g, ' ').trim();
  const email = textAnswer(fields, TALLY_QUESTION_LABELS.contactEmail).trim().toLowerCase();
  if (fullName.length < 2 || !isEmail(email)) {
    if (fullName.length < 2) flags.notes.push('Full name was missing, so no expert row was created.');
    if (!isEmail(email)) flags.notes.push('Business email was missing or invalid, so no expert row was created.');
    collectCategoryFlags(fields, catalog.categories, flags);
    collectToolFlags(fields, catalog.tools, flags);
    return { outcome: 'needs_review', flags };
  }

  const responseKey = envelope.responseId || envelope.submissionId || 'submission';
  const selectedCategories = choiceAnswers(fields, CATEGORY_QUESTION_LABELS);
  const resolvedCategories = resolveChoices(selectedCategories, catalog.categories, CATEGORY_ALIASES);
  flags.unknownCategories = resolvedCategories.unknown;
  const keptSlugs = trimCategorySlugs(
    resolvedCategories.matched.map((entry) => entry.slug),
    FREE_INCLUDED_CATEGORIES,
  );
  const kept = keptSlugs.flatMap((slug, index) => {
    const entry = resolvedCategories.matched.find((item) => item.slug === slug);
    return entry ? [{ ...entry, sortOrder: index }] : [];
  });
  flags.droppedCategories = resolvedCategories.matched
    .filter((entry) => !keptSlugs.includes(entry.slug))
    .map((entry) => entry.name);
  if (kept.length === 0) {
    flags.notes.push('No live category matched. The listing stays pending until one is assigned.');
  }

  const selectedTools = choiceAnswers(fields, TOOL_QUESTION_LABELS);
  const resolvedTools = resolveChoices(selectedTools, catalog.tools, {});
  flags.unknownTools = resolvedTools.unknown;

  const tagline = clampTagline(textAnswer(fields, TALLY_QUESTION_LABELS.tagline), flags.notes);
  const bioAnswer = textAnswer(fields, TALLY_QUESTION_LABELS.bio).trim();
  const bio = bioAnswer || 'Bio was not included in the Tally submission.';
  if (!bioAnswer) flags.notes.push('Bio was empty. Stored a placeholder.');

  const cityAnswer = textAnswer(fields, TALLY_QUESTION_LABELS.city).trim();
  const city = cityAnswer || 'Not provided';
  if (!cityAnswer) flags.notes.push('City was empty. Stored "Not provided".');

  const countryAnswer = textAnswer(fields, TALLY_QUESTION_LABELS.country).trim();
  const country = countryAnswer || 'United States';
  if (!countryAnswer) flags.notes.push('Country was empty. Stored "United States".');

  const timezoneAnswer = textAnswer(fields, TALLY_QUESTION_LABELS.timezone).trim();
  const timezone = timezoneAnswer || 'Not provided';
  if (!timezoneAnswer) flags.notes.push('Timezone was empty. Stored "Not provided".');

  const website = optionalUrl(textAnswer(fields, TALLY_QUESTION_LABELS.websiteUrl), 'Website URL', flags.notes);
  const booking = optionalUrl(textAnswer(fields, TALLY_QUESTION_LABELS.bookingUrl), 'Booking URL', flags.notes);
  const linkedin = optionalUrl(textAnswer(fields, TALLY_QUESTION_LABELS.linkedinUrl), 'LinkedIn Profile', flags.notes);
  const github = optionalUrl(textAnswer(fields, TALLY_QUESTION_LABELS.githubUrl), 'GitHub / Code Profile', flags.notes);
  const primaryEngagement = mapEngagement(
    choiceAnswers(fields, [TALLY_QUESTION_LABELS.primaryEngagement])[0] || '',
    flags.notes,
  );
  const startingBudget = mapBudget(choiceAnswers(fields, [TALLY_QUESTION_LABELS.startingBudget])[0] || '', flags.notes);
  const legalEntity = mapLegalEntity(choiceAnswers(fields, [TALLY_QUESTION_LABELS.legalEntityType])[0] || '', flags.notes);
  const caseStudy = mapCaseStudy(fields, flags.notes);
  const reviewNotes = reviewNoteText(flags);

  const listing: PendingListing = {
    expert: {
      slug: listingSlug(fullName, responseKey),
      full_name: fullName,
      professional_title: emptyToNull(textAnswer(fields, TALLY_QUESTION_LABELS.professionalTitle)),
      agency_name: emptyToNull(textAnswer(fields, TALLY_QUESTION_LABELS.agencyName)),
      tagline,
      bio,
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
      city,
      state_region: emptyToNull(textAnswer(fields, TALLY_QUESTION_LABELS.stateRegion)),
      country,
      timezone,
      website_url: website,
      github_url: github,
      linkedin_url: linkedin,
      booking_url: booking,
      primary_engagement: primaryEngagement,
      starting_budget: startingBudget,
      status: 'pending_review',
      is_verified: false,
      verified_case_study_count: 0,
      sponsor_rank: 0,
      listing_plan: 'unpaid',
      free_period_ends_at: freePeriodEndsAt(now),
      is_demo: false,
    },
    categories: kept,
    tools: resolvedTools.matched,
    caseStudy,
    application: {
      contact_email: email,
      legal_entity_type: legalEntity,
      portfolio_urls: splitList(textAnswer(fields, TALLY_QUESTION_LABELS.portfolioUrls)),
      references_provided: referencesProvided(fields),
      review_decision: 'unverified',
      review_notes: reviewNotes,
    },
  };

  return { outcome: 'listing', listing, flags };
}

function collectCategoryFlags(fields: TallyField[], categories: CatalogEntry[], flags: MappingFlags): void {
  const resolved = resolveChoices(choiceAnswers(fields, CATEGORY_QUESTION_LABELS), categories, CATEGORY_ALIASES);
  flags.unknownCategories = resolved.unknown;
  const kept = trimCategorySlugs(
    resolved.matched.map((entry) => entry.slug),
    FREE_INCLUDED_CATEGORIES,
  );
  flags.droppedCategories = resolved.matched.filter((entry) => !kept.includes(entry.slug)).map((entry) => entry.name);
}

function collectToolFlags(fields: TallyField[], tools: CatalogEntry[], flags: MappingFlags): void {
  flags.unknownTools = resolveChoices(choiceAnswers(fields, TOOL_QUESTION_LABELS), tools, {}).unknown;
}

function reviewNoteText(flags: MappingFlags): string | null {
  const lines: string[] = [];
  if (flags.unknownCategories.length > 0) {
    lines.push(`Unknown categories (not linked): ${flags.unknownCategories.join('; ')}`);
  }
  if (flags.droppedCategories.length > 0) {
    lines.push(`Beyond the free listing (kept the first live category only): ${flags.droppedCategories.join('; ')}`);
  }
  if (flags.unknownTools.length > 0) {
    lines.push(`Unknown tools (not linked): ${flags.unknownTools.join('; ')}`);
  }
  lines.push(...flags.notes);
  if (lines.length === 0) return null;
  return lines.join('\n').slice(0, 4000);
}

function mapCaseStudy(fields: TallyField[], notes: string[]): PendingListing['caseStudy'] {
  const title = textAnswer(fields, TALLY_QUESTION_LABELS.caseStudyTitle).trim();
  const industry = textAnswer(fields, TALLY_QUESTION_LABELS.clientIndustry).trim();
  const problem = textAnswer(fields, TALLY_QUESTION_LABELS.problemStatement).trim();
  const solution = textAnswer(fields, TALLY_QUESTION_LABELS.solutionArchitecture).trim();
  const hitl = textAnswer(fields, TALLY_QUESTION_LABELS.hitlOversightMechanism).trim();
  const safeguards = textAnswer(fields, TALLY_QUESTION_LABELS.failureSafeguards).trim();
  const roi = textAnswer(fields, TALLY_QUESTION_LABELS.outcomesRoi).trim();
  const demoRaw = textAnswer(fields, TALLY_QUESTION_LABELS.demoVideoUrl).trim();
  if (![title, industry, problem, solution, hitl, safeguards, roi, demoRaw].some(Boolean)) return null;
  const demo = demoRaw ? normalizeUrl(demoRaw) : null;
  if (demoRaw && !demo) notes.push('Demo video URL was not a valid http(s) URL and was left blank.');
  return {
    title: title || 'Example of past work',
    client_industry: industry,
    problem_statement: problem,
    solution_architecture: solution,
    hitl_oversight_mechanism: hitl,
    failure_safeguards: safeguards,
    outcomes_roi: roi,
    demo_video_url: demo,
    is_verification_evidence: false,
    reviewer_confirmed: false,
    is_featured: false,
  };
}

function resolveChoices(
  labels: string[],
  catalog: CatalogEntry[],
  aliases: Record<string, string>,
): { matched: CatalogEntry[]; unknown: string[] } {
  const matched: CatalogEntry[] = [];
  const unknown: string[] = [];
  for (const label of labels) {
    const entry = matchCatalog(label, catalog, aliases);
    if (!entry) {
      unknown.push(label);
      continue;
    }
    if (!matched.some((item) => item.slug === entry.slug)) matched.push(entry);
  }
  return { matched, unknown };
}

export function matchCatalog(
  label: string,
  catalog: CatalogEntry[],
  aliases: Record<string, string> = CATEGORY_ALIASES,
): CatalogEntry | null {
  const norm = normalizeLabel(label);
  if (!norm) return null;
  const exact = catalog.find((entry) => normalizeLabel(entry.name) === norm || entry.slug === norm);
  if (exact) return exact;
  const alias = aliases[norm];
  if (alias) {
    const aliased = catalog.find((entry) => entry.slug === alias);
    if (aliased) return aliased;
  }
  const prefixed = catalog.filter((entry) => {
    const name = normalizeLabel(entry.name);
    return name.startsWith(`${norm} `) || name.startsWith(`${norm}&`);
  });
  return prefixed.length === 1 ? prefixed[0] : null;
}

function textAnswer(fields: TallyField[], label: string): string {
  const field = fields.find((item) => normalizeLabel(item.label || '') === normalizeLabel(label));
  if (!field) return '';
  if (typeof field.value === 'string') return field.value.trim();
  if (typeof field.value === 'number') return String(field.value);
  const selected = selectedOptionTexts(field);
  return selected.join(', ');
}

function choiceAnswers(fields: TallyField[], labels: readonly string[]): string[] {
  for (const label of labels) {
    const parent = fields.find(
      (field) =>
        normalizeLabel(field.label || '') === normalizeLabel(label) &&
        Array.isArray(field.options) &&
        field.options.length > 0,
    );
    if (parent) return selectedOptionTexts(parent);
    const children = selectedChildOptions(fields, label);
    if (children.length > 0) return children;
    const plain = fields.find((field) => normalizeLabel(field.label || '') === normalizeLabel(label));
    if (plain) {
      const selected = selectedOptionTexts(plain);
      if (selected.length > 0) return selected;
    }
  }
  return [];
}

function selectedChildOptions(fields: TallyField[], label: string): string[] {
  const prefix = `${normalizeLabel(label)} (`;
  const selected: string[] = [];
  for (const field of fields) {
    const norm = normalizeLabel(field.label || '');
    if (!norm.startsWith(prefix) || !norm.endsWith(')')) continue;
    if (field.value !== true) continue;
    const raw = field.label || '';
    const open = raw.lastIndexOf('(');
    const close = raw.lastIndexOf(')');
    if (open >= 0 && close > open) selected.push(raw.slice(open + 1, close).trim());
  }
  return selected.filter(Boolean);
}

function selectedOptionTexts(field: TallyField): string[] {
  const options = field.options ?? [];
  const byId = new Map(options.flatMap((option) => (option.id ? [[option.id, option.text || '']] : [])));
  const value = field.value;
  const items = Array.isArray(value) ? value : value == null || value === false ? [] : [value];
  const texts: string[] = [];
  for (const item of items) {
    if (typeof item === 'string') {
      if (byId.has(item)) {
        const text = byId.get(item);
        if (text) texts.push(text);
        continue;
      }
      const asText = options.find((option) => normalizeLabel(option.text || '') === normalizeLabel(item));
      if (asText?.text) texts.push(asText.text);
      else if (options.length === 0 && item.trim()) texts.push(item.trim());
      continue;
    }
    if (item && typeof item === 'object' && 'text' in item && typeof item.text === 'string') texts.push(item.text);
  }
  return texts.map((text) => text.trim()).filter(Boolean);
}

function referencesProvided(fields: TallyField[]): boolean {
  const label = TALLY_QUESTION_LABELS.references;
  const parent = fields.find((field) => normalizeLabel(field.label || '') === normalizeLabel(label));
  if (parent?.value === true) return true;
  if (selectedOptionTexts(parent || {}).length > 0) return true;
  return selectedChildOptions(fields, label).length > 0;
}

function mapEngagement(value: string, notes: string[]): PendingListing['expert']['primary_engagement'] {
  const norm = normalizeLabel(value);
  if (norm.includes('monthly retainer')) return 'monthly_retainer';
  if (norm.includes('consulting audit')) return 'consulting_audit';
  if (norm.includes('hybrid')) return 'hybrid';
  if (norm.includes('fixed sprint')) return 'fixed_sprint';
  notes.push(norm ? `Engagement "${value}" was not recognized. Stored fixed_sprint.` : 'Engagement was empty. Stored fixed_sprint.');
  return 'fixed_sprint';
}

function mapBudget(value: string, notes: string[]): PendingListing['expert']['starting_budget'] {
  const norm = normalizeLabel(value);
  if (norm.includes('under')) return 'under_2500';
  if (/15,?000\+/.test(norm) || norm.includes('enterprise')) return '15000_plus';
  if (norm.includes('5,000') && norm.includes('15,000')) return '5000_to_15000';
  if (norm.includes('2,500') && norm.includes('5,000')) return '2500_to_5000';
  notes.push(norm ? `Budget "${value}" was not recognized. Stored 2500_to_5000.` : 'Budget was empty. Stored 2500_to_5000.');
  return '2500_to_5000';
}

function mapLegalEntity(value: string, notes: string[]): PendingListing['application']['legal_entity_type'] {
  const norm = normalizeLabel(value);
  if (!norm) return null;
  if (norm === 'llc') return 'LLC';
  if (norm === 's-corp' || norm === 's-corporation' || norm === 's corp' || norm === 's corporation' || norm === 'scorp') {
    return 'S-Corp';
  }
  if (norm.startsWith('sole prop')) return 'Sole Proprietorship';
  if (norm === 'other') return 'Other';
  notes.push(`Legal entity "${value}" is not one of LLC, S-Corp, Sole Proprietorship, or Other.`);
  return null;
}

function optionalUrl(value: string, label: string, notes: string[]): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const url = normalizeUrl(trimmed);
  if (!url) notes.push(`${label} was not a valid http(s) URL and was left blank.`);
  return url;
}

function normalizeUrl(value: string): string | null {
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (!url.hostname.includes('.')) return null;
    if (url.pathname === '/' && !url.search && !url.hash) return url.origin;
    return url.toString();
  } catch {
    return null;
  }
}

function clampTagline(value: string, notes: string[]): string {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (!trimmed) {
    notes.push('Tagline was empty. Stored a placeholder.');
    return 'Pending review.';
  }
  if (trimmed.length > 120) {
    notes.push('Tagline was longer than 120 characters and was shortened.');
    return trimmed.slice(0, 120);
  }
  return trimmed;
}

function emptyToNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed || null;
}

function splitList(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
