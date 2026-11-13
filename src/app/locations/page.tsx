import { Metadata } from 'next';
import { getExperts } from '@/lib/store';
import { expertForPage } from '@/lib/listing';
import { getLocationsSummary } from '@/lib/locations';
import LocationsDirectoryClient from '@/components/LocationsDirectoryClient';
import { MapPin, ShieldCheck, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Find an AI Consultant Near You: US and Canada',
  description:
    'Find an AI consultant by city. Compare tools, or get matched in 48 hours. Remote experts can serve your city too.',
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
          <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
            Find an AI Consultant Near You: US and Canada
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Browse AI consultants, automation agencies, and developers across cities, states, and zip codes. Remote experts can also serve your city.
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
          experts={experts.map(expertForPage)}
        />
      </div>
    </div>
  );
}
