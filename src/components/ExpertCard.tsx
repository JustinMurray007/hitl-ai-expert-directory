import Link from 'next/link';
import { Expert } from '@/lib/types';
import { VerifiedBadge, SponsorBadge, ToolBadge, BudgetBadge, EngagementBadge } from './Badge';
import { MapPin, ShieldCheck, ArrowRight, Building } from 'lucide-react';

export default function ExpertCard({ expert }: { expert: Expert }) {
  const primaryStudy = expert.case_studies?.[0];

  return (
    <div className="group rounded-2xl p-6 relative flex flex-col justify-between border border-[#e4ebe4] bg-white shadow-xs hover:shadow-md hover:border-[#108a00] transition-all">
      <div>
        {/* Top bar: Verified & Sponsor status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {expert.is_verified ? (
              <VerifiedBadge count={expert.verified_case_study_count} />
            ) : (
              <span className="text-xs text-[#5e6d55] font-mono bg-[#f4f6f4] px-2.5 py-0.5 rounded-full border border-[#dbe3db]">
                Community Member
              </span>
            )}
            {expert.sponsor_rank > 0 && <SponsorBadge />}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5e6d55]">
            <MapPin className="w-3.5 h-3.5 text-[#889888]" />
            <span>
              {expert.city}{expert.state_region ? `, ${expert.state_region}` : ''}
            </span>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#f4f6f4] border border-[#e4ebe4] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expert.avatar_url}
              alt={expert.full_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#001e00] group-hover:text-[#108a00] transition-colors truncate">
              <Link href={`/experts/${expert.slug}`}>
                {expert.full_name}
              </Link>
            </h3>
            <p className="text-xs text-[#5e6d55] font-medium truncate">{expert.professional_title}</p>
            {expert.agency_name && (
              <p className="text-xs text-[#738273] flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3 text-[#889888]" />
                {expert.agency_name}
              </p>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-[#334133] line-clamp-2 leading-relaxed mb-4">
          {expert.tagline}
        </p>

        {/* Core HITL Trust Callout: Mandatory Human Oversight Mechanism */}
        {primaryStudy && (
          <div className="mb-4 rounded-xl bg-[#f2faf3] border border-[#c1eec6] p-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#108a00] font-bold mb-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#108a00]" />
              <span>Proven Human-in-the-Loop Safeguard:</span>
            </div>
            <p className="text-[#13544e] text-[11px] line-clamp-2 italic font-medium">
              &quot;{primaryStudy.hitl_oversight_mechanism}&quot;
            </p>
          </div>
        )}

        {/* Tools and taxonomy */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {expert.tools.slice(0, 4).map((tool) => (
            <ToolBadge key={tool.id} name={tool.name} />
          ))}
          {expert.tools.length > 4 && (
            <span className="text-[11px] text-[#738273] self-center">
              +{expert.tools.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom meta & CTA */}
      <div className="pt-4 border-t border-[#f0f3f0] flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <BudgetBadge tier={expert.starting_budget} />
          <span className="text-[10px] text-[#738273]">
            <EngagementBadge model={expert.primary_engagement} />
          </span>
        </div>

        <Link
          href={`/experts/${expert.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#108a00] group-hover:text-[#14a800] group-hover:translate-x-0.5 transition-all"
        >
          View Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
