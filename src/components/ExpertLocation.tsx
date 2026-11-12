import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Expert } from '@/lib/types';
import { toCitySlug, toStateSlug, toZipSlug, getStateName } from '@/lib/locations';

interface ExpertLocationLinksProps {
  expert: Expert | { city: string; state_region?: string; postal_code?: string; country?: string };
  className?: string;
  iconClassName?: string;
  showZipBadge?: boolean;
  showCountry?: boolean;
}

export default function ExpertLocationLinks({
  expert,
  className = 'flex items-center gap-1.5 text-sm text-muted font-medium flex-wrap',
  iconClassName = 'w-4 h-4 text-muted shrink-0',
  showZipBadge = true,
  showCountry = false,
}: ExpertLocationLinksProps) {
  if (!expert.city) return null;

  const citySlug = toCitySlug(expert.city);
  const stateCode = expert.state_region?.trim().toUpperCase() || '';
  const stateSlug = stateCode ? toStateSlug(stateCode) : '';
  const stateFullName = stateCode ? getStateName(stateCode) : '';
  const zip = expert.postal_code?.trim() || '';
  const zipSlug = zip ? toZipSlug(zip) : '';

  return (
    <div className={className}>
      <MapPin className={iconClassName} />
      <Link
        href={`/locations/city/${citySlug}`}
        className="hover:text-brand hover:underline font-semibold text-ink transition-colors"
        title={`Find AI consultants and companies near ${expert.city}`}
      >
        {expert.city}
      </Link>
      {stateCode && (
        <>
          <span className="text-muted">,</span>
          <Link
            href={`/locations/state/${stateSlug}`}
            className="hover:text-brand hover:underline text-muted-strong transition-colors font-semibold"
            title={`Find AI consultants and companies in ${stateFullName || stateCode}`}
          >
            {stateCode}
          </Link>
        </>
      )}
      {showCountry && expert.country && (
        <>
          <span className="text-muted">,</span>
          <span className="text-muted">{expert.country}</span>
        </>
      )}
      {showZipBadge && zip && (
        <Link
          href={`/locations/zip/${zipSlug}`}
          className="text-xs font-mono font-bold text-brand bg-brand-soft hover:bg-brand-tint px-2 py-0.5 rounded-md border border-brand-line transition-colors ml-1 shadow-2xs"
          title={`Find AI consultants and companies near zip code ${zip}`}
        >
          {zip}
        </Link>
      )}
    </div>
  );
}
