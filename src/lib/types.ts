export type ListingStatus = 'pending_review' | 'published' | 'rejected' | 'archived';
export type VerificationStatus = 'unverified' | 'in_review' | 'verified' | 'rejected';
export type EngagementModel = 'fixed_sprint' | 'monthly_retainer' | 'consulting_audit' | 'hybrid';
export type BudgetTier = 'under_2500' | '2500_to_5000' | '5000_to_15000' | '15000_plus';
export type MatchRequestStatus = 'new' | 'reviewing' | 'introduced' | 'closed';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  created_at?: string;
  expert_count?: number;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: 'Automation Engine' | 'LLM Provider' | 'Voice AI' | 'CRM' | 'Database' | 'Vector DB' | 'Support' | 'Dev Tools';
  logo_url?: string;
  created_at?: string;
}

export interface CaseStudy {
  id: string;
  expert_id: string;
  created_at?: string;
  title: string;
  client_industry: string;
  problem_statement: string;
  solution_architecture: string;
  solutionArchitecture?: string;
  // Mandatory HITL oversight fields
  hitl_oversight_mechanism: string;
  failure_safeguards: string;
  outcomes_roi: string;
  demo_video_url?: string;
  is_verification_evidence?: boolean;
  reviewer_confirmed?: boolean;
  is_featured?: boolean;
}

export interface Expert {
  id: string;
  created_at?: string;
  updated_at?: string;
  slug: string;
  full_name: string;
  professional_title: string;
  agency_name?: string;
  tagline: string;
  bio: string;
  avatar_url: string;
  city: string;
  state_region?: string;
  country: string;
  timezone: string;
  website_url?: string;
  github_url?: string;
  linkedin_url?: string;
  booking_url?: string;
  primary_engagement: EngagementModel;
  starting_budget: BudgetTier;
  status: ListingStatus;
  is_verified: boolean;
  verified_at?: string | null;
  verified_case_study_count: number;
  sponsor_rank: number;
  is_demo: boolean;
  // Associated relations
  categories: Category[];
  tools: Tool[];
  case_studies: CaseStudy[];
}

export interface Application {
  id: string;
  expert_id: string;
  created_at?: string;
  contact_email: string;
  legal_entity_type?: 'LLC' | 'S-Corp' | 'Sole Proprietorship' | 'Other';
  portfolio_urls?: string[];
  case_study_urls?: string[];
  references_provided?: boolean;
  reviewed_by?: string;
  review_notes?: string;
  review_decision?: VerificationStatus;
  reviewed_at?: string;
  // Joined expert details for admin view
  expert?: Expert;
}

export interface MatchRequest {
  id: string;
  created_at?: string;
  status: MatchRequestStatus;
  requester_name: string;
  requester_email: string;
  company?: string;
  need_description: string;
  budget_range?: BudgetTier;
  timeline?: string;
  preferred_categories?: string[];
  internal_notes?: string;
}

export interface DirectoryFilters {
  category?: string;
  tool?: string;
  budget?: BudgetTier | 'all';
  engagement?: EngagementModel | 'all';
  verifiedOnly?: boolean;
  query?: string;
}
