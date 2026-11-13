import {
  Category,
  Tool,
  Expert,
  Application,
  MatchRequest,
  DirectoryFilters,
  ListingStatus,
  VerificationStatus,
} from './types';
import {
  SEED_CATEGORIES,
  SEED_TOOLS,
  SEED_EXPERTS,
  SEED_APPLICATIONS,
} from './seed';
import { isSupabaseConfigured, isSupabaseServiceConfigured, supabase, getServiceSupabase } from './supabase';
import {
  expertApplicationSchema,
  ExpertApplicationInput,
  matchRequestSchema,
  MatchRequestInput,
  AdminReviewActionInput,
} from './validation';
import { requestProductionRebuild } from './deploy-hook';
import {
  compareDirectoryExperts,
  freePeriodEndsAt,
  isPublicDirectoryExpert,
  isRetiredExpertSlug,
} from './listing';

/**
 * Categories stay an inner join so a specialist with no category is omitted.
 * Tools are a left join: category rows alone are enough for a listing to render.
 */
export const EXPERT_PUBLIC_SELECT = `
  *,
  expert_categories!inner(category:categories(*)),
  expert_tools(tool:tools(*)),
  case_studies(*)
`;

// In-memory runtime store for Demo Mode
class InMemoryStore {
  categories: Category[] = [...SEED_CATEGORIES];
  tools: Tool[] = [...SEED_TOOLS];
  experts: Expert[] = [...SEED_EXPERTS];
  applications: Application[] = [...SEED_APPLICATIONS];
  matchRequests: MatchRequest[] = [
    {
      id: 'mr-1',
      created_at: '2026-03-12T15:20:00Z',
      status: 'new',
      requester_name: 'Rachel Sterling',
      requester_email: 'rachel@summitdistribution.example.com',
      company: 'Summit Distribution Group',
      need_description: 'We need to automate intake of 400 monthly freight invoices and vendor credit memos with guaranteed human exception review before NetSuite posting.',
      budget_range: '5000_to_15000',
      timeline: 'Within 2-3 weeks',
      preferred_categories: ['operations-workflow-automation'],
      internal_notes: 'High intent prospect; recommended Koby Oranski or Ikram Rana.',
    },
  ];
}

// Global persistent demo state in development (survives hot reloads)
const globalForStore = globalThis as unknown as { __hitlStore?: InMemoryStore };
const memStore = globalForStore.__hitlStore ?? new InMemoryStore();
// Always keep experts, categories, and tools synchronized with latest seed data
memStore.experts = [...SEED_EXPERTS];
memStore.categories = [...SEED_CATEGORIES];
memStore.tools = [...SEED_TOOLS];
if (process.env.NODE_ENV !== 'production') globalForStore.__hitlStore = memStore;

export function isDemoMode(): boolean {
  return !isSupabaseConfigured;
}

export function verifyAdminToken(token: string): boolean {
  const expectedToken = process.env.ADMIN_REVIEW_TOKEN || 'hitl-admin-secret-2026';
  return Boolean(token && token.trim() === expectedToken.trim());
}

// ----------------------------------------------------------------------------
// CATEGORIES & TOOLS
// ----------------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('categories').select('*');
    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  }
  // Compute dynamic counts in demo mode
  return memStore.categories.map((cat) => {
    const count = memStore.experts.filter(
      (e) => e.status === 'published' && e.categories.some((c) => c.slug === cat.slug)
    ).length;
    return { ...cat, expert_count: count };
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getTools(): Promise<Tool[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('tools').select('*');
    if (!error && data && data.length > 0) {
      return data as Tool[];
    }
  }
  return memStore.tools;
}

// ----------------------------------------------------------------------------
// EXPERTS DIRECTORY
// ----------------------------------------------------------------------------
export async function getExperts(filters?: DirectoryFilters): Promise<Expert[]> {
  // If Supabase is configured and not running in demo fallback
  if (isSupabaseConfigured && supabase) {
    try {
      // Membership matches isPublicDirectoryExpert: published, not demo,
      // and at least one category. Tools are optional.
      let query = supabase
        .from('experts')
        .select(EXPERT_PUBLIC_SELECT)
        .eq('status', 'published')
        .eq('is_demo', false)
        .order('sponsor_rank', { ascending: false })
        .order('is_verified', { ascending: false });

      if (filters?.budget && filters.budget !== 'all') {
        query = query.eq('starting_budget', filters.budget);
      }
      if (filters?.engagement && filters.engagement !== 'all') {
        query = query.eq('primary_engagement', filters.engagement);
      }
      if (filters?.verifiedOnly) {
        query = query.eq('is_verified', true);
      }

      const { data, error } = await query;
      if (!error && data) {
        // Transform Supabase structure
        let list: Expert[] = data
          .map((row: any) => ({
            ...row,
            categories: (row.expert_categories || []).map((ec: any) => ec.category).filter(Boolean),
            tools: (row.expert_tools || []).map((et: any) => et.tool).filter(Boolean),
            case_studies: row.case_studies || [],
          }))
          .filter((expert) => isPublicDirectoryExpert(expert));

        if (filters?.category) {
          list = list.filter((e) => e.categories.some((c) => c.slug === filters.category));
        }
        if (filters?.tool) {
          list = list.filter((e) => (e.tools ?? []).some((t) => t.slug === filters.tool));
        }
        if (filters?.query) {
          const q = filters.query.toLowerCase();
          list = list.filter(
            (e) =>
              e.full_name.toLowerCase().includes(q) ||
              e.tagline.toLowerCase().includes(q) ||
              e.bio.toLowerCase().includes(q) ||
              e.city.toLowerCase().includes(q) ||
              (e.tools ?? []).some((t) => t.name.toLowerCase().includes(q))
          );
        }
        return list.sort(compareDirectoryExperts);
      }
    } catch (err) {
      console.warn('Supabase getExperts fallback to memory store', err);
    }
  }

  // Demo mode uses the same public-directory predicate as the Supabase read.
  let list = memStore.experts.filter((expert) => isPublicDirectoryExpert(expert));

  if (filters?.category) {
    list = list.filter((e) => e.categories.some((c) => c.slug === filters.category));
  }
  if (filters?.tool) {
    list = list.filter((e) => (e.tools ?? []).some((t) => t.slug === filters.tool));
  }
  if (filters?.budget && filters.budget !== 'all') {
    list = list.filter((e) => e.starting_budget === filters.budget);
  }
  if (filters?.engagement && filters.engagement !== 'all') {
    list = list.filter((e) => e.primary_engagement === filters.engagement);
  }
  if (filters?.verifiedOnly) {
    list = list.filter((e) => e.is_verified);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.full_name.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q) ||
        e.bio.toLowerCase().includes(q) ||
        (e.agency_name && e.agency_name.toLowerCase().includes(q)) ||
        e.city.toLowerCase().includes(q) ||
        e.categories.some((c) => c.name.toLowerCase().includes(q)) ||
        (e.tools ?? []).some((t) => t.name.toLowerCase().includes(q))
    );
  }

  return list.sort(compareDirectoryExperts);
}

export async function getFeaturedExperts(): Promise<Expert[]> {
  const all = await getExperts();
  return all.slice(0, 6);
}

export async function getExpertBySlug(slug: string): Promise<Expert | null> {
  if (isRetiredExpertSlug(slug)) return null;
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select(EXPERT_PUBLIC_SELECT)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (!error && data) {
        return {
          ...data,
          categories: (data.expert_categories || []).map((ec: any) => ec.category).filter(Boolean),
          tools: (data.expert_tools || []).map((et: any) => et.tool).filter(Boolean),
          case_studies: data.case_studies || [],
        } as Expert;
      }
    } catch (err) {
      console.warn('Supabase getExpertBySlug error', err);
    }
  }

  return memStore.experts.find((e) => e.slug === slug && e.status === 'published') || null;
}

// ----------------------------------------------------------------------------
// EXPERT APPLICATION INTAKE
// ----------------------------------------------------------------------------
export async function createExpertApplication(input: ExpertApplicationInput): Promise<{
  success: boolean;
  expertId?: string;
  applicationId?: string;
  error?: string;
}> {
  const validation = expertApplicationSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues?.[0]?.message || 'Invalid application data',
    };
  }

  const data = validation.data;
  const baseSlug = data.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

  const expertId = `exp-${Date.now()}`;
  const applicationId = `app-${Date.now()}`;
  const freePeriodEnds = freePeriodEndsAt();

  // Preserve the order the applicant chose. The free-listing cap is already
  // enforced by expertApplicationSchema.
  const categories = data.categories
    .map((slug) => memStore.categories.find((category) => category.slug === slug))
    .filter((category): category is Category => Boolean(category));
  const tools = data.tools
    .map((slug) => memStore.tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is Tool => Boolean(tool));

  const text = (value?: string) => value?.trim() || '';
  const caseStudyParts = [
    text(data.caseStudyTitle),
    text(data.clientIndustry),
    text(data.problemStatement),
    text(data.solutionArchitecture),
    text(data.hitlOversightMechanism),
    text(data.failureSafeguards),
    text(data.outcomesRoi),
    text(data.demoVideoUrl),
  ];
  const newCaseStudy = caseStudyParts.some(Boolean)
    ? {
        id: `cs-${Date.now()}`,
        expert_id: expertId,
        title: text(data.caseStudyTitle) || 'Example of past work',
        client_industry: text(data.clientIndustry),
        problem_statement: text(data.problemStatement),
        solution_architecture: text(data.solutionArchitecture),
        hitl_oversight_mechanism: text(data.hitlOversightMechanism),
        failure_safeguards: text(data.failureSafeguards),
        outcomes_roi: text(data.outcomesRoi),
        demo_video_url: text(data.demoVideoUrl) || undefined,
        is_verification_evidence: false,
        reviewer_confirmed: false,
        is_featured: false,
        created_at: new Date().toISOString(),
      }
    : null;

  const newExpert: Expert = {
    id: expertId,
    slug,
    full_name: data.fullName,
    professional_title: data.professionalTitle,
    agency_name: data.agencyName || undefined,
    tagline: data.tagline,
    bio: data.bio,
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.fullName)}`,
    city: data.city,
    state_region: data.stateRegion || undefined,
    country: data.country,
    timezone: data.timezone,
    website_url: data.websiteUrl || undefined,
    github_url: data.githubUrl || undefined,
    linkedin_url: data.linkedinUrl || undefined,
    booking_url: data.bookingUrl || undefined,
    primary_engagement: data.primaryEngagement,
    starting_budget: data.startingBudget,
    status: 'pending_review',
    is_verified: false,
    verified_at: null,
    verified_case_study_count: 0,
    sponsor_rank: 0,
    listing_plan: 'unpaid',
    free_period_ends_at: freePeriodEnds,
    is_demo: false,
    categories,
    tools,
    case_studies: newCaseStudy ? [newCaseStudy] : [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const portfolioArray = data.portfolioUrls
    ? data.portfolioUrls.split('\n').map((u) => u.trim()).filter(Boolean)
    : [];

  const newApplication: Application = {
    id: applicationId,
    expert_id: expertId,
    contact_email: data.contactEmail,
    legal_entity_type: data.legalEntityType,
    portfolio_urls: portfolioArray,
    references_provided: data.referencesProvided,
    review_decision: 'unverified',
    created_at: new Date().toISOString(),
    expert: newExpert,
  };

  if (isSupabaseServiceConfigured) {
    const adminClient = getServiceSupabase();
    if (adminClient) {
      try {
        // Insert public expert row
        const expertRow = {
          id: expertId,
          slug,
          full_name: data.fullName,
          professional_title: data.professionalTitle,
          agency_name: data.agencyName,
          tagline: data.tagline,
          bio: data.bio,
          avatar_url: newExpert.avatar_url,
          city: data.city,
          state_region: data.stateRegion,
          country: data.country,
          timezone: data.timezone,
          website_url: data.websiteUrl,
          github_url: data.githubUrl,
          linkedin_url: data.linkedinUrl,
          booking_url: data.bookingUrl,
          primary_engagement: data.primaryEngagement,
          starting_budget: data.startingBudget,
          status: 'pending_review',
          is_verified: false,
          verified_case_study_count: 0,
          sponsor_rank: 0,
          listing_plan: 'unpaid',
          free_period_ends_at: freePeriodEnds,
          is_demo: false,
        };

        let { error: expErr } = await adminClient.from('experts').insert(expertRow);
        if (expErr && /listing_plan|free_period_ends_at/i.test(String(expErr.message || expErr))) {
          const legacyRow = Object.fromEntries(
            Object.entries(expertRow).filter(
              ([key]) => key !== 'listing_plan' && key !== 'free_period_ends_at',
            ),
          );
          const retry = await adminClient.from('experts').insert(legacyRow);
          expErr = retry.error;
        }

        if (expErr) throw expErr;

        const categorySlugs = categories.map((category) => category.slug);
        if (categorySlugs.length > 0) {
          const { data: categoryRows, error: categoryLookupError } = await adminClient
            .from('categories')
            .select('id, slug')
            .in('slug', categorySlugs);
          if (categoryLookupError) throw categoryLookupError;
          const categoryIdBySlug = new Map(
            (categoryRows ?? []).map((row) => [String(row.slug), String(row.id)]),
          );
          const categoryLinks = categorySlugs.flatMap((slug, index) => {
            const categoryId = categoryIdBySlug.get(slug);
            return categoryId ? [{ expert_id: expertId, category_id: categoryId, sort_order: index }] : [];
          });
          if (categoryLinks.length > 0) {
            let { error: categoryLinkError } = await adminClient.from('expert_categories').insert(categoryLinks);
            if (categoryLinkError && /sort_order/i.test(String(categoryLinkError.message || categoryLinkError))) {
              const legacyLinks = categoryLinks.map((link) => ({
                expert_id: link.expert_id,
                category_id: link.category_id,
              }));
              const retry = await adminClient.from('expert_categories').insert(legacyLinks);
              categoryLinkError = retry.error;
            }
            if (categoryLinkError) throw categoryLinkError;
          }
        }

        const toolSlugs = tools.map((tool) => tool.slug);
        if (toolSlugs.length > 0) {
          const { data: toolRows, error: toolLookupError } = await adminClient
            .from('tools')
            .select('id, slug')
            .in('slug', toolSlugs);
          if (toolLookupError) throw toolLookupError;
          const toolIdBySlug = new Map((toolRows ?? []).map((row) => [String(row.slug), String(row.id)]));
          const toolLinks = toolSlugs.flatMap((slug) => {
            const toolId = toolIdBySlug.get(slug);
            return toolId ? [{ expert_id: expertId, tool_id: toolId }] : [];
          });
          if (toolLinks.length > 0) {
            const { error: toolLinkError } = await adminClient.from('expert_tools').insert(toolLinks);
            if (toolLinkError) throw toolLinkError;
          }
        }

        if (newCaseStudy) {
          await adminClient.from('case_studies').insert(newCaseStudy);
        }

        // Insert private application
        await adminClient.from('applications').insert({
          id: applicationId,
          expert_id: expertId,
          contact_email: data.contactEmail,
          legal_entity_type: data.legalEntityType,
          portfolio_urls: portfolioArray,
          references_provided: data.referencesProvided,
          review_decision: 'unverified',
        });

        return { success: true, expertId, applicationId };
      } catch (err: any) {
        console.error('Supabase application submission error', err);
        return { success: false, error: err.message || 'Failed to persist application' };
      }
    }
  }

  // Fallback / Demo mode store update
  memStore.experts.unshift(newExpert);
  memStore.applications.unshift(newApplication);

  return { success: true, expertId, applicationId };
}

// ----------------------------------------------------------------------------
// FOUNDER MATCHMAKING INTAKE
// ----------------------------------------------------------------------------
export async function createMatchRequest(input: MatchRequestInput): Promise<{
  success: boolean;
  matchId?: string;
  error?: string;
}> {
  const validation = matchRequestSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues?.[0]?.message || 'Invalid matchmaking data',
    };
  }

  const data = validation.data;
  const matchId = `mr-${Date.now()}`;

  const newRequest: MatchRequest = {
    id: matchId,
    created_at: new Date().toISOString(),
    status: 'new',
    requester_name: data.requesterName,
    requester_email: data.requesterEmail,
    company: data.company || undefined,
    need_description: data.needDescription,
    budget_range: data.budgetRange,
    timeline: data.timeline,
    preferred_categories: data.preferredCategories,
  };

  if (isSupabaseServiceConfigured) {
    const adminClient = getServiceSupabase();
    if (adminClient) {
      try {
        const { error } = await adminClient.from('match_requests').insert({
          id: matchId,
          requester_name: data.requesterName,
          requester_email: data.requesterEmail,
          company: data.company,
          need_description: data.needDescription,
          budget_range: data.budgetRange,
          timeline: data.timeline,
          preferred_categories: data.preferredCategories,
          status: 'new',
        });
        if (error) throw error;
        return { success: true, matchId };
      } catch (err: any) {
        console.error('Supabase match request error', err);
        return { success: false, error: err.message };
      }
    }
  }

  memStore.matchRequests.unshift(newRequest);
  return { success: true, matchId };
}

// ----------------------------------------------------------------------------
// ADMIN REVIEW QUEUE
// ----------------------------------------------------------------------------
export async function getAdminQueue(token: string): Promise<{
  success: boolean;
  applications?: Application[];
  experts?: Expert[];
  matchRequests?: MatchRequest[];
  error?: string;
}> {
  if (!verifyAdminToken(token)) {
    return { success: false, error: 'Unauthorized: Invalid admin review token' };
  }

  if (isSupabaseServiceConfigured) {
    const adminClient = getServiceSupabase();
    if (adminClient) {
      try {
        const { data: apps } = await adminClient.from('applications').select('*, expert:experts(*)');
        const { data: exps } = await adminClient.from('experts').select('*, case_studies(*)');
        const { data: matches } = await adminClient.from('match_requests').select('*').order('created_at', { ascending: false });

        return {
          success: true,
          applications: (apps || []) as Application[],
          experts: (exps || []) as Expert[],
          matchRequests: (matches || []) as MatchRequest[],
        };
      } catch (err: any) {
        console.error('Supabase admin fetch error', err);
      }
    }
  }

  return {
    success: true,
    applications: memStore.applications,
    experts: memStore.experts,
    matchRequests: memStore.matchRequests,
  };
}

export async function updateExpertReviewStatus(
  action: AdminReviewActionInput
): Promise<{ success: boolean; error?: string; updatedExpert?: Expert }> {
  if (!verifyAdminToken(action.token)) {
    return { success: false, error: 'Unauthorized: Invalid admin token' };
  }

  const { expertId, status, verificationStatus, sponsorRank, reviewNotes, reviewedBy, confirmedCaseStudyIds } = action;

  // Find in memory
  const expert = memStore.experts.find((e) => e.id === expertId);
  if (!expert) {
    return { success: false, error: 'Expert not found' };
  }

  // Update confirmed case studies
  if (confirmedCaseStudyIds) {
    expert.case_studies.forEach((cs) => {
      cs.reviewer_confirmed = confirmedCaseStudyIds.includes(cs.id);
    });
    expert.verified_case_study_count = expert.case_studies.filter((cs) => cs.reviewer_confirmed).length;
  }

  // Case studies are optional and are not a verification gate.
  // References remain required when an application record exists.
  // Sponsor rank / payment never sets is_verified.
  if (verificationStatus === 'verified') {
    const applicationForGate = memStore.applications.find((a) => a.expert_id === expertId);
    if (applicationForGate && !applicationForGate.references_provided) {
      return {
        success: false,
        error:
          'Listing requires at least one reference we can contact. Case studies are not required, and payment does not change that requirement.',
      };
    }
    expert.is_verified = true;
    expert.verified_at = new Date().toISOString();
  } else if (verificationStatus) {
    expert.is_verified = false;
  }

  if (status) {
    expert.status = status;
  }

  if (typeof sponsorRank === 'number') {
    expert.sponsor_rank = sponsorRank;
  }

  expert.updated_at = new Date().toISOString();

  // Update application record
  const application = memStore.applications.find((a) => a.expert_id === expertId);
  if (application) {
    application.reviewed_by = reviewedBy;
    application.review_notes = reviewNotes;
    application.review_decision = verificationStatus || application.review_decision;
    application.reviewed_at = new Date().toISOString();
  }

  // Publishing or changing verification changes what the static site shows.
  // Notes-only reviews do not. The hook no-ops when CLOUDFLARE_DEPLOY_HOOK_URL is unset.
  if (status !== undefined || verificationStatus !== undefined) {
    const reason =
      status === 'published' ? 'admin_publish' : verificationStatus === 'verified' ? 'admin_approve' : 'admin_listing';
    await requestProductionRebuild(reason);
  }

  return { success: true, updatedExpert: expert };
}
