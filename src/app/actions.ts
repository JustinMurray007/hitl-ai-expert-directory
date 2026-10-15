'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  createExpertApplication,
  createMatchRequest,
  updateExpertReviewStatus,
  verifyAdminToken,
} from '@/lib/store';
import {
  expertApplicationSchema,
  matchRequestSchema,
  AdminReviewActionInput,
} from '@/lib/validation';

export async function submitExpertApplicationAction(formData: FormData) {
  try {
    const rawCategories = formData.getAll('categories').map(String);
    const rawTools = formData.getAll('tools').map(String);

    const rawData = {
      fullName: formData.get('fullName'),
      professionalTitle: formData.get('professionalTitle'),
      agencyName: formData.get('agencyName') || undefined,
      tagline: formData.get('tagline'),
      bio: formData.get('bio'),
      city: formData.get('city'),
      stateRegion: formData.get('stateRegion') || undefined,
      country: formData.get('country'),
      timezone: formData.get('timezone'),
      websiteUrl: formData.get('websiteUrl') || '',
      githubUrl: formData.get('githubUrl') || '',
      linkedinUrl: formData.get('linkedinUrl') || '',
      bookingUrl: formData.get('bookingUrl') || '',
      primaryEngagement: formData.get('primaryEngagement'),
      startingBudget: formData.get('startingBudget'),
      categories: rawCategories,
      tools: rawTools,
      contactEmail: formData.get('contactEmail'),
      legalEntityType: formData.get('legalEntityType'),
      portfolioUrls: formData.get('portfolioUrls') || '',
      referencesProvided: formData.get('referencesProvided') === 'on' || formData.get('referencesProvided') === 'true',
      caseStudyTitle: formData.get('caseStudyTitle'),
      clientIndustry: formData.get('clientIndustry'),
      problemStatement: formData.get('problemStatement'),
      solutionArchitecture: formData.get('solutionArchitecture'),
      hitlOversightMechanism: formData.get('hitlOversightMechanism'),
      failureSafeguards: formData.get('failureSafeguards'),
      outcomesRoi: formData.get('outcomesRoi'),
      demoVideoUrl: formData.get('demoVideoUrl') || '',
    };

    const res = await createExpertApplication(rawData as any);
    if (!res.success) {
      return { success: false, error: res.error };
    }

    revalidatePath('/admin');
    return { success: true, expertId: res.expertId, applicationId: res.applicationId };
  } catch (err: any) {
    return { success: false, error: err.message || 'Submission failed' };
  }
}

export async function submitMatchRequestAction(formData: FormData) {
  try {
    const rawPreferred = formData.getAll('preferredCategories').map(String);
    const rawData = {
      requesterName: formData.get('requesterName'),
      requesterEmail: formData.get('requesterEmail'),
      company: formData.get('company') || undefined,
      needDescription: formData.get('needDescription'),
      budgetRange: formData.get('budgetRange') || undefined,
      timeline: formData.get('timeline'),
      preferredCategories: rawPreferred,
    };

    const res = await createMatchRequest(rawData as any);
    if (!res.success) {
      return { success: false, error: res.error };
    }

    revalidatePath('/admin');
    return { success: true, matchId: res.matchId };
  } catch (err: any) {
    return { success: false, error: err.message || 'Match request failed' };
  }
}

export async function adminLoginAction(formData: FormData) {
  const token = (formData.get('token') as string) || '';
  if (!verifyAdminToken(token)) {
    return { success: false, error: 'Invalid admin token' };
  }

  const cookieStore = await cookies();
  cookieStore.set('hitl_admin_token', token.trim(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('hitl_admin_token');
  revalidatePath('/admin');
  return { success: true };
}

export async function executeAdminReviewAction(payload: AdminReviewActionInput) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('hitl_admin_token')?.value;
  const tokenToUse = payload.token || sessionToken;

  if (!tokenToUse || !verifyAdminToken(tokenToUse)) {
    return { success: false, error: 'Unauthorized: Invalid admin review session' };
  }

  const result = await updateExpertReviewStatus({
    ...payload,
    token: tokenToUse,
  });

  if (result.success) {
    revalidatePath('/admin');
    revalidatePath('/experts');
    revalidatePath('/');
  }

  return result;
}
