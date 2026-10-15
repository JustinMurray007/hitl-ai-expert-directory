import Link from 'next/link';
import Image from 'next/image';
import { Expert } from '@/lib/types';
import { VerifiedBadge, SponsorBadge, ToolBadge, BudgetBadge, EngagementBadge } from './Badge';
import { MapPin, ShieldCheck, ArrowRight, Clock, Building } from 'lucide-react';

export default function ExpertCard({ expert }: { expert: Expert }) {
  const primaryStudy = expert.case_studies?.[0];

  return (
    <div className="group glass-panel rounded-2xl p-6 relative flex flex-col justify-between glass-panel-hover border border-white/[0.08] bg-[#11131c]/90">
      <div>
        {/* Top bar: Verified & Sponsor status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {expert.is_verified ? (
              <VerifiedBadge count={expert.verified_case_study_count} />
            ) : (
              <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                Community Member
              </span>
            )}
            {expert.sponsor_rank > 0 && <SponsorBadge />}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>
              {expert.city}{expert.state_region ? `, ${expert.state_region}` : ''}
            </span>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expert.avatar_url}
              alt={expert.full_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
              <Link href={`/experts/${expert.slug}`}>
                {expert.full_name}
              </Link>
            </h3>
            <p className="text-xs text-zinc-400 truncate">{expert.professional_title}</p>
            {expert.agency_name && (
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3" />
                {expert.agency_name}
              </p>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
          {expert.tagline}
        </p>

        {/* Core HITL Trust Callout: Mandatory Human Oversight Mechanism */}
        {primaryStudy && (
          <div className="mb-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 p-3 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proven Human-in-the-Loop Safeguard:</span>
            </div>
            <p className="text-zinc-300 text-[11px] line-clamp-2 italic">
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
            <span className="text-[11px] text-zinc-500 self-center">
              +{expert.tools.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom meta & CTA */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <BudgetBadge tier={expert.starting_budget} />
          <span className="text-[10px] text-zinc-500">
            <EngagementBadge model={expert.primary_engagement} />
          </span>
        </div>

        <Link
          href={`/experts/${expert.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
        >
          View Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
