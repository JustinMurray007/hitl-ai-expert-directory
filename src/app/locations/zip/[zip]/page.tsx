import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExperts } from '@/lib/store';
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
  return zips.map((z) => ({ zip: z.slug }));
}

export async function generateMetadata({ params }: ZipPageProps): Promise<Metadata> {
  const { zip } = await params;
  const experts = await getExperts();
  const { zip: postalCode, cityName, stateCode } = getExpertsByZip(zip, experts);

  if (!cityName) {
    return {
      title: 'Zip Code AI Directory | Find Ai Pros',
    };
  }

  const title = `Find An Ai Consultant & Company Near ${postalCode} (${cityName}, ${stateCode}) | Find Ai Pros`;
  const description = `Hire verified AI automation consultants and AI development companies serving postal code ${postalCode} in ${cityName}, ${stateCode}. 100% human accountability and verified case studies.`;

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
    description: `Verified AI specialists serving zip code ${postalCode} in ${cityName}, ${stateCode}.`,
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
          <Link
            href={`/locations/state/${stateSlug}`}
            className="hover:text-[#108a00] transition-colors"
          >
            {stateName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/locations/city/${citySlug}`}
            className="hover:text-[#108a00] transition-colors"
          >
            {cityName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#001e00] font-bold font-mono">{postalCode}</span>
        </nav>

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#fffbeb] via-white to-[#edf7ee] border border-[#fde68a] p-8 sm:p-12 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#fde68a] text-xs sm:text-sm font-bold text-[#b45309] shadow-2xs">
            <MapPin className="w-4 h-4 text-[#d97706]" />
            <span>
              Postal Area • {postalCode} ({cityName}, {stateCode})
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-[#001e00] tracking-tight leading-[1.15]">
              Find An Ai Consultant &amp; Company Near {postalCode}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Local AI automation engineers, CRM integration specialists, and conversational voice AI consultants serving postal code <strong className="text-[#001e00]">{postalCode}</strong> in {cityName}, {stateCode}.
            </p>
          </div>

          {/* Quick Links to City & State Hub */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold">
            <Link
              href={`/locations/city/${citySlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 text-[#001e00] hover:border-[#108a00] hover:text-[#108a00] transition-colors shadow-2xs"
            >
              <Compass className="w-4 h-4 text-[#108a00]" />
              View {cityName} Metro Hub
            </Link>
            <Link
              href={`/locations/state/${stateSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-300 text-[#001e00] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors shadow-2xs"
            >
              <Building className="w-4 h-4 text-[#2563eb]" />
              View All {stateName} Experts
            </Link>
          </div>
        </div>

        {/* Specialists serving this zip code */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00]">
                Verified Specialists Serving Zip Code {postalCode}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Audited production case studies, direct booking links, and client safeguards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zipExperts.map((exp) => (
              <ExpertCard key={exp.id} expert={exp} />
            ))}
          </div>
        </section>

        {/* Nearby Zip Codes */}
        {siblingZips.length > 0 && (
          <section className="rounded-3xl bg-[#f7faf7] border border-[#e2ece2] p-8 space-y-4">
            <h3 className="text-lg font-black text-[#001e00]">
              Nearby Zip Codes in {stateName}
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {siblingZips.map((sz) => (
                <Link
                  key={sz.zip}
                  href={`/locations/zip/${sz.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#cbd5cb] hover:border-[#d97706] text-xs font-mono font-bold text-slate-700 hover:text-[#b45309] hover:bg-[#fffbeb] transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>{sz.zip}</span>
                  <span className="text-[10px] text-slate-400">({sz.cityName})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Concierge Matching Card */}
        <div className="rounded-3xl bg-white border border-[#e4ebe4] p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#108a00] mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Private Concierge Matching</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#001e00]">
              Need an on-site AI expert in or around {postalCode}?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Tell us your software stack and operational bottleneck. We introduce 2 audited specialists who match your budget tier and location requirements.
            </p>
          </div>
          <Link
            href={`/match?location=${encodeURIComponent(`${postalCode}, ${cityName}, ${stateCode}`)}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all shrink-0"
          >
            Request Intro <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
