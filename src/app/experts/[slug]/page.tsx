import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getExpertBySlug, getExperts } from '@/lib/store';
import { VerifiedBadge, SponsorBadge, ToolBadge, BudgetBadge, EngagementBadge, CategoryBadge } from '@/components/Badge';
import CaseStudyCard from '@/components/CaseStudyCard';
import {
  MapPin,
  Clock,
  Globe,
  Calendar,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

interface ExpertProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ExpertProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);

  if (!expert) {
    return {
      title: 'Specialist Not Found | HITL Directory',
    };
  }

  return {
    title: `${expert.full_name} — ${expert.professional_title} | HITL Verified`,
    description: expert.tagline,
    robots: expert.is_demo ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${expert.full_name} — AI Specialist Profile`,
      description: expert.tagline,
      images: [expert.avatar_url],
    },
  };
}

export default async function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/experts"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Directory
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 mb-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-800 border-2 border-white/10 shrink-0 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={expert.avatar_url}
                alt={expert.full_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {expert.full_name}
                </h1>
                {expert.is_verified ? (
                  <VerifiedBadge count={expert.verified_case_study_count} />
                ) : (
                  <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    Community Member
                  </span>
                )}
                {expert.sponsor_rank > 0 && <SponsorBadge />}
              </div>

              <p className="text-sm font-medium text-emerald-400">
                {expert.professional_title}
              </p>

              {expert.agency_name && (
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{expert.agency_name}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {expert.city}{expert.state_region ? `, ${expert.state_region}` : ''}, {expert.country}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  {expert.timezone}
                </span>
              </div>
            </div>
          </div>

          {/* Booking & Action Buttons */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {expert.booking_url ? (
              <a
                href={expert.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all text-center"
              >
                <Calendar className="w-4 h-4" />
                Book Discovery Call
              </a>
            ) : (
              <Link
                href="/match"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all text-center"
              >
                Inquire via Matchmaking
              </Link>
            )}

            {/* Social links */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {expert.website_url && (
                <a
                  href={expert.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="Visit Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {expert.linkedin_url && (
                <a
                  href={expert.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {expert.github_url && (
                <a
                  href={expert.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tagline & Bio */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
          <p className="text-sm sm:text-base font-semibold text-zinc-200 italic">
            &quot;{expert.tagline}&quot;
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
            {expert.bio}
          </p>
        </div>

        {/* Pricing & Engagement Badges */}
        <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-zinc-500">Starting Budget:</span>
            <BudgetBadge tier={expert.starting_budget} />
            <span className="text-zinc-500 ml-2">Engagement:</span>
            <EngagementBadge model={expert.primary_engagement} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Categories:</span>
            {expert.categories.map((c) => (
              <CategoryBadge key={c.id} name={c.name} />
            ))}
          </div>
        </div>

        {/* Tools Stack */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 mr-1">Verified Stack:</span>
          {expert.tools.map((t) => (
            <ToolBadge key={t.id} name={t.name} />
          ))}
        </div>
      </div>

      {/* =====================================================================
          CASE STUDIES PROOF ENGINE SECTION
      ====================================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The HITL Proof Engine</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Production Implementations & Guardrails
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Every case study below requires explicit proof of human oversight, failure safeguards, and measurable ROI.
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400">
            {expert.case_studies.length} Documented Case {expert.case_studies.length === 1 ? 'Study' : 'Studies'}
          </div>
        </div>

        <div className="space-y-6">
          {expert.case_studies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </div>
  );
}
