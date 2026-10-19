'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Search,
  Building,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Compass,
} from 'lucide-react';
import { Expert } from '@/lib/types';
import {
  LocationStateSummary,
  LocationCitySummary,
  LocationZipSummary,
  toCitySlug,
  toStateSlug,
  toZipSlug,
} from '@/lib/locations';
import ExpertCard from '@/components/ExpertCard';

interface LocationsDirectoryClientProps {
  states: LocationStateSummary[];
  cities: LocationCitySummary[];
  zips: LocationZipSummary[];
  experts: Expert[];
}

export default function LocationsDirectoryClient({
  states,
  cities,
  zips,
  experts,
}: LocationsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cities' | 'states' | 'zips'>('all');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return {
        states,
        cities,
        zips,
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

    const matchedZips = zips.filter(
      (z) =>
        z.zip.toLowerCase().includes(q) ||
        z.cityName.toLowerCase().includes(q) ||
        z.stateCode.toLowerCase().includes(q)
    );

    const matchedExperts = experts.filter(
      (e) =>
        e.full_name.toLowerCase().includes(q) ||
        e.agency_name?.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.state_region?.toLowerCase().includes(q) ||
        e.postal_code?.toLowerCase().includes(q) ||
        e.professional_title.toLowerCase().includes(q)
    );

    return {
      states: matchedStates,
      cities: matchedCities,
      zips: matchedZips,
      experts: matchedExperts,
    };
  }, [searchQuery, states, cities, zips, experts]);

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
            placeholder="Search by city (e.g. San Diego), state (CA), or zip (92101)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#d5ded5] shadow-xs text-base text-[#001e00] placeholder:text-slate-400 focus:outline-none focus:border-[#108a00] focus:ring-2 focus:ring-[#108a00]/20 transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#108a00] text-white shadow-2xs'
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
                ? 'bg-[#108a00] text-white shadow-2xs'
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
                ? 'bg-[#108a00] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            States ({filtered.states.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zips')}
            className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
              activeTab === 'zips'
                ? 'bg-[#108a00] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Zip Codes ({filtered.zips.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: CITIES DIRECTORY */}
      {(activeTab === 'all' || activeTab === 'cities') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00] flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-[#108a00]" />
                <span>Browse AI Consultants by City</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore local AI developers and automation agencies by metropolitan area.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#108a00] bg-[#e4f7e6] px-3 py-1 rounded-full border border-[#b2e8b8]">
              {filtered.cities.length} Active Cities
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {filtered.cities.map((city) => (
              <Link
                key={`${city.slug}-${city.stateCode}`}
                href={`/locations/city/${city.slug}`}
                className="group p-4 rounded-2xl bg-white border border-[#e4ebe4] hover:border-[#108a00] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-mono font-bold text-[#108a00]">{city.stateCode}</span>
                    <span className="font-semibold text-slate-500">{city.expertCount} {city.expertCount === 1 ? 'Expert' : 'Experts'}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#001e00] group-hover:text-[#108a00] transition-colors leading-snug">
                    {city.name}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#108a00]">
                  <span>Explore City</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: STATES DIRECTORY */}
      {(activeTab === 'all' || activeTab === 'states') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00] flex items-center gap-2.5">
                <Building className="w-6 h-6 text-[#2563eb]" />
                <span>Browse AI Consultants by State</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Statewide hubs featuring verified specialists, regional case studies, and city directories.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#2563eb] bg-[#eff6ff] px-3 py-1 rounded-full border border-[#bfdbfe]">
              {filtered.states.length} States / Regions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.states.map((st) => (
              <Link
                key={st.code}
                href={`/locations/state/${st.slug}`}
                className="group p-5 rounded-2xl bg-white border border-[#e4ebe4] hover:border-[#2563eb] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#2563eb] font-mono font-black text-sm flex items-center justify-center border border-[#bfdbfe]">
                      {st.code}
                    </span>
                    <span className="text-xs font-bold text-[#2563eb] bg-[#eff6ff] px-2.5 py-0.5 rounded-full">
                      {st.expertCount} {st.expertCount === 1 ? 'Specialist' : 'Specialists'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-[#001e00] group-hover:text-[#2563eb] transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {st.cities.map((c) => c.name).join(', ')}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563eb]">
                  <span>View State Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: ZIP CODES DIRECTORY */}
      {(activeTab === 'all' || activeTab === 'zips') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e4ebe4] pb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-black text-[#001e00] flex items-center gap-2.5">
                <MapPin className="w-6 h-6 text-[#d97706]" />
                <span>Browse by Postal &amp; Zip Code</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Postal-level pages for ultra-local AI consulting, on-site audits, and regional support.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#d97706] bg-[#fffbeb] px-3 py-1 rounded-full border border-[#fde68a]">
              {filtered.zips.length} Zip Codes
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filtered.zips.map((z) => (
              <Link
                key={z.zip}
                href={`/locations/zip/${z.slug}`}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e4ebe4] hover:border-[#d97706] hover:shadow-xs transition-all text-xs"
              >
                <span className="font-mono font-bold text-[#b45309] group-hover:underline">
                  {z.zip}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-700 font-medium">{z.cityName}, {z.stateCode}</span>
                <span className="text-[10px] font-bold text-[#108a00] bg-[#e4f7e6] px-1.5 py-0.5 rounded">
                  {z.expertCount}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: ALL MATCHED LOCAL EXPERTS */}
      <section className="space-y-6 pt-6 border-t border-[#e4ebe4]">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-black text-[#001e00]">
              {searchQuery ? `Matched AI Specialists (${filtered.experts.length})` : 'All Vetted AI Specialists Across North America'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Click any city, state, or zip code on an expert card to navigate to their dedicated location hub.
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
