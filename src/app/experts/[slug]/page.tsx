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
  ArrowLeft,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

interface ExpertProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const experts = await getExperts();
  return experts.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: ExpertProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = await getExpertBySlug(slug);

  if (!expert) {
    return {
      title: 'Specialist Not Found | Find Ai Pros',
    };
  }

  return {
    title: `${expert.full_name} — ${expert.professional_title} | Find Ai Pros`,
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5e6d55] hover:text-[#001e00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to AI Experts
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
                  <span className="text-sm text-[#5e6d55] font-mono bg-[#f4f6f4] px-3 py-1 rounded-full border border-[#dbe3db]">
                    Community Member
                  </span>
                )}
                {expert.sponsor_rank > 0 && <SponsorBadge />}
              </div>

              <p className="text-base sm:text-lg font-bold text-[#108a00] mt-1">
                {expert.professional_title}
              </p>

              {expert.agency_name && (
                <p className="text-sm sm:text-base text-[#475569] flex items-center gap-2 font-medium mt-1">
                  <Building className="w-4 h-4 text-[#889888]" />
                  <span>{expert.agency_name}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-5 text-sm text-[#475569] pt-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#889888]" />
                  {expert.city}{expert.state_region ? `, ${expert.state_region}` : ''}, {expert.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#889888]" />
                  {expert.timezone}
                </span>
              </div>
            </div>
          </div>

          {/* Booking & Action Buttons */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3.5 shrink-0">
            {expert.booking_url ? (
              <a
                href={expert.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all text-center hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                Book Discovery Call
              </a>
            ) : (
              <Link
                href={`/match?expert=${encodeURIComponent(expert.full_name)}&category=${encodeURIComponent(
                  expert.categories[0]?.slug || ''
                )}&budget=${encodeURIComponent(expert.starting_budget)}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all text-center hover:scale-[1.02]"
              >
                Inquire via Matchmaking
              </Link>
            )}

            {/* Social links */}
            <div className="flex items-center justify-center gap-2.5 pt-1">
              {expert.website_url && (
                <a
                  href={expert.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
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
                  className="p-3 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
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
                  className="p-3 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] hover:text-[#108a00] border border-[#dbe3db] transition-colors"
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
          <p className="text-lg sm:text-xl font-bold text-[#001e00] italic leading-relaxed">
            &quot;{expert.tagline}&quot;
          </p>
          <p className="text-base sm:text-lg text-[#334133] leading-relaxed whitespace-pre-line font-normal">
            {expert.bio}
          </p>
        </div>

        {/* Pricing & Engagement Badges */}
        <div className="mt-6 pt-6 border-t border-[#f0f3f0] flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#475569] font-semibold">Starting Budget:</span>
            <BudgetBadge tier={expert.starting_budget} />
            <span className="text-[#475569] ml-2 font-semibold">Engagement:</span>
            <EngagementBadge model={expert.primary_engagement} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#475569] font-semibold">Categories:</span>
            {expert.categories.map((c) => (
              <CategoryBadge key={c.id} name={c.name} />
            ))}
          </div>
        </div>

        {/* Tools Stack */}
        <div className="mt-5 pt-5 border-t border-[#f0f3f0] flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="text-[#475569] mr-2 font-semibold">Verified Stack:</span>
          {expert.tools.map((t) => (
            <ToolBadge key={t.id} name={t.name} />
          ))}
        </div>
      </div>

      {/* =====================================================================
          CASE STUDIES PROOF ENGINE SECTION
      ====================================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-sm font-bold text-[#108a00] mb-2 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>The HITL Proof Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001e00]">
              Verified Client Deployments &amp; Human Safety Checks
            </h2>
            <p className="text-base text-[#475569] mt-2 font-normal">
              Every case study below requires documented proof of human oversight, error prevention safeguards, and measurable business ROI.
            </p>
          </div>
          <div className="text-sm font-mono font-bold text-[#108a00] bg-[#e4f7e6] px-3.5 py-1 rounded-full border border-[#b2e8b8]">
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
