import { Metadata } from 'next';
import { getExperts } from '@/lib/store';
import { getLocationsSummary } from '@/lib/locations';
import LocationsDirectoryClient from '@/components/LocationsDirectoryClient';
import { MapPin, ShieldCheck, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Find An Ai Consultant & Company Near You | Find Ai Pros',
  description:
    'Find local AI consultants, automation agencies, and AI developers in your city, state, or zip code. Every listed specialist names an accountable person and gives references we can contact.',
  alternates: {
    canonical: 'https://findaipros.com/locations',
  },
};

export default async function LocationsMainPage() {
  const experts = await getExperts();
  const { states, cities, zips } = getLocationsSummary(experts);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Find An Ai Consultant & Company Near You',
    description:
      'Directory of local AI consultants, automation agencies, and applied engineers across cities, states, and zip codes.',
    itemListElement: cities.slice(0, 15).map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `AI Experts & Consultants in ${city.name}, ${city.stateCode}`,
      url: `https://findaipros.com/locations/city/${city.slug}`,
    })),
  };

  return (
    <div className="bg-canvas min-h-screen py-14">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand shadow-xs">
            <MapPin className="w-4 h-4 text-brand" />
            <span>National Local Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
            Find An Ai Consultant &amp; Company Near You
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Browse local AI consultants, automation architects, and development agencies across cities, states, and zip codes. Every specialist names human safety checkpoints and references we can contact.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs sm:text-sm font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              {cities.length} Metropolitan Hubs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              {states.length} States &amp; Regions
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              {experts.length} Specialists
            </span>
          </div>
        </div>

        {/* Interactive Directory (Search, Cities, States, Zips, and Cards) */}
        <LocationsDirectoryClient
          states={states}
          cities={cities}
          zips={zips}
          experts={experts}
        />
      </div>
    </div>
  );
}
