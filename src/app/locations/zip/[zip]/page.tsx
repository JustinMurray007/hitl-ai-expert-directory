import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { expertForPage } from '@/lib/listing';
import { getExperts } from '@/lib/store';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';
import {
  getExpertsByZip,
  getLocationsSummary,
  toCitySlug,
  toStateSlug,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';
import {
  MapPin,
  Building,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface ZipPageProps {
  params: Promise<{ zip: string }>;
}

export async function generateStaticParams() {
  const experts = await getExperts();
  const { zips } = getLocationsSummary(experts);
  return ensureStaticParams(
    zips.map((z) => ({ zip: z.slug })),
    { zip: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: ZipPageProps): Promise<Metadata> {
  const { zip } = await params;
  if (isStaticExportPlaceholder(zip)) {
    return staticPlaceholderMetadata('Zip Code AI Directory | Find Ai Pros');
  }
  const experts = await getExperts();
  const { zip: postalCode, cityName, stateCode } = getExpertsByZip(zip, experts);

  if (!cityName) {
    return {
      title: 'Zip Code AI Directory | Find Ai Pros',
    };
  }

  const title = `Find An Ai Consultant & Company Near ${postalCode} (${cityName}, ${stateCode}) | Find Ai Pros`;
  const description = `Find AI consultants and developers serving postal code ${postalCode} in ${cityName}, ${stateCode}. Compare tools, or get matched in 48 hours.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findaipros.com/locations/zip/${zip.toLowerCase()}`,
    },
    openGraph: {
      title,
      description,
      url: `https://findaipros.com/locations/zip/${zip.toLowerCase()}`,
      type: 'website',
    },
  };
}

export default async function ZipLocationPage({ params }: ZipPageProps) {
  const { zip } = await params;
  if (isStaticExportPlaceholder(zip)) {
    notFound();
  }
  const allExperts = await getExperts();
  const {
    experts: zipExperts,
    zip: postalCode,
    cityName,
    citySlug,
    stateCode,
    stateName,
    stateSlug,
  } = getExpertsByZip(zip, allExperts);

  if (!cityName || zipExperts.length === 0) {
    notFound();
  }

  const { zips: allZips } = getLocationsSummary(allExperts);
  const siblingZips = allZips.filter(
    (z) => z.stateCode === stateCode && z.slug !== zip.toLowerCase()
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Find An Ai Consultant & Company Near ${postalCode}`,
    description: `AI specialists serving zip code ${postalCode} in ${cityName}, ${stateCode}.`,
    itemListElement: zipExperts.map((exp, index) => ({
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
        name: 'Locations Near You',
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
        item: `https://findaipros.com/locations/city/${citySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: postalCode,
        item: `https://findaipros.com/locations/zip/${zip.toLowerCase()}`,
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
        <nav aria-label="Breadcrumb" className="flex max-w-full items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-semibold text-muted-strong">
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
          <Link
            href={`/locations/city/${citySlug}`}
            className="hover:text-brand transition-colors"
          >
            {cityName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-ink font-bold font-mono">{postalCode}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-line bg-white p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
              Find An Ai Consultant &amp; Company Near {postalCode}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Local AI automation engineers, CRM integration specialists, and conversational voice AI consultants serving postal code <strong className="text-ink">{postalCode}</strong> in {cityName}, {stateCode}.
            </p>
          </div>

          {/* Quick Links to City & State Hub */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold">
            <Link
              href={`/locations/city/${citySlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 text-ink hover:border-brand hover:text-brand transition-colors shadow-2xs"
            >
              <Compass className="w-4 h-4 text-brand" />
              View {cityName} Metro Hub
            </Link>
            <Link
              href={`/locations/state/${stateSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 text-ink hover:border-brand hover:text-brand transition-colors shadow-2xs"
            >
              <Building className="w-4 h-4 text-brand" />
              View All {stateName} Experts
            </Link>
          </div>
        </div>

        {/* Specialists serving this zip code */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                Specialists Serving Zip Code {postalCode}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Contact links while a listing is inside its free 30 days or on a paid plan.
              </p>
            </div>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zipExperts.map((exp) => (
              <ExpertCard key={exp.id} expert={expertForPage(exp)} />
            ))}
          </div>
        </section>

        {/* Nearby Zip Codes */}
        {siblingZips.length > 0 && (
          <section className="rounded-3xl bg-canvas border border-line p-8 space-y-4">
            <h3 className="text-lg font-semibold text-ink">
              Nearby Zip Codes in {stateName}
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {siblingZips.map((sz) => (
                <Link
                  key={sz.zip}
                  href={`/locations/zip/${sz.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-line-strong hover:border-accent text-xs font-mono font-bold text-slate-700 hover:text-accent hover:bg-accent-soft transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>{sz.zip}</span>
                  <span className="text-[10px] text-slate-400">({sz.cityName})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Concierge Matching Card */}
        <div className="rounded-3xl bg-white border border-line p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-ink">
              Need an on-site AI expert in or around {postalCode}?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Tell us your software stack and operational bottleneck. We introduce specialists who can work with that location.
            </p>
          </div>
          <Link
            href={`/match?location=${encodeURIComponent(`${postalCode}, ${cityName}, ${stateCode}`)}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all shrink-0"
          >
            Request Intro <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
