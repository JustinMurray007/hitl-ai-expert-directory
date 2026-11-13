import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { expertForDirectory } from '@/lib/listing';
import { getExperts } from '@/lib/store';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';
import {
  getExpertsByState,
  getLocationsSummary,
  toStateSlug,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface StatePageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  const experts = await getExperts();
  const { states } = getLocationsSummary(experts);
  const params: { state: string }[] = [];

  for (const st of states) {
    params.push({ state: st.slug });
    params.push({ state: st.code.toLowerCase() });
  }

  return ensureStaticParams(params, { state: STATIC_EXPORT_PLACEHOLDER });
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state } = await params;
  if (isStaticExportPlaceholder(state)) {
    return staticPlaceholderMetadata('State AI Directory | Find Ai Pros');
  }
  const experts = await getExperts();
  const { stateName, stateCode } = getExpertsByState(state, experts);

  if (!stateName) {
    return {
      title: 'State AI Directory | Find Ai Pros',
    };
  }

  const title = `Find An Ai Consultant & Company in ${stateName} | Find Ai Pros`;
  const description = `Hire AI consultants, automation architects, and AI development companies across ${stateName} (${stateCode}). Browse top cities and local experts.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findaipros.com/locations/state/${toStateSlug(stateCode)}`,
    },
    openGraph: {
      title,
      description,
      url: `https://findaipros.com/locations/state/${toStateSlug(stateCode)}`,
      type: 'website',
    },
  };
}

export default async function StateLocationPage({ params }: StatePageProps) {
  const { state } = await params;
  if (isStaticExportPlaceholder(state)) {
    notFound();
  }
  const allExperts = await getExperts();
  const { experts: stateExperts, stateCode, stateName, cities } = getExpertsByState(
    state,
    allExperts
  );

  if (!stateName || stateExperts.length === 0) {
    notFound();
  }

  const { states: allStates } = getLocationsSummary(allExperts);
  const otherStates = allStates.filter((s) => s.code !== stateCode);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Find An Ai Consultant & Company in ${stateName}`,
    description: `Directory of AI specialists and companies in ${stateName}.`,
    itemListElement: stateExperts.map((exp, index) => ({
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
        item: `https://findaipros.com/locations/state/${state.toLowerCase()}`,
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
          <span className="text-ink font-bold">{stateName}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl border border-line bg-white p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-[1.15]">
              Find An Ai Consultant &amp; Company in {stateName}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Browse automation specialists, CRM architects, and custom AI developers across {stateName}. Remote experts can serve this state too.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              {stateExperts.length} {stateExperts.length === 1 ? 'Specialist' : 'Specialists'} in {stateName}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-brand" />
              {cities.length} Active Metro Cities
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand" />
              100% Client-Owned Accounts &amp; Data
            </span>
          </div>
        </div>

        {/* Cities Directory inside this state */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                Browse by City in {stateName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your city to see who is listed and whether they work on-site.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/city/${city.slug}`}
                className="group p-5 rounded-2xl bg-white border border-line hover:border-brand hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono font-bold text-brand">{stateCode}</span>
                    <span className="font-semibold text-slate-500">{city.expertCount} {city.expertCount === 1 ? 'Pro' : 'Pros'}</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-ink group-hover:text-brand transition-colors">
                    {city.name}
                  </h3>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand">
                  <span>View City Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Specialists in this state */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                All AI Specialists in {stateName} ({stateExperts.length})
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Profiles in {stateName}, with the tools they use on each one.
              </p>
            </div>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stateExperts.map((exp) => (
              <ExpertCard key={exp.id} expert={expertForDirectory(exp)} />
            ))}
          </div>
        </section>

        {/* Other States Directory */}
        {otherStates.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl font-semibold text-ink">
              Browse Other States &amp; Regions
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherStates.map((st) => (
                <Link
                  key={st.code}
                  href={`/locations/state/${st.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand text-xs font-semibold text-slate-700 hover:text-brand transition-colors"
                >
                  {st.name} ({st.expertCount})
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
