import type { BudgetTier, EngagementModel } from '../types';

/** Public id of the apply form embedded on findaipros.com/apply. */
export const APPLY_FORM_ID = 'Nq5NDp';

/**
 * Question labels on https://tally.so/r/Nq5NDp as of the webhook mapping.
 * Matching is case-insensitive and collapses whitespace. A few shorter
 * titles are also accepted so the category question can be edited to the
 * free-listing rule without a code change.
 */
export const TALLY_QUESTION_LABELS = {
  fullName: 'Full Name',
  professionalTitle: 'Professional Title',
  agencyName: 'Agency or Firm Name',
  tagline: 'Tagline',
  bio: 'Bio & Background',
  city: 'City',
  stateRegion: 'State / Region',
  country: 'Country',
  timezone: 'Timezone',
  websiteUrl: 'Website URL',
  bookingUrl: 'Booking URL (Calendly, Cal.com)',
  linkedinUrl: 'LinkedIn Profile',
  githubUrl: 'GitHub / Code Profile',
  primaryEngagement: 'Primary Engagement Model',
  startingBudget: 'Starting Project Budget',
  categories: 'Select 1 to 3 Primary Categories',
  tools: 'Core Tool Stack (Select all that apply)',
  contactEmail: 'Business Contact Email',
  legalEntityType: 'Legal Entity Type',
  portfolioUrls: 'Private Portfolio or Code Repo URLs',
  references: 'Client References',
  caseStudyTitle: 'Case Study Title',
  clientIndustry: 'Client Industry',
  problemStatement: 'Client Bottleneck / Problem Statement',
  solutionArchitecture: 'Solution Architecture & Flow',
  hitlOversightMechanism:
    'What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?',
  failureSafeguards: 'Failure Safeguards & Circuit Breakers',
  outcomesRoi: 'Quantified ROI & Business Outcome',
  demoVideoUrl: 'Loom Walkthrough or Demo Video URL',
} as const;

export type CatalogEntry = {
  id: string;
  slug: string;
  name: string;
};

export type TallyField = {
  key?: string;
  label?: string | null;
  type?: string;
  value?: unknown;
  options?: { id?: string; text?: string }[];
};

export type TallyEnvelope = {
  eventId: string | null;
  eventType: string | null;
  formId: string | null;
  responseId: string | null;
  submissionId: string | null;
  fields: TallyField[];
};

export type MappingFlags = {
  unknownCategories: string[];
  /** Known categories past the free-listing cap, in the order the applicant chose. */
  droppedCategories: string[];
  unknownTools: string[];
  notes: string[];
};

export type ExpertInsertRow = {
  slug: string;
  full_name: string;
  professional_title: string | null;
  agency_name: string | null;
  tagline: string;
  bio: string;
  avatar_url: string;
  city: string;
  state_region: string | null;
  country: string;
  timezone: string;
  website_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  booking_url: string | null;
  primary_engagement: EngagementModel;
  starting_budget: BudgetTier;
  status: 'pending_review';
  is_verified: false;
  verified_case_study_count: 0;
  sponsor_rank: 0;
  listing_plan: 'unpaid';
  free_period_ends_at: string;
  is_demo: false;
};

export type ApplicationInsertRow = {
  contact_email: string;
  legal_entity_type: 'LLC' | 'S-Corp' | 'Sole Proprietorship' | 'Other' | null;
  portfolio_urls: string[];
  references_provided: boolean;
  review_decision: 'unverified';
  review_notes: string | null;
};

export type CaseStudyInsertRow = {
  title: string;
  client_industry: string;
  problem_statement: string;
  solution_architecture: string;
  hitl_oversight_mechanism: string;
  failure_safeguards: string;
  outcomes_roi: string;
  demo_video_url: string | null;
  is_verification_evidence: false;
  reviewer_confirmed: false;
  is_featured: false;
};

export type PendingListing = {
  expert: ExpertInsertRow;
  categories: { id: string; slug: string; name: string; sortOrder: number }[];
  tools: { id: string; slug: string; name: string }[];
  caseStudy: CaseStudyInsertRow | null;
  application: ApplicationInsertRow;
};

export type TallySaveOutcome = 'listing' | 'needs_review' | 'ignored';

export type TallySaveInput = {
  responseId: string;
  submissionId: string | null;
  eventId: string | null;
  formId: string | null;
  payload: unknown;
  outcome: TallySaveOutcome;
  listing?: PendingListing;
  flags: MappingFlags;
};

export type TallySaveResult = {
  outcome: 'created' | 'duplicate' | 'needs_review' | 'ignored';
  expertId: string | null;
  applicationId: string | null;
};

export type TallyIntakeStore = {
  listCategories(): Promise<CatalogEntry[]>;
  listTools(): Promise<CatalogEntry[]>;
  save(input: TallySaveInput): Promise<TallySaveResult>;
};

export function isTerminalTallyStatus(status: string | null | undefined): boolean {
  return status === 'stored' || status === 'needs_review' || status === 'ignored';
}

export class TallyStoreError extends Error {
  constructor(
    readonly code: 'unconfigured' | 'missing_table',
    message: string,
  ) {
    super(message);
    this.name = 'TallyStoreError';
  }
}
