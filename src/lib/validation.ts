import { z } from 'zod';

export const engagementModelEnum = z.enum([
  'fixed_sprint',
  'monthly_retainer',
  'consulting_audit',
  'hybrid',
]);

export const budgetTierEnum = z.enum([
  'under_2500',
  '2500_to_5000',
  '5000_to_15000',
  '15000_plus',
]);

export const legalEntityEnum = z.enum([
  'LLC',
  'S-Corp',
  'Sole Proprietorship',
  'Other',
]);

export const listingStatusEnum = z.enum([
  'pending_review',
  'published',
  'rejected',
  'archived',
]);

export const verificationStatusEnum = z.enum([
  'unverified',
  'in_review',
  'verified',
  'rejected',
]);

export const matchRequestStatusEnum = z.enum([
  'new',
  'reviewing',
  'introduced',
  'closed',
]);

// Expert Application Intake Schema
export const expertApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  professionalTitle: z.string().min(2, 'Professional title is required'),
  agencyName: z.string().optional(),
  tagline: z
    .string()
    .min(10, 'Tagline must be at least 10 characters')
    .max(120, 'Tagline cannot exceed 120 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters to demonstrate depth'),
  city: z.string().min(2, 'City is required'),
  stateRegion: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  timezone: z.string().min(2, 'Timezone is required'),
  websiteUrl: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  githubUrl: z.string().url('Must be a valid GitHub URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Must be a valid LinkedIn URL').or(z.literal('')).optional(),
  bookingUrl: z.string().url('Must be a valid booking link (Cal.com, Calendly, etc.)').or(z.literal('')).optional(),
  
  primaryEngagement: engagementModelEnum,
  startingBudget: budgetTierEnum,

  // Rule: Max 3 categories per expert, at least 1
  categories: z
    .array(z.string())
    .min(1, 'Please select at least 1 primary category')
    .max(3, 'Rule: You may select at most 3 core categories to preserve specialist focus'),

  // Tools: at least 1 tool selected
  tools: z.array(z.string()).min(1, 'Please select at least 1 primary tool or technology'),

  // Private verification & contact data
  contactEmail: z.string().email('Please enter a valid business contact email'),
  legalEntityType: legalEntityEnum,
  portfolioUrls: z.string().optional(), // newline-separated or comma
  referencesProvided: z.boolean().default(false),

  // Mandatory Primary Case Study with HITL Safeguards
  caseStudyTitle: z.string().min(5, 'Case study title is required'),
  clientIndustry: z.string().min(2, 'Client industry is required'),
  problemStatement: z.string().min(30, 'Problem statement must be at least 30 characters'),
  solutionArchitecture: z.string().min(30, 'Solution architecture must be at least 30 characters'),
  hitlOversightMechanism: z
    .string()
    .min(
      40,
      'The HITL oversight mechanism is mandatory (min 40 characters). Explain how humans intervene when confidence drops or edge cases arise.'
    ),
  failureSafeguards: z
    .string()
    .min(
      25,
      'Failure safeguards are required (min 25 characters). Mention retry caps, alerts, quarantine queues, or circuit breakers.'
    ),
  outcomesRoi: z.string().min(20, 'Outcomes & ROI are required (e.g. hours saved, error drop, lead conversion lift)'),
  demoVideoUrl: z.string().url('Must be a valid URL (Loom, YouTube, etc.)').or(z.literal('')).optional(),
});

export type ExpertApplicationInput = z.infer<typeof expertApplicationSchema>;

// Founder Matchmaking Intake Schema
export const matchRequestSchema = z.object({
  requesterName: z.string().min(2, 'Your name is required'),
  requesterEmail: z.string().email('A valid contact email is required'),
  company: z.string().optional(),
  needDescription: z
    .string()
    .min(25, 'Please provide at least 25 characters describing your operational challenge or workflow need'),
  budgetRange: budgetTierEnum.optional(),
  timeline: z.string().min(2, 'Please indicate your expected timeline'),
  preferredCategories: z.array(z.string()).default([]),
});

export type MatchRequestInput = z.infer<typeof matchRequestSchema>;

// Admin Token & Review Actions
export const adminReviewActionSchema = z.object({
  token: z.string().min(1, 'Admin token is required'),
  expertId: z.string().min(1, 'Expert ID is required'),
  status: listingStatusEnum.optional(),
  verificationStatus: verificationStatusEnum.optional(),
  sponsorRank: z.number().int().min(0).optional(),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().min(2, 'Reviewer name or identifier is required'),
  confirmedCaseStudyIds: z.array(z.string()).optional(),
});

export type AdminReviewActionInput = z.infer<typeof adminReviewActionSchema>;
