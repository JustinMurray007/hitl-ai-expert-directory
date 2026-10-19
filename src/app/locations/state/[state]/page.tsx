import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExperts } from '@/lib/store';
import {
  getExpertsByState,
  getLocationsSummary,
  toStateSlug,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';
import {
  Building,
  MapPin,
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

  return params;
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state } = await params;
  const experts = await getExperts();
  const { stateName, stateCode } = getExpertsByState(state, experts);

  if (!stateName) {
    return {
      title: 'State AI Directory | Find Ai Pros',
    };
  }

  const title = `Find An Ai Consultant & Company in ${stateName} | Find Ai Pros`;
  const description = `Hire verified AI consultants, automation architects, and AI development companies across ${stateName} (${stateCode}). Browse top cities, verified case studies, and local experts.`;

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
  const allExperts = await getExperts();
  const { experts: stateExperts, stateCode, stateName, cities, zips } = getExpertsByState(
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
    description: `Directory of verified AI specialists and companies in ${stateName}.`,
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
    <div className="bg-[#fcfdfc] min-h-screen py-10">
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
          <Link href="/" className="hover:text-[#108a00] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/locations" className="hover:text-[#108a00] transition-colors">
            Locations Near You
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#001e00] font-bold">{stateName}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#eff6ff] via-white to-[#edf7ee] border border-[#cbdfe8] p-8 sm:p-12 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bfdbfe] text-xs sm:text-sm font-bold text-[#1d4ed8] shadow-2xs">
            <Building className="w-4 h-4 text-[#2563eb]" />
            <span>State Hub • {stateName} ({stateCode})</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-[1.15]">
              Find An Ai Consultant &amp; Company in {stateName}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Connect with verified automation specialists, CRM architects, and custom AI developers across {stateName}. Every expert must pass technical case study reviews with guaranteed human oversight.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#108a00]" />
              {stateExperts.length} Verified {stateExperts.length === 1 ? 'Specialist' : 'Specialists'} in {stateName}
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2563eb]" />
              {cities.length} Active Metro Cities
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#108a00]" />
              100% Client-Owned Accounts &amp; Data
            </span>
          </div>
        </div>

        {/* Cities Directory inside this state */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00]">
                Browse by City in {stateName}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your city to view local case studies, on-site availability, and neighborhood zip codes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/city/${city.slug}`}
                className="group p-5 rounded-2xl bg-white border border-[#e4ebe4] hover:border-[#108a00] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono font-bold text-[#108a00]">{stateCode}</span>
                    <span className="font-semibold text-slate-500">{city.expertCount} {city.expertCount === 1 ? 'Pro' : 'Pros'}</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#001e00] group-hover:text-[#108a00] transition-colors">
                    {city.name}
                  </h3>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#108a00]">
                  <span>View City Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Zip Codes in State */}
        {zips.length > 0 && (
          <section className="rounded-3xl bg-[#f7faf7] border border-[#e2ece2] p-8 space-y-4">
            <h3 className="text-lg font-black text-[#001e00] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#d97706]" />
              <span>Served Zip Codes in {stateName}</span>
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {zips.map((z) => (
                <Link
                  key={z}
                  href={`/locations/zip/${z.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#cbd5cb] hover:border-[#d97706] text-xs font-mono font-bold text-[#b45309] hover:bg-[#fffbeb] transition-colors shadow-2xs"
                >
                  {z}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Specialists in this state */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00]">
                All AI Specialists in {stateName} ({stateExperts.length})
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Verified consultants with demonstrated production systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateExperts.map((exp) => (
              <ExpertCard key={exp.id} expert={exp} />
            ))}
          </div>
        </section>

        {/* Other States Directory */}
        {otherStates.length > 0 && (
          <section className="pt-8 border-t border-slate-200 space-y-4">
            <h3 className="text-xl font-extrabold text-[#001e00]">
              Browse Other States &amp; Regions
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherStates.map((st) => (
                <Link
                  key={st.code}
                  href={`/locations/state/${st.slug}`}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#2563eb] text-xs font-semibold text-slate-700 hover:text-[#2563eb] transition-colors"
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
