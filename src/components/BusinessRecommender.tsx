'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PublicExpert } from '@/lib/listing';
import { type IndustryRecommendation } from '@/lib/recommendations';
import {
  bottlenecksForBusiness,
  defaultAreaSelection,
  groupedAreaRecommendations,
  toggleAreaSelection,
} from '@/lib/recommendation-selection';
import { toolPath } from '@/lib/tool-catalog';
import { ToolBadge } from '@/components/Badge';
import { isMatchEligible, showsPublicLinks } from '@/lib/listing';
import ExpertLocationLinks from '@/components/ExpertLocation';
import {
  Building,
  Calendar,
  CheckCircle2,
  Layers,
  Sparkles,
  TrendingUp,
  Wrench,
  ArrowRight,
} from 'lucide-react';

interface BusinessRecommenderProps {
  allExperts: PublicExpert[];
  industry: IndustryRecommendation;
}

export default function BusinessRecommender({ allExperts, industry }: BusinessRecommenderProps) {
  const bottlenecks = bottlenecksForBusiness(industry);
  const [selectedIds, setSelectedIds] = useState<string[]>(() => defaultAreaSelection(industry));
  const groups = groupedAreaRecommendations(bottlenecks, selectedIds);

  useEffect(() => {
    const arm = (window as Window & { __armReveal?: () => void }).__armReveal;
    arm?.();
  }, [selectedIds]);

  const eligibleExperts = allExperts.filter((exp) => isMatchEligible(exp));
  const seenExpertIds = new Set<string>();
  const matchedSpecialists: { expert: PublicExpert; categorySlug: string }[] = [];
  for (const group of groups) {
    const workflow = group.workflow;
    const direct = eligibleExperts.filter((exp) => workflow.matchingExpertSlugs.includes(exp.slug));
    const pool =
      direct.length > 0
        ? direct
        : eligibleExperts.filter((exp) => exp.categories.some((category) => category.slug === workflow.categorySlug)).slice(0, 2);
    for (const expert of pool) {
      if (seenExpertIds.has(expert.id)) continue;
      seenExpertIds.add(expert.id);
      matchedSpecialists.push({ expert, categorySlug: workflow.categorySlug });
    }
  }

  return (
    <div className="space-y-12">
      <div id="areas" className="scroll-mt-24 space-y-6 rounded-3xl border border-line bg-canvas-muted p-5 shadow-rest sm:p-8">
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">Operational bottlenecks or areas to improve</h2>
        <p className="text-sm font-medium text-muted">
          Select every area you want to improve. Tool recommendations stack for each one, grouped under that area.
        </p>
        <p aria-live="polite" className="text-sm font-semibold text-brand">
          {selectedIds.length === 0
            ? 'None selected yet.'
            : `${selectedIds.length} selected.`}
        </p>
        <div
          role="group"
          aria-label="Operational bottlenecks or areas to improve"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {bottlenecks.map((bottleneck) => {
            const isSelected = selectedIds.includes(bottleneck.id);
            return (
              <button
                key={bottleneck.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedIds((current) => toggleAreaSelection(current, bottleneck.id))}
                className={`flex min-h-11 cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6 ${
                  isSelected
                    ? 'border-brand bg-white shadow-md ring-2 ring-brand/20'
                    : 'border-line bg-white shadow-xs hover:border-brand/50 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="mb-3 flex justify-end">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                        isSelected ? 'border-brand bg-brand text-white' : 'border-line-strong bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-ink sm:text-lg">{bottleneck.label}</h3>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-muted-strong">{bottleneck.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-bold">
                  <span className={isSelected ? 'text-brand' : 'text-slate-400'}>
                    {isSelected ? '● Selected' : 'Add this area'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div id="results" className="scroll-mt-24 space-y-6">
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">Your tailored AI blueprint and specialists</h2>

        {groups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-center shadow-rest">
            <Wrench className="mx-auto mb-3 h-6 w-6 text-brand" />
            <p className="text-base font-medium text-ink">Select one or more areas to see the AI solution and recommended tools.</p>
          </div>
        ) : (
          groups.map((group) => (
            <article
              key={group.id}
              className="space-y-8 rounded-3xl border border-brand-tint bg-gradient-to-b from-brand-soft via-white to-brand-soft p-6 shadow-sm sm:p-10"
            >
              <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 md:flex-row md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">{group.workflow.title}</h3>
                  <p className="mt-2 text-base font-normal leading-relaxed text-muted-strong sm:text-lg">{group.workflow.problemSolved}</p>
                </div>
                <Link
                  href={`/match?category=${group.workflow.categorySlug}&need=${encodeURIComponent(
                    `Interested in implementing ${group.workflow.title} for ${industry.industryName}`,
                  )}`}
                  className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-brand-hover sm:w-auto sm:text-base"
                >
                  <Sparkles className="h-4 w-4" />
                  Request Implementation Intro
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="flex flex-col justify-between rounded-2xl border-2 border-brand-mid bg-brand-soft p-6 shadow-xs">
                  <div>
                    <h4 className="mb-3 text-base font-semibold text-ink">AI solution that may fit</h4>
                    <p className="text-base font-normal leading-relaxed text-brand-ink">{group.workflow.systemArchitecture}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border-2 border-brand bg-brand-soft p-6 shadow-xs">
                  <div>
                    <h4 className="mb-3 text-base font-semibold text-ink">Recommended tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.tools.map((tool) => (
                        <ToolBadge key={tool.slug ?? tool.name} name={tool.name} href={tool.slug ? toolPath(tool.slug) : undefined} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl border-2 border-accent-line bg-accent-soft p-6 shadow-xs">
                  <div>
                    <h4 className="mb-3 text-base font-semibold text-ink">Expected business impact</h4>
                    <p className="text-base font-semibold leading-relaxed text-accent-deep">{group.workflow.typicalRoi}</p>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}

        {matchedSpecialists.length > 0 && (
          <div className="space-y-5 border-t border-brand-tint pt-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-semibold text-ink sm:text-2xl">Specialists Ready to Build This for You</h3>
                <p className="mt-0.5 text-sm font-medium text-muted-strong sm:text-base">
                  These specialists can take a match for the areas you selected.
                </p>
              </div>
              <Link
                href="/experts"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-hover"
              >
                View specialists <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div data-reveal-stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {matchedSpecialists.map(({ expert, categorySlug }) => (
                <div
                  key={expert.id}
                  className="hover-lift flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-rest sm:p-6"
                >
                  <div>
                    <div className="mb-4 flex items-start gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-canvas-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={expert.avatar_url}
                          alt=""
                          width={224}
                          height={224}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-base font-semibold text-ink sm:text-lg">
                          <Link href={`/experts/${expert.slug}`} className="hover:text-brand">
                            {expert.full_name}
                          </Link>
                        </h4>
                        <p className="mt-0.5 truncate text-sm font-bold text-brand">{expert.professional_title}</p>
                        {expert.agency_name && (
                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted">
                            <Building className="h-3.5 w-3.5" />
                            {expert.agency_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-base font-normal leading-relaxed text-ink-soft">{expert.tagline}</p>
                    <div className="mb-4">
                      <ExpertLocationLinks expert={expert} />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 border-t border-line-soft pt-4">
                    {showsPublicLinks(expert) && expert.booking_url ? (
                      <a
                        href={expert.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand hover:text-brand-hover"
                      >
                        Book a call
                      </a>
                    ) : showsPublicLinks(expert) ? (
                      <Link
                        href={`/match?expert=${encodeURIComponent(expert.full_name)}&category=${encodeURIComponent(categorySlug)}`}
                        className="text-sm font-medium text-brand hover:text-brand-hover"
                      >
                        Request a match
                      </Link>
                    ) : (
                      <Link href={`/experts/${expert.slug}`} className="text-sm font-medium text-brand hover:text-brand-hover">
                        View profile
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
