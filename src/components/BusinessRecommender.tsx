'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Expert } from '@/lib/types';
import {
  INDUSTRY_RECOMMENDATIONS,
  IndustryRecommendation,
  COMMON_GROWTH_BOTTLENECKS,
} from '@/lib/recommendations';
import { ToolBadge } from '@/components/Badge';
import { businessPath } from '@/lib/business-routes';
import { isMatchEligible, showsPublicLinks } from '@/lib/listing';
import ExpertLocationLinks from '@/components/ExpertLocation';
import {
  Activity,
  Wrench,
  Truck,
  Briefcase,
  Building2,
  BarChart3,
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Factory,
  FileText,
  GraduationCap,
  Store,
  HelpCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowDown,
  TrendingUp,
  Layers,
  MapPin,
  Calendar,
  Building,
  Megaphone,
  Target,
  UserCheck,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Activity,
  Wrench,
  Truck,
  Briefcase,
  Building2,
  BarChart3,
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Factory,
  FileText,
  GraduationCap,
  Store,
  HelpCircle,
  Sparkles,
  CheckCircle2,
};

interface BusinessRecommenderProps {
  allExperts: Expert[];
  initialIndustrySlug?: string;
}

export default function BusinessRecommender({
  allExperts,
  initialIndustrySlug,
}: BusinessRecommenderProps) {
  const [selectedIndustry] = useState<IndustryRecommendation>(() => {
    if (initialIndustrySlug) {
      const match = INDUSTRY_RECOMMENDATIONS.find(
        (i) =>
          i.industrySlug === initialIndustrySlug ||
          i.id === initialIndustrySlug ||
          i.industrySlug.replace(/-/g, '_') === initialIndustrySlug ||
          initialIndustrySlug.replace(/-/g, '_') === i.industrySlug.replace(/-/g, '_')
      );
      if (match) return match;
    }
    return INDUSTRY_RECOMMENDATIONS[0];
  });

  const [hasSelectedIndustry] = useState<boolean>(() => {
    return Boolean(initialIndustrySlug);
  });

  // Combine industry-specific bottlenecks with the 4 common cards: Marketing, Advertising, General Lead/New Customer Growth, Customer Retention
  const displayBottlenecks = [
    ...selectedIndustry.commonBottlenecks,
    ...COMMON_GROWTH_BOTTLENECKS,
  ];

  const [selectedBottleneckId, setSelectedBottleneckId] = useState<string>(() => {
    return selectedIndustry.commonBottlenecks[0]?.id || COMMON_GROWTH_BOTTLENECKS[0].id;
  });

  const activeBottleneck =
    displayBottlenecks.find((b) => b.id === selectedBottleneckId) ||
    displayBottlenecks[0];

  const workflow = activeBottleneck?.recommendedWorkflow;

  const handleSelectBottleneck = (id: string) => {
    setSelectedBottleneckId(id);
    setTimeout(() => {
      document.getElementById('step-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const eligibleExperts = allExperts.filter((exp) => isMatchEligible(exp));

  // Find matching experts who can still receive a match
  const matchedExperts = eligibleExperts.filter((exp) => {
    if (!workflow) return false;
    return workflow.matchingExpertSlugs.includes(exp.slug);
  });

  // Fallback if specific slug match is short: match by category
  const fallbackExperts =
    matchedExperts.length > 0
      ? matchedExperts
      : eligibleExperts.filter((exp) =>
          exp.categories.some((c) => c.slug === workflow?.categorySlug)
        ).slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Step 1: Select Industry */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-7 h-7 rounded-full bg-brand text-white text-sm font-semibold flex items-center justify-center font-mono shadow-xs">
            1
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-ink">
            Select Your Business Type
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INDUSTRY_RECOMMENDATIONS.map((ind) => {
            const Icon = iconMap[ind.iconName] || Briefcase;
            const isSelected = selectedIndustry.id === ind.id;
            return (
              <Link
                key={ind.id}
                href={businessPath(ind.industrySlug)}
                className={`p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-soft border-2 border-brand shadow-sm ring-1 ring-brand/30'
                    : 'bg-white border-line hover:border-brand/50 hover:shadow-md shadow-xs'
                }`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 ${
                      isSelected
                        ? 'bg-brand text-white'
                        : 'bg-brand-soft text-brand'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-ink leading-snug">
                    {ind.industryName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {ind.industryDescription}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-brand' : 'text-slate-400'}>
                    {isSelected ? '● Active Selection' : 'Open this business'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Animated Arrow Down Indicator to Step 2 */}
        {hasSelectedIndustry && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById('step-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-brand text-ink hover:bg-brand-soft shadow-sm transition-all cursor-pointer animate-gentle-bounce group"
            >
              <span className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
                Business Selected — Scroll Down to Step 2
              </span>
              <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowDown className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Select Operational Pain Point */}
      <div
        id="step-2"
        className="scroll-mt-24 rounded-3xl bg-canvas-muted border border-line p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-brand text-white text-sm font-semibold flex items-center justify-center font-mono shadow-xs">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-ink">
              What is Your Biggest Operational Bottleneck?
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-brand bg-white px-3 py-1.5 rounded-full border border-line-strong shadow-2xs">
            Industry: <strong className="font-semibold text-ink">{selectedIndustry.industryName}</strong>
          </span>
        </div>
        <p className="text-sm text-muted font-medium">
          Choose the friction point you want to solve. We will generate the recommended architecture, required staff review checkpoints, and specialists.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayBottlenecks.map((b) => {
            const isSelected = selectedBottleneckId === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSelectBottleneck(b.id)}
                className={`p-5 sm:p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-2 border-brand shadow-md ring-2 ring-brand/20'
                    : 'bg-white/95 border-line hover:bg-white hover:border-brand/50 hover:shadow-md shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    {b.badge && (
                      <span className="text-xs uppercase font-mono font-bold text-brand bg-brand-soft px-2.5 py-0.5 rounded-full border border-brand-line">
                        {b.badge}
                      </span>
                    )}
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-auto ${
                        isSelected
                          ? 'border-brand bg-brand text-white'
                          : 'border-line-strong bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-ink">
                    {b.label}
                  </h3>
                  <p className="text-sm text-muted-strong mt-2 leading-relaxed font-normal">
                    {b.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-brand' : 'text-slate-400'}>
                    {isSelected ? '● Selected Solution' : 'Click to Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated AI Recommendation Blueprint */}
      {workflow && (
        <div id="step-3" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-brand text-white text-sm font-semibold flex items-center justify-center font-mono shadow-xs">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-ink">
              Your Tailored AI Blueprint &amp; Specialists
            </h2>
          </div>

          <div className="rounded-3xl p-6 sm:p-10 border border-brand-tint bg-gradient-to-b from-brand-soft via-white to-brand-soft shadow-sm space-y-8">
            {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-line pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-3 shadow-xs">
                <Sparkles className="w-4 h-4 text-brand" />
                <span>Recommended AI Blueprint • {selectedIndustry.industryName}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                {workflow.title}
              </h3>
              <p className="text-base sm:text-lg text-muted-strong mt-2 font-normal leading-relaxed">
                {workflow.problemSolved}
              </p>
            </div>

            <Link
              href={`/match?category=${workflow.categorySlug}&need=${encodeURIComponent(
                `Interested in implementing ${workflow.title} for ${selectedIndustry.industryName}`
              )}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-sm sm:text-base shadow-sm transition-all shrink-0 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Request Implementation Intro
            </Link>
          </div>

          {/* Blueprint Details Grid: Distinct Three-Color Pillar Separation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Automated Architecture - Cobalt Blue */}
            <div className="rounded-2xl bg-brand-soft p-6 border-2 border-brand-mid shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-brand uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand" />
                    <span>System Architecture</span>
                  </h4>
                  <span className="text-sm font-bold text-brand-hover bg-white px-3 py-1 rounded-full border border-brand-line">
                    Automated
                  </span>
                </div>
                <p className="text-base text-brand-ink leading-relaxed font-normal">
                  {workflow.systemArchitecture}
                </p>
              </div>
            </div>

            {/* 2. Human Safety Check - Signature Emerald Green */}
            <div className="rounded-2xl bg-brand-soft p-6 border-2 border-brand shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-brand uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand" />
                    <span>Human Safety Checkpoint</span>
                  </h4>
                  <span className="text-sm font-bold text-brand-ink bg-white px-3 py-1 rounded-full border border-brand-line">
                    Staff Review
                  </span>
                </div>
                <p className="text-base text-brand-ink leading-relaxed font-bold">
                  {workflow.hitlSafeguard}
                </p>
              </div>
            </div>

            {/* 3. Expected Business Impact - Warm Honey Amber */}
            <div className="rounded-2xl bg-accent-soft p-6 border-2 border-accent-line shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-accent uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span>Expected Business Impact</span>
                  </h4>
                  <span className="text-sm font-bold text-accent-ink bg-white px-3 py-1 rounded-full border border-accent-line">
                    Expected impact
                  </span>
                </div>
                <p className="text-base text-accent-deep leading-relaxed font-semibold">
                  {workflow.typicalRoi}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-tint">
                <span className="text-sm font-bold uppercase tracking-wider text-accent-deep block mb-2.5">Recommended Tools:</span>
                <div className="flex flex-wrap gap-1.5">
                  {workflow.recommendedStack.map((tool) => (
                    <ToolBadge key={tool} name={tool} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matched Experts / Companies Who Can Implement */}
          <div className="space-y-5 pt-6 border-t border-brand-tint">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xl sm:text-2xl font-semibold text-ink">
                  Specialists Ready to Build This for You
                </h4>
                <p className="text-sm sm:text-base text-muted-strong font-medium mt-0.5">
                  These specialists can take a match for this kind of work:
                </p>
              </div>
              <Link
                href={`/experts?category=${workflow.categorySlug}`}
                className="text-sm font-bold text-brand hover:text-brand-hover inline-flex items-center gap-1.5 shrink-0"
              >
                View Category Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fallbackExperts.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl p-6 border border-line bg-white shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-canvas-muted border border-line shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={exp.avatar_url}
                          alt={exp.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-base sm:text-lg text-ink truncate">
                            <Link href={`/experts/${exp.slug}`} className="hover:text-brand">
                              {exp.full_name}
                            </Link>
                          </h5>
                        </div>
                        <p className="text-sm text-brand font-bold truncate mt-0.5">
                          {exp.professional_title}
                        </p>
                        {exp.agency_name && (
                          <p className="text-sm text-muted flex items-center gap-1.5 mt-1 font-medium">
                            <Building className="w-3.5 h-3.5" />
                            {exp.agency_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-base text-ink-soft line-clamp-2 leading-relaxed mb-4 font-normal">
                      {exp.tagline}
                    </p>

                    <div className="mb-4">
                      <ExpertLocationLinks expert={exp} />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line-soft flex items-center justify-between">
                    <span className="text-sm font-bold text-brand bg-brand-soft px-3 py-1 rounded-full border border-brand-line">
                      Starting: {exp.starting_budget.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/experts/${exp.slug}`}
                        className="text-sm font-bold text-ink hover:text-brand px-4 py-2 rounded-full border border-line hover:border-brand transition-colors"
                      >
                        View Profile
                      </Link>
                      {showsPublicLinks(exp) && exp.booking_url ? (
                        <a
                          href={exp.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-brand hover:bg-brand-hover px-4 py-2 rounded-full shadow-xs transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Call
                        </a>
                      ) : showsPublicLinks(exp) ? (
                        <Link
                          href={`/match?expert=${encodeURIComponent(exp.full_name)}&category=${encodeURIComponent(
                            workflow?.categorySlug || ''
                          )}&budget=${encodeURIComponent(exp.starting_budget)}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-brand hover:bg-brand-hover px-4 py-2 rounded-full shadow-xs transition-colors"
                        >
                          Request Match
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
