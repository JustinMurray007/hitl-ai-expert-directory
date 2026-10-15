import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getExpertBySlug } from '@/lib/store';
import { VerifiedBadge, SponsorBadge, ToolBadge, BudgetBadge, EngagementBadge, CategoryBadge } from '@/components/Badge';
import CaseStudyCard from '@/components/CaseStudyCard';
import {
  MapPin,
  Clock,
  Globe,
  Calendar,
  ShieldCheck,
  Building,
  ArrowLeft,
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5e6d55] hover:text-[#001e00] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Specialists
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="rounded-3xl p-6 sm:p-10 border border-[#e4ebe4] bg-white mb-10 shadow-xs">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#f4f6f4] border border-[#e4ebe4] shrink-0 shadow-xs">
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
                <h1 className="text-2xl sm:text-3xl font-black text-[#001e00]">
                  {expert.full_name}
                </h1>
                {expert.is_verified ? (
                  <VerifiedBadge count={expert.verified_case_study_count} />
                ) : (
                  <span className="text-xs text-[#5e6d55] font-mono bg-[#f4f6f4] px-2.5 py-0.5 rounded-full border border-[#dbe3db]">
                    Community Member
                  </span>
                )}
                {expert.sponsor_rank > 0 && <SponsorBadge />}
              </div>

              <p className="text-sm font-bold text-[#108a00]">
                {expert.professional_title}
              </p>

              {expert.agency_name && (
                <p className="text-xs text-[#5e6d55] flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-[#889888]" />
                  <span>{expert.agency_name}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5e6d55] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#889888]" />
                  {expert.city}{expert.state_region ? `, ${expert.state_region}` : ''}, {expert.country}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#889888]" />
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
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-sm transition-all text-center"
              >
                <Calendar className="w-4 h-4" />
                Book Discovery Call
              </a>
            ) : (
              <Link
                href="/match"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-sm transition-all text-center"
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
                  className="p-2.5 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
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
                  className="p-2.5 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
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
                  className="p-2.5 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tagline & Bio */}
        <div className="mt-8 pt-6 border-t border-[#f0f3f0] space-y-4">
          <p className="text-sm sm:text-base font-bold text-[#001e00] italic">
            &quot;{expert.tagline}&quot;
          </p>
          <p className="text-xs sm:text-sm text-[#4b554b] leading-relaxed whitespace-pre-line font-medium">
            {expert.bio}
          </p>
        </div>

        {/* Pricing & Engagement Badges */}
        <div className="mt-6 pt-6 border-t border-[#f0f3f0] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#5e6d55] font-medium">Starting Budget:</span>
            <BudgetBadge tier={expert.starting_budget} />
            <span className="text-[#5e6d55] ml-2 font-medium">Engagement:</span>
            <EngagementBadge model={expert.primary_engagement} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5e6d55] font-medium">Categories:</span>
            {expert.categories.map((c) => (
              <CategoryBadge key={c.id} name={c.name} />
            ))}
          </div>
        </div>

        {/* Tools Stack */}
        <div className="mt-4 pt-4 border-t border-[#f0f3f0] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#5e6d55] mr-1 font-medium">Verified Stack:</span>
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The HITL Proof Engine</span>
            </div>
            <h2 className="text-2xl font-black text-[#001e00]">
              Production Implementations & Guardrails
            </h2>
            <p className="text-xs text-[#5e6d55] mt-1 font-medium">
              Every case study below requires explicit proof of human oversight, failure safeguards, and measurable ROI.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-[#108a00]">
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
