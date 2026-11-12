import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExperts } from '@/lib/store';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';
import {
  getExpertsByCity,
  getLocationsSummary,
  toCitySlug,
  toStateSlug,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';
import {
  MapPin,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const experts = await getExperts();
  const { cities } = getLocationsSummary(experts);
  return ensureStaticParams(
    cities.map((c) => ({ city: c.slug })),
    { city: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  if (isStaticExportPlaceholder(city)) {
    return staticPlaceholderMetadata('City AI Directory | Find Ai Pros');
  }
  const experts = await getExperts();
  const { cityName, stateCode } = getExpertsByCity(city, experts);

  if (!cityName) {
    return {
      title: 'City AI Directory | Find Ai Pros',
    };
  }

  const title = `Find An Ai Consultant & Company Near ${cityName}, ${stateCode} | Find Ai Pros`;
  const description = `Hire AI automation consultants, conversational voice engineers, and applied AI development companies near ${cityName}, ${stateCode}. Human-in-the-loop safeguards and references we can contact.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findaipros.com/locations/city/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `https://findaipros.com/locations/city/${city}`,
      type: 'website',
    },
  };
}

export default async function CityLocationPage({ params }: CityPageProps) {
  const { city } = await params;
  if (isStaticExportPlaceholder(city)) {
    notFound();
  }
  const allExperts = await getExperts();
  const { experts: cityExperts, cityName, stateCode, stateName, stateSlug, zips } = getExpertsByCity(
    city,
    allExperts
  );

  if (!cityName) {
    notFound();
  }

  // Get nearby cities in the same state for internal linking
  const { cities: allCities } = getLocationsSummary(allExperts);
  const siblingCities = allCities.filter(
    (c) => c.stateCode === stateCode && c.slug !== city
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Find An Ai Consultant & Company Near ${cityName}`,
    description: `AI specialists, automation consultants, and AI agencies serving ${cityName}, ${stateCode}.`,
    itemListElement: cityExperts.map((exp, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: exp.full_name,
      url: `https://findaipros.com/experts/${exp.slug}`,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://findaipros.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Near You',
        item: 'https://findaipros.com/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: stateName,
        item: `https://findaipros.com/locations/state/${stateSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: cityName,
        item: `https://findaipros.com/locations/city/${city}`,
      },
    ],
  };

  return (
    <div className="bg-canvas min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/locations" className="hover:text-brand transition-colors">
            Locations Near You
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/locations/state/${stateSlug}`}
            className="hover:text-brand transition-colors"
          >
            {stateName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-ink font-bold">{cityName}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-soft via-white to-brand-soft border border-line p-8 sm:p-12 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-line text-xs sm:text-sm font-bold text-brand shadow-2xs">
            <MapPin className="w-4 h-4 text-brand" />
            <span>
              {cityName}, {stateCode} • Local AI Directory
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
              Find An Ai Consultant &amp; Company Near {cityName}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Connect with AI automation specialists, conversational voice engineers, and applied machine learning developers serving {cityName}, {stateCode} and surrounding metro markets.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-4 border-t border-line flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              {cityExperts.length} {cityExperts.length === 1 ? 'Specialist' : 'Specialists'} in {cityName}
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
              Human-in-the-Loop Safeguards Required
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              References we contact
            </span>
          </div>

          {/* Zip Codes Pill Row */}
          {zips.length > 0 && (
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase font-mono tracking-wider">
                Served Zip Codes:
              </span>
              {zips.map((z) => (
                <Link
                  key={z}
                  href={`/locations/zip/${z.toLowerCase()}`}
                  className="px-2.5 py-1 rounded-md bg-white border border-line-strong hover:border-brand text-xs font-mono font-bold text-brand hover:bg-brand-soft transition-colors"
                >
                  {z}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Specialists Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                AI Specialists in {cityName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Named specialists in {cityName}, with the categories they serve.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityExperts.map((exp) => (
              <ExpertCard key={exp.id} expert={exp} />
            ))}
          </div>
        </section>

        {/* Sibling Cities in Same State */}
        {siblingCities.length > 0 && (
          <section className="rounded-3xl bg-canvas border border-line p-8 space-y-4">
            <h3 className="text-xl font-semibold text-ink">
              Other Cities Near You in {stateName}
            </h3>
            <p className="text-sm text-slate-600">
              Browse AI automation developers and consultancies across nearby metropolitan regions:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {siblingCities.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/locations/city/${sibling.slug}`}
                  className="p-3 rounded-xl bg-white border border-line hover:border-brand hover:shadow-xs text-xs font-bold text-ink hover:text-brand flex items-center justify-between transition-all"
                >
                  <span>{sibling.name}</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {sibling.expertCount} {sibling.expertCount === 1 ? 'pro' : 'pros'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Local AI Buyer FAQ & Guidance */}
        <section className="rounded-3xl bg-white border border-line p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-brand font-bold text-sm uppercase tracking-wider font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>Local Implementation Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
            Hiring an AI Consultant Near {cityName}, {stateCode}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-semibold text-ink text-base sm:text-lg">
                Why hire a local AI consultant near {cityName}?
              </h4>
              <p className="text-slate-600">
                Local specialists understand the commercial context of {cityName} businesses, regional regulations, and local industry workflows. Whether you need on-site team training, workflow discovery sessions, or time-zone aligned support, our {cityName} AI consultants provide hands-on accountability.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-ink text-base sm:text-lg">
                What does &quot;Human-in-the-Loop&quot; mean for your systems?
              </h4>
              <p className="text-slate-600">
                Every specialist on Find Ai Pros builds automations with mandatory safety stops. Autonomous AI agents never send unapproved contracts or execute high-stakes client communication without your team having final sign-off.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-base text-ink">
                Need a custom recommendation in {cityName}?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Our concierge matching team reviews your business operational bottleneck and introduces two audited specialists.
              </p>
            </div>
            <Link
              href={`/match?location=${encodeURIComponent(`${cityName}, ${stateCode}`)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-sm shadow-xs transition-all shrink-0"
            >
              Request {cityName} Intro <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
