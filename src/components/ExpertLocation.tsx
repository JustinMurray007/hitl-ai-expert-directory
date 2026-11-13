import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Expert } from '@/lib/types';
import { toCitySlug, toStateSlug, getStateName } from '@/lib/locations';

interface ExpertLocationLinksProps {
  expert: Expert | { city: string; state_region?: string; postal_code?: string; country?: string };
  className?: string;
  iconClassName?: string;
  showCountry?: boolean;
}

export default function ExpertLocationLinks({
  expert,
  className = 'flex items-center gap-1.5 text-sm text-muted font-medium flex-wrap',
  iconClassName = 'w-4 h-4 text-muted shrink-0',
  showCountry = false,
}: ExpertLocationLinksProps) {
  if (!expert.city) return null;

  const citySlug = toCitySlug(expert.city);
  const stateCode = expert.state_region?.trim().toUpperCase() || '';
  const stateSlug = stateCode ? toStateSlug(stateCode) : '';
  const stateFullName = stateCode ? getStateName(stateCode) : '';
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
    </div>
  );
}
