import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getExpertBySlug, getExperts } from '@/lib/store';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';
import { PlacementBadge, ToolBadge, BudgetBadge, EngagementBadge, CategoryBadge } from '@/components/Badge';
import { showsPublicLinks } from '@/lib/listing';
import CaseStudyCard from '@/components/CaseStudyCard';
import ExpertLocationLinks from '@/components/ExpertLocation';
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
  return ensureStaticParams(
    experts.map((e) => ({ slug: e.slug })),
    { slug: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: ExpertProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) {
    return staticPlaceholderMetadata('Specialist Not Found | Find Ai Pros');
  }
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
  if (isStaticExportPlaceholder(slug)) {
    notFound();
  }
  const expert = await getExpertBySlug(slug);

  if (!expert) {
    notFound();
  }

  const linksVisible = showsPublicLinks(expert);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/experts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to AI Experts
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="rounded-3xl p-6 sm:p-10 border border-line bg-white mb-10 shadow-xs">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-canvas-muted border border-line shrink-0 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={expert.avatar_url}
                alt={expert.full_name}
                width={224}
                height={224}
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {expert.full_name}
                </h1>
                <PlacementBadge plan={expert.listing_plan} sponsorRank={expert.sponsor_rank} />
              </div>

              <p className="text-base sm:text-lg font-bold text-brand mt-1">
                {expert.professional_title}
              </p>

              {expert.agency_name && (
                <p className="text-sm sm:text-base text-muted-strong flex items-center gap-2 font-medium mt-1">
                  <Building className="w-4 h-4 text-muted" />
                  <span>{expert.agency_name}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-strong pt-2 font-medium">
                <ExpertLocationLinks expert={expert} showCountry={true} />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-muted" />
                  {expert.timezone}
                </span>
              </div>
            </div>
          </div>

          {linksVisible && (
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3.5 shrink-0">
            {expert.booking_url ? (
              <a
                href={expert.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all text-center hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                Book Discovery Call
              </a>
            ) : (
              <Link
                href={`/match?expert=${encodeURIComponent(expert.full_name)}&category=${encodeURIComponent(
                  expert.categories[0]?.slug || ''
                )}&budget=${encodeURIComponent(expert.starting_budget)}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all text-center hover:scale-[1.02]"
              >
                Inquire via Matchmaking
              </Link>
            )}

            <div className="flex items-center justify-center gap-2.5 pt-1">
              {expert.website_url && (
                <a
                  href={expert.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-canvas-muted p-3 text-ink hover:bg-brand-soft hover:text-brand"
                  aria-label="Visit website"
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
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-canvas-muted p-3 text-ink hover:bg-brand-soft hover:text-brand"
                  aria-label="LinkedIn profile"
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
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-canvas-muted p-3 text-ink hover:bg-brand-soft hover:text-brand"
                  aria-label="GitHub profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          )}
        </div>

        {/* Tagline & Bio */}
        <div className="mt-8 pt-6 border-t border-line-soft space-y-4">
          <p className="text-lg sm:text-xl font-bold text-ink italic leading-relaxed">
            &quot;{expert.tagline}&quot;
          </p>
          <p className="text-base sm:text-lg text-ink-soft leading-relaxed whitespace-pre-line font-normal">
            {expert.bio}
          </p>
        </div>

        {/* Pricing & Engagement Badges */}
        <div className="mt-6 pt-6 border-t border-line-soft flex flex-wrap items-center justify-between gap-4 text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-muted-strong font-semibold">Starting Budget:</span>
            <BudgetBadge tier={expert.starting_budget} />
            <span className="text-muted-strong ml-2 font-semibold">Engagement:</span>
            <EngagementBadge model={expert.primary_engagement} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-strong font-semibold">Categories:</span>
            {expert.categories.map((c) => (
              <CategoryBadge key={c.id} name={c.name} />
            ))}
          </div>
        </div>

        {/* Tools Stack */}
        <div className="mt-5 pt-5 border-t border-line-soft flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="text-muted-strong mr-2 font-semibold">Tools:</span>
          {(expert.tools ?? []).map((t) => (
            <ToolBadge key={t.id} name={t.name} />
          ))}
        </div>
      </div>

      {expert.case_studies.length > 0 && (
      <div data-reveal className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-2 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Optional examples</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              Examples of past work
            </h2>
            <p className="text-base text-muted-strong mt-2 font-normal">
              Case studies are optional. They are not required to be listed. When a specialist chooses to show one, it describes the work and the human checks in it.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {expert.case_studies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
