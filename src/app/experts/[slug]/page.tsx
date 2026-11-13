import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { breadcrumbList, graph } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site-url';
import { Metadata } from 'next';
import Link from 'next/link';
import { getExpertBySlug, getExperts } from '@/lib/store';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';
import { ToolBadge, CategoryBadge } from '@/components/Badge';
import { expertForPage, showsPublicLinks } from '@/lib/listing';
import ExpertLocationLinks from '@/components/ExpertLocation';
import {
  MapPin,
  Clock,
  Globe,
  Calendar,
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

  const place = [expert.city, expert.state_region].filter(Boolean).join(', ');
  return withCanonical(`/experts/${expert.slug}`, {
    title: `${expert.full_name}: ${expert.professional_title}${place ? `, ${place}` : ''}`,
    description: expert.tagline,
    robots: expert.is_demo ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${expert.full_name} — AI Specialist Profile`,
      description: expert.tagline,
      images: [expert.avatar_url],
    },
  });
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

  const sameAs = [expert.linkedin_url, expert.website_url, expert.github_url].filter((url): url is string => Boolean(url));
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={graph(
          {
            '@type': 'ProfilePage',
            url: absoluteUrl(`/experts/${expert.slug}`),
            mainEntity: {
              '@type': 'Person',
              name: expert.full_name,
              jobTitle: expert.professional_title,
              description: expert.tagline,
              url: absoluteUrl(`/experts/${expert.slug}`),
              ...(expert.agency_name ? { worksFor: { '@type': 'Organization', name: expert.agency_name } } : {}),
              address: {
                '@type': 'PostalAddress',
                addressLocality: expert.city,
                addressRegion: expert.state_region,
                addressCountry: expert.country,
              },
              knowsAbout: expert.categories.map((category) => category.name),
              ...(sameAs.length > 0 ? { sameAs } : {}),
            },
          },
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Experts', path: '/experts' },
            { name: expert.full_name, path: `/experts/${expert.slug}` },
          ]),
        )}
      />
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
              <h1 className="text-2xl sm:text-3xl font-semibold text-ink">
                {expert.full_name}
              </h1>

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
                <ExpertLocationLinks expert={expertForPage(expert)} showCountry={true} />
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
                )}`}
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

        <div className="mt-6 pt-6 border-t border-line-soft flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="text-muted-strong font-semibold">Categories:</span>
          {expert.categories.map((c) => (
            <CategoryBadge key={c.id} name={c.name} />
          ))}
        </div>

        {/* Tools Stack */}
        <div className="mt-5 pt-5 border-t border-line-soft flex flex-wrap items-center gap-2 text-sm sm:text-base">
          <span className="text-muted-strong mr-2 font-semibold">Tools:</span>
          {(expert.tools ?? []).map((t) => (
            <ToolBadge key={t.id} name={t.name} />
          ))}
        </div>
      </div>

    </div>
  );
}
