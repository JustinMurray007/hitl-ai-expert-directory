'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Expert } from '@/lib/types';
import { INDUSTRY_RECOMMENDATIONS, IndustryRecommendation } from '@/lib/recommendations';
import { VerifiedBadge, ToolBadge } from '@/components/Badge';
import {
  Activity,
  Wrench,
  Truck,
  Briefcase,
  Building2,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  MapPin,
  Calendar,
  Building,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Activity,
  Wrench,
  Truck,
  Briefcase,
  Building2,
  BarChart3,
};

interface BusinessRecommenderProps {
  allExperts: Expert[];
  initialIndustrySlug?: string;
}

export default function BusinessRecommender({
  allExperts,
  initialIndustrySlug,
}: BusinessRecommenderProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryRecommendation>(() => {
    if (initialIndustrySlug) {
      const match = INDUSTRY_RECOMMENDATIONS.find((i) => i.industrySlug === initialIndustrySlug);
      if (match) return match;
    }
    return INDUSTRY_RECOMMENDATIONS[0];
  });

  const [selectedBottleneckId, setSelectedBottleneckId] = useState<string>(() => {
    return selectedIndustry.commonBottlenecks[0]?.id || '';
  });

  const activeBottleneck =
    selectedIndustry.commonBottlenecks.find((b) => b.id === selectedBottleneckId) ||
    selectedIndustry.commonBottlenecks[0];

  const workflow = activeBottleneck?.recommendedWorkflow;

  // Find matching experts
  const matchedExperts = allExperts.filter((exp) => {
    if (!workflow) return false;
    return workflow.matchingExpertSlugs.includes(exp.slug);
  });

  // Fallback if specific slug match is short: match by category
  const fallbackExperts =
    matchedExperts.length > 0
      ? matchedExperts
      : allExperts.filter((exp) =>
          exp.categories.some((c) => c.slug === workflow?.categorySlug)
        ).slice(0, 2);

  return (
    <div className="space-y-12">
      {/* Step 1: Select Industry */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[#108a00] text-white text-xs font-bold flex items-center justify-center font-mono">
            1
          </span>
          <h2 className="text-lg font-black text-[#001e00]">
            Select Your Industry or Business Type
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {INDUSTRY_RECOMMENDATIONS.map((ind) => {
            const Icon = iconMap[ind.iconName] || Briefcase;
            const isSelected = selectedIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => {
                  setSelectedIndustry(ind);
                  setSelectedBottleneckId(ind.commonBottlenecks[0]?.id || '');
                }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#edf7ee] border-2 border-[#108a00] shadow-sm'
                    : 'bg-white border-[#e4ebe4] hover:border-[#108a00]/50 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected
                      ? 'bg-[#108a00] text-white'
                      : 'bg-[#e4f7e6] text-[#108a00]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-[#001e00] leading-snug">
                    {ind.industryName}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Operational Pain Point */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-[#108a00] text-white text-xs font-bold flex items-center justify-center font-mono">
            2
          </span>
          <h2 className="text-lg font-black text-[#001e00]">
            What is Your Biggest Operational Bottleneck?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedIndustry.commonBottlenecks.map((b) => {
            const isSelected = selectedBottleneckId === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBottleneckId(b.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-[#108a00] shadow-md ring-2 ring-[#108a00]/10'
                    : 'bg-white border-[#e4ebe4] hover:border-[#cbd5cb] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-sm text-[#001e00]">
                      {b.label}
                    </h3>
                    <p className="text-xs text-[#5e6d55] mt-1.5 leading-relaxed font-medium">
                      {b.description}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#108a00] bg-[#108a00] text-white'
                        : 'border-[#cbd5cb] bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated AI Recommendation Blueprint */}
      {workflow && (
        <div className="rounded-3xl p-6 sm:p-10 border border-[#b2e8b8] bg-[#edf7ee] shadow-sm space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#cde8cf] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#108a00]" />
                <span>Recommended AI Solution for {selectedIndustry.industryName}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#001e00]">
                {workflow.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#465a46] mt-1 font-medium">
                {workflow.problemSolved}
              </p>
            </div>

            <Link
              href={`/match?category=${workflow.categorySlug}&need=${encodeURIComponent(
                `Interested in implementing ${workflow.title} for ${selectedIndustry.industryName}`
              )}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-sm transition-all shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              Request Implementation Intro
            </Link>
          </div>

          {/* Blueprint Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Architecture */}
            <div className="rounded-2xl bg-white p-5 border border-[#e4ebe4] shadow-xs">
              <h4 className="text-xs font-bold text-[#001e00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#108a00]" />
                <span>System Architecture</span>
              </h4>
              <p className="text-xs text-[#5e6d55] leading-relaxed font-medium">
                {workflow.systemArchitecture}
              </p>
            </div>

            {/* THE HITL GUARDRAIL */}
            <div className="rounded-2xl bg-[#f2faf3] p-5 border-2 border-[#108a00] shadow-xs">
              <h4 className="text-xs font-bold text-[#108a00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#108a00]" />
                <span>Required Human-in-the-Loop Safeguard</span>
              </h4>
              <p className="text-xs text-[#0f3d17] leading-relaxed font-semibold">
                {workflow.hitlSafeguard}
              </p>
            </div>

            {/* ROI */}
            <div className="rounded-2xl bg-white p-5 border border-[#e4ebe4] shadow-xs">
              <h4 className="text-xs font-bold text-[#166534] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#16a34a]" />
                <span>Expected Business Impact</span>
              </h4>
              <p className="text-xs text-[#14532d] leading-relaxed font-bold">
                {workflow.typicalRoi}
              </p>
              <div className="mt-3 pt-3 border-t border-[#f0f3f0]">
                <span className="text-[11px] text-[#738273] font-medium block mb-1">Recommended Tools:</span>
                <div className="flex flex-wrap gap-1">
                  {workflow.recommendedStack.map((tool) => (
                    <ToolBadge key={tool} name={tool} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matched Experts / Companies Who Can Implement */}
          <div className="space-y-4 pt-4 border-t border-[#cde8cf]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-black text-[#001e00]">
                  Vetted Specialists Ready to Build This for You
                </h4>
                <p className="text-xs text-[#5e6d55] font-medium">
                  These verified experts have demonstrated production case studies in this exact workflow:
                </p>
              </div>
              <Link
                href={`/experts?category=${workflow.categorySlug}`}
                className="text-xs font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1"
              >
                View Category Hub <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fallbackExperts.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl p-5 border border-[#e4ebe4] bg-white shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#f4f6f4] border border-[#e4ebe4] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={exp.avatar_url}
                          alt={exp.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-sm text-[#001e00] truncate">
                            <Link href={`/experts/${exp.slug}`} className="hover:text-[#108a00]">
                              {exp.full_name}
                            </Link>
                          </h5>
                          {exp.is_verified && <VerifiedBadge count={exp.verified_case_study_count} />}
                        </div>
                        <p className="text-xs text-[#5e6d55] font-medium truncate">
                          {exp.professional_title}
                        </p>
                        {exp.agency_name && (
                          <p className="text-[11px] text-[#738273] flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            {exp.agency_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#334133] line-clamp-2 leading-relaxed mb-3">
                      {exp.tagline}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-[#5e6d55] mb-3">
                      <MapPin className="w-3 h-3 text-[#889888]" />
                      <span>{exp.city}, {exp.country}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#f0f3f0] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#108a00] bg-[#e4f7e6] px-2.5 py-0.5 rounded-full border border-[#b2e8b8]">
                      Starting: {exp.starting_budget.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/experts/${exp.slug}`}
                        className="text-xs font-bold text-[#001e00] hover:text-[#108a00] px-3 py-1.5 rounded-full border border-[#d5ded5] hover:border-[#108a00] transition-colors"
                      >
                        Inspect Guardrails
                      </Link>
                      {exp.booking_url ? (
                        <a
                          href={exp.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#108a00] hover:bg-[#14a800] px-3.5 py-1.5 rounded-full shadow-xs transition-colors"
                        >
                          <Calendar className="w-3 h-3" />
                          Book Call
                        </a>
                      ) : (
                        <Link
                          href={`/match?expert=${exp.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#108a00] hover:bg-[#14a800] px-3.5 py-1.5 rounded-full shadow-xs transition-colors"
                        >
                          Request Match
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
