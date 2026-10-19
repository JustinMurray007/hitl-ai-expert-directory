import { Expert } from './types';

// Map of standard 2-letter postal abbreviations to full State / Province names
export const STATE_NAME_MAP: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
  // Canada provinces
  ON: 'Ontario',
  BC: 'British Columbia',
  QC: 'Quebec',
  AB: 'Alberta',
};

// Reverse map: "california" -> "CA", "new-york" -> "NY"
export const SLUG_TO_STATE_CODE_MAP: Record<string, string> = {};
Object.entries(STATE_NAME_MAP).forEach(([code, name]) => {
  const codeSlug = code.toLowerCase();
  const nameSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  SLUG_TO_STATE_CODE_MAP[codeSlug] = code;
  SLUG_TO_STATE_CODE_MAP[nameSlug] = code;
});

export function toCitySlug(city: string): string {
  if (!city) return '';
  return city
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function toStateSlug(stateOrCode: string): string {
  if (!stateOrCode) return '';
  const clean = stateOrCode.trim().toUpperCase();
  const fullName = STATE_NAME_MAP[clean] || stateOrCode;
  return fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function toZipSlug(zip: string): string {
  if (!zip) return '';
  return zip
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function getStateName(stateOrCode: string): string {
  if (!stateOrCode) return '';
  const upper = stateOrCode.trim().toUpperCase();
  if (STATE_NAME_MAP[upper]) return STATE_NAME_MAP[upper];

  // Try matching via slug
  const normalizedSlug = stateOrCode.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  const code = SLUG_TO_STATE_CODE_MAP[normalizedSlug];
  if (code && STATE_NAME_MAP[code]) return STATE_NAME_MAP[code];

  return stateOrCode;
}

export function getStateCode(stateOrName: string): string {
  if (!stateOrName) return '';
  const upper = stateOrName.trim().toUpperCase();
  if (STATE_NAME_MAP[upper]) return upper;

  const normalizedSlug = stateOrName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  return SLUG_TO_STATE_CODE_MAP[normalizedSlug] || upper;
}

export interface LocationCitySummary {
  name: string;
  slug: string;
  stateCode: string;
  stateName: string;
  stateSlug: string;
  expertCount: number;
  zips: string[];
}

export interface LocationStateSummary {
  code: string;
  name: string;
  slug: string;
  expertCount: number;
  cities: LocationCitySummary[];
  zips: string[];
}

export interface LocationZipSummary {
  zip: string;
  slug: string;
  cityName: string;
  citySlug: string;
  stateCode: string;
  stateName: string;
  stateSlug: string;
  expertCount: number;
}

export function getLocationsSummary(experts: Expert[]) {
  const stateMap: Record<string, { code: string; name: string; slug: string; experts: Expert[]; citiesMap: Record<string, LocationCitySummary>; zips: Set<string> }> = {};
  const cityMap: Record<string, LocationCitySummary & { experts: Expert[] }> = {};
  const zipMap: Record<string, LocationZipSummary & { experts: Expert[] }> = {};

  for (const exp of experts) {
    if (!exp.city) continue;

    const citySlug = toCitySlug(exp.city);
    const stateCode = exp.state_region ? getStateCode(exp.state_region) : 'US';
    const stateName = getStateName(stateCode);
    const stateSlug = toStateSlug(stateCode);
    const zip = exp.postal_code?.trim() || '';
    const zipSlug = toZipSlug(zip);

    // Track state
    if (!stateMap[stateCode]) {
      stateMap[stateCode] = {
        code: stateCode,
        name: stateName,
        slug: stateSlug,
        experts: [],
        citiesMap: {},
        zips: new Set<string>(),
      };
    }
    stateMap[stateCode].experts.push(exp);
    if (zip) stateMap[stateCode].zips.add(zip);

    // Track city
    const cityKey = `${citySlug}-${stateCode.toLowerCase()}`;
    if (!cityMap[cityKey]) {
      cityMap[cityKey] = {
        name: exp.city,
        slug: citySlug,
        stateCode,
        stateName,
        stateSlug,
        expertCount: 0,
        zips: [],
        experts: [],
      };
    }
    cityMap[cityKey].expertCount += 1;
    cityMap[cityKey].experts.push(exp);
    if (zip && !cityMap[cityKey].zips.includes(zip)) {
      cityMap[cityKey].zips.push(zip);
    }
    stateMap[stateCode].citiesMap[citySlug] = cityMap[cityKey];

    // Track zip
    if (zip) {
      if (!zipMap[zipSlug]) {
        zipMap[zipSlug] = {
          zip,
          slug: zipSlug,
          cityName: exp.city,
          citySlug,
          stateCode,
          stateName,
          stateSlug,
          expertCount: 0,
          experts: [],
        };
      }
      zipMap[zipSlug].expertCount += 1;
      zipMap[zipSlug].experts.push(exp);
    }
  }

  // Convert to sorted lists
  const states: LocationStateSummary[] = Object.values(stateMap)
    .map((s) => ({
      code: s.code,
      name: s.name,
      slug: s.slug,
      expertCount: s.experts.length,
      cities: Object.values(s.citiesMap).sort((a, b) => b.expertCount - a.expertCount),
      zips: Array.from(s.zips).sort(),
    }))
    .sort((a, b) => b.expertCount - a.expertCount || a.name.localeCompare(b.name));

  const cities: LocationCitySummary[] = Object.values(cityMap).sort(
    (a, b) => b.expertCount - a.expertCount || a.name.localeCompare(b.name)
  );

  const zips: LocationZipSummary[] = Object.values(zipMap).sort(
    (a, b) => b.expertCount - a.expertCount || a.zip.localeCompare(b.zip)
  );

  return {
    states,
    cities,
    zips,
  };
}

export function getExpertsByCity(citySlug: string, experts: Expert[]): { experts: Expert[]; cityName: string; stateCode: string; stateName: string; stateSlug: string; zips: string[] } {
  const matched = experts.filter((e) => toCitySlug(e.city) === citySlug);
  if (matched.length === 0) {
    return { experts: [], cityName: '', stateCode: '', stateName: '', stateSlug: '', zips: [] };
  }
  const primary = matched[0];
  const stateCode = primary.state_region ? getStateCode(primary.state_region) : '';
  const stateName = getStateName(stateCode);
  const stateSlug = toStateSlug(stateCode);
  const zips = Array.from(new Set(matched.map((e) => e.postal_code).filter(Boolean) as string[]));

  return {
    experts: matched,
    cityName: primary.city,
    stateCode,
    stateName,
    stateSlug,
    zips,
  };
}

export function getExpertsByState(stateSlug: string, experts: Expert[]): { experts: Expert[]; stateCode: string; stateName: string; cities: LocationCitySummary[]; zips: string[] } {
  const stateCode = SLUG_TO_STATE_CODE_MAP[stateSlug.toLowerCase()] || stateSlug.toUpperCase();
  const matched = experts.filter((e) => {
    if (!e.state_region) return false;
    const eCode = getStateCode(e.state_region);
    return eCode.toLowerCase() === stateCode.toLowerCase() || toStateSlug(e.state_region) === stateSlug.toLowerCase();
  });

  const stateName = getStateName(stateCode);
  const summary = getLocationsSummary(matched);
  const zips = Array.from(new Set(matched.map((e) => e.postal_code).filter(Boolean) as string[])).sort();

  return {
    experts: matched,
    stateCode,
    stateName,
    cities: summary.cities,
    zips,
  };
}

export function getExpertsByZip(zipSlug: string, experts: Expert[]): { experts: Expert[]; zip: string; cityName: string; citySlug: string; stateCode: string; stateName: string; stateSlug: string } {
  const matched = experts.filter((e) => e.postal_code && toZipSlug(e.postal_code) === zipSlug.toLowerCase());
  if (matched.length === 0) {
    return { experts: [], zip: zipSlug.toUpperCase(), cityName: '', citySlug: '', stateCode: '', stateName: '', stateSlug: '' };
  }
  const primary = matched[0];
  const stateCode = primary.state_region ? getStateCode(primary.state_region) : '';
  const stateName = getStateName(stateCode);
  const stateSlug = toStateSlug(stateCode);

  return {
    experts: matched,
    zip: primary.postal_code || zipSlug.toUpperCase(),
    cityName: primary.city,
    citySlug: toCitySlug(primary.city),
    stateCode,
    stateName,
    stateSlug,
  };
}
