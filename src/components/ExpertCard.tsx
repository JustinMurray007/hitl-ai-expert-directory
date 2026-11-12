import Link from 'next/link';
import { Expert } from '@/lib/types';
import { PlacementBadge, ToolBadge, BudgetBadge, EngagementBadge } from './Badge';
import { MapPin, ArrowRight, Building, MessageSquareQuote } from 'lucide-react';
import ExpertLocationLinks from './ExpertLocation';

export default function ExpertCard({
  expert,
  featured = false,
}: {
  expert: Expert;
  featured?: boolean;
}) {
  const primaryStudy = expert.case_studies?.[0];

  return (
    <div className="hover-lift group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-rest hover:border-brand">
      {/* Sponsor badge in top corner if featured */}
      {featured && (expert.listing_plan === 'premium' || expert.listing_plan === 'featured' || expert.sponsor_rank > 0) && (
        <div className="absolute top-5 right-5">
          <PlacementBadge plan={expert.listing_plan} sponsorRank={expert.sponsor_rank} />
        </div>
      )}

      <div>
        {/* Standard top bar (hidden on featured homepage cards) */}
        {!featured && (
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <PlacementBadge plan={expert.listing_plan} sponsorRank={expert.sponsor_rank} />
            </div>
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

        {/* Tagline */}
        <p className="text-base text-ink-soft line-clamp-2 leading-relaxed mb-4 font-normal">
          {expert.tagline}
        </p>

        {/* Core Trust Callout: Expert Thoughts... */}
        {primaryStudy && (
          <div className="mb-4 rounded-xl bg-brand-soft border border-brand-tint p-4 text-sm">
            <div className="flex items-center gap-2 text-brand font-bold mb-1.5 text-sm">
              <MessageSquareQuote className="w-4 h-4 text-brand" />
              <span>Expert Thoughts...</span>
            </div>
            <p className="text-brand-ink text-sm sm:text-base line-clamp-3 italic font-semibold leading-relaxed">
              &quot;{primaryStudy.hitl_oversight_mechanism}&quot;
            </p>
          </div>
        )}

        {/* Tools tags: only shown on standard directory pages, omitted on featured cards */}
        {!featured && (
          <div className="flex flex-wrap gap-2 mb-5">
            {(expert.tools ?? []).slice(0, 4).map((tool) => (
              <ToolBadge key={tool.id} name={tool.name} />
            ))}
            {(expert.tools ?? []).length > 4 && (
              <span className="text-sm font-bold text-brand bg-brand-soft px-3 py-1 rounded-md border border-brand-line self-center">
                +{(expert.tools ?? []).length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom meta & CTA */}
      <div className="pt-4 border-t border-line-soft flex items-center justify-between">
        {featured ? (
          /* On featured cards: location moved below the safeguard with no prices */
          <ExpertLocationLinks expert={expert} />
        ) : (
          /* On standard directory search cards: prices & engagement tier */
          <div className="flex flex-col gap-1.5">
            <BudgetBadge tier={expert.starting_budget} />
            <EngagementBadge model={expert.primary_engagement} />
          </div>
        )}

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
