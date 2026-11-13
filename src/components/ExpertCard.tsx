import Link from 'next/link';
import type { DirectoryExpert } from '@/lib/listing';
import { ArrowRight, Building } from 'lucide-react';
import ExpertLocationLinks from './ExpertLocation';

export default function ExpertCard({
  expert,
  compact = false,
}: {
  expert: DirectoryExpert;
  compact?: boolean;
}) {
  return (
    <div className="hover-lift group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-rest hover:border-brand">
      <div>
        {!compact && (
          <div className="mb-4">
            <ExpertLocationLinks expert={expert} />
          </div>
        )}

        {/* Profile info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-canvas-muted border border-line shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expert.avatar_url}
              alt=""
              width={224}
              height={224}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0 pr-16 sm:pr-0">
            <h3 className="text-lg font-semibold text-ink group-hover:text-brand transition-colors truncate">
              <Link href={`/experts/${expert.slug}`}>
                {expert.full_name}
              </Link>
            </h3>
            <p className="text-sm text-brand font-bold truncate mt-0.5">{expert.professional_title}</p>
            {expert.agency_name && (
              <p className="text-sm text-muted flex items-center gap-1 mt-1 font-medium">
                <Building className="w-3.5 h-3.5 text-muted" />
                {expert.agency_name}
              </p>
            )}
          </div>
        </div>

        {!compact && (
          <p className="text-base text-ink-soft line-clamp-2 leading-relaxed mb-4 font-normal">
            {expert.tagline}
          </p>
        )}
      </div>

      <div className={`pt-4 border-t border-line-soft flex flex-wrap items-center gap-3 ${compact ? 'justify-between' : 'justify-end'}`}>
        {compact && <ExpertLocationLinks expert={expert} />}

        <Link
          href={`/experts/${expert.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-hover group-hover:translate-x-1 transition-all"
        >
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
