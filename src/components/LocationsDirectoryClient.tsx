'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Building,
  Compass,
} from 'lucide-react';
import type { DirectoryExpert } from '@/lib/listing';
import {
  LocationStateSummary,
  LocationCitySummary,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';

interface LocationsDirectoryClientProps {
  states: LocationStateSummary[];
  cities: LocationCitySummary[];
  experts: DirectoryExpert[];
}

export default function LocationsDirectoryClient({
  states,
  cities,
  experts,
}: LocationsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cities' | 'states'>('all');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return {
        states,
        cities,
        experts,
      };
    }

    const matchedStates = states.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );

    const matchedCities = cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.stateName.toLowerCase().includes(q) ||
        c.stateCode.toLowerCase().includes(q)
    );

    const matchedExperts = experts.filter(
      (e) =>
        e.full_name.toLowerCase().includes(q) ||
        e.agency_name?.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.state_region?.toLowerCase().includes(q) ||
        e.professional_title.toLowerCase().includes(q)
    );

    return {
      states: matchedStates,
      cities: matchedCities,
      experts: matchedExperts,
    };
  }, [searchQuery, states, cities, experts]);

  return (
    <div className="space-y-14">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search locations by city or state"
            placeholder="Search by city (e.g. San Diego) or state (CA)..."
            className="w-full rounded-full border border-line bg-white py-3.5 pl-12 pr-20 text-base font-medium text-ink shadow-rest placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 inline-flex min-h-11 -translate-y-1/2 cursor-pointer items-center rounded-full bg-slate-100 px-3 text-sm font-bold text-muted-strong hover:text-ink"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Locations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cities')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'cities'
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Cities ({filtered.cities.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('states')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'states'
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            States ({filtered.states.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: CITIES DIRECTORY */}
      {(activeTab === 'all' || activeTab === 'cities') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-brand" />
                <span>Browse AI Consultants by City</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore local AI developers and automation agencies by metropolitan area.
              </p>
            </div>
            <span className="text-sm text-muted">
              {filtered.cities.length} cities
            </span>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 gap-3.5 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.cities.map((city) => (
              <Link
                key={`${city.slug}-${city.stateCode}`}
                href={`/locations/city/${city.slug}`}
                className="group p-4 rounded-2xl bg-white border border-line hover:border-brand hover:shadow-md transition-all flex flex-col justify-between"
              >
                <h3 className="font-semibold text-base text-ink group-hover:text-brand">
                  {city.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {city.stateCode}. {city.expertCount} {city.expertCount === 1 ? 'expert' : 'experts'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: STATES DIRECTORY */}
      {(activeTab === 'all' || activeTab === 'states') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-semibold text-ink flex items-center gap-2.5">
                <Building className="w-6 h-6 text-brand" />
                <span>Browse AI Consultants by State</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Statewide hubs featuring specialists and city directories.
              </p>
            </div>
            <span className="text-sm text-muted">
              {filtered.states.length} states
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.states.map((st) => (
              <Link
                key={st.code}
                href={`/locations/state/${st.slug}`}
                className="group p-5 rounded-2xl bg-white border border-line hover:border-brand hover:shadow-md transition-all flex flex-col justify-between"
              >
                <h3 className="font-semibold text-lg text-ink group-hover:text-brand">
                  {st.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {st.code}. {st.expertCount} {st.expertCount === 1 ? 'specialist' : 'specialists'}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {st.cities.map((c) => c.name).join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: ALL MATCHED LOCAL EXPERTS */}
      <section className="space-y-6 pt-6 border-t border-line">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              {searchQuery ? `Matched AI Specialists (${filtered.experts.length})` : 'All AI Specialists Across North America'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Click a city or state on an expert card to open that location page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.experts.map((exp) => (
            <ExpertCard key={exp.id} expert={exp} />
          ))}
        </div>
      </section>
    </div>
  );
}
