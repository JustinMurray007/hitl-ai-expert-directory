import Link from 'next/link';
import { Expert } from '@/lib/types';
import { VerifiedBadge, SponsorBadge, ToolBadge, BudgetBadge, EngagementBadge } from './Badge';
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
    <div className="group rounded-2xl p-6 relative flex flex-col justify-between border border-[#e4ebe4] bg-white shadow-xs hover:shadow-md hover:border-[#108a00] transition-all">
      {/* Sponsor badge in top corner if featured */}
      {featured && expert.sponsor_rank > 0 && (
        <div className="absolute top-5 right-5">
          <SponsorBadge />
        </div>
      )}

      <div>
        {/* Standard top bar (hidden on featured homepage cards) */}
        {!featured && (
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              {expert.is_verified ? (
                <VerifiedBadge count={expert.verified_case_study_count} />
              ) : (
                <span className="text-sm text-[#5e6d55] font-mono bg-[#f4f6f4] px-3 py-1 rounded-full border border-[#dbe3db]">
                  Community Member
                </span>
              )}
              {expert.sponsor_rank > 0 && <SponsorBadge />}
            </div>
            <ExpertLocationLinks expert={expert} />
          </div>
        )}

        {/* Profile info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f4f6f4] border border-[#e4ebe4] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expert.avatar_url}
              alt={expert.full_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0 pr-16 sm:pr-0">
            <h3 className="text-lg font-extrabold text-[#001e00] group-hover:text-[#108a00] transition-colors truncate">
              <Link href={`/experts/${expert.slug}`}>
                {expert.full_name}
              </Link>
            </h3>
            <p className="text-sm text-[#108a00] font-bold truncate mt-0.5">{expert.professional_title}</p>
            {expert.agency_name && (
              <p className="text-sm text-[#5e6d55] flex items-center gap-1 mt-1 font-medium">
                <Building className="w-3.5 h-3.5 text-[#889888]" />
                {expert.agency_name}
              </p>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-base text-[#223022] line-clamp-2 leading-relaxed mb-4 font-normal">
          {expert.tagline}
        </p>

        {/* Core Trust Callout: Expert Thoughts... */}
        {primaryStudy && (
          <div className="mb-4 rounded-xl bg-[#f2faf3] border border-[#c1eec6] p-4 text-sm">
            <div className="flex items-center gap-2 text-[#108a00] font-bold mb-1.5 text-sm">
              <MessageSquareQuote className="w-4 h-4 text-[#108a00]" />
              <span>Expert Thoughts...</span>
            </div>
            <p className="text-[#0f3d17] text-sm sm:text-base line-clamp-3 italic font-semibold leading-relaxed">
              &quot;{primaryStudy.hitl_oversight_mechanism}&quot;
            </p>
          </div>
        )}

        {/* Tools tags: only shown on standard directory pages, omitted on featured cards */}
        {!featured && (
          <div className="flex flex-wrap gap-2 mb-5">
            {expert.tools.slice(0, 4).map((tool) => (
              <ToolBadge key={tool.id} name={tool.name} />
            ))}
            {expert.tools.length > 4 && (
              <span className="text-sm font-bold text-[#2563eb] bg-[#eff6ff] px-3 py-1 rounded-md border border-[#bfdbfe] self-center">
                +{expert.tools.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom meta & CTA */}
      <div className="pt-4 border-t border-[#f0f3f0] flex items-center justify-between">
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
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#108a00] hover:text-[#14a800] group-hover:translate-x-1 transition-all"
        >
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
