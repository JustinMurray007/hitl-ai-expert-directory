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
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Factory,
  FileText,
  GraduationCap,
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
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Factory,
  FileText,
  GraduationCap,
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
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white text-sm font-black flex items-center justify-center font-mono shadow-xs">
            1
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#001e00]">
            Select Your Business Type (12 Industries)
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                className={`p-4 sm:p-5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#edf7ee] border-2 border-[#108a00] shadow-sm ring-1 ring-[#108a00]/30'
                    : 'bg-white border-[#e4ebe4] hover:border-[#108a00]/50 hover:shadow-md shadow-xs'
                }`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 ${
                      isSelected
                        ? 'bg-[#108a00] text-white'
                        : 'bg-[#e4f7e6] text-[#108a00]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#001e00] leading-snug">
                    {ind.industryName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {ind.industryDescription}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-[#108a00]' : 'text-slate-400'}>
                    {isSelected ? '● Active Selection' : 'Click to Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Operational Pain Point */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white text-sm font-black flex items-center justify-center font-mono shadow-xs">
            2
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#001e00]">
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
                className={`p-5 sm:p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-[#108a00] shadow-md ring-2 ring-[#108a00]/10'
                    : 'bg-white border-[#e4ebe4] hover:border-[#cbd5cb] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-extrabold text-base sm:text-lg text-[#001e00]">
                      {b.label}
                    </h3>
                    <p className="text-sm sm:text-base text-[#475569] mt-2 leading-relaxed font-normal">
                      {b.description}
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#108a00] bg-[#108a00] text-white'
                        : 'border-[#cbd5cb] bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Generated AI Recommendation Blueprint */}
      {workflow && (
        <div className="rounded-3xl p-6 sm:p-10 border border-[#dbeafe] bg-gradient-to-b from-[#f8faff] via-white to-[#f2faf3] shadow-sm space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#e2e8f0] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-sm font-bold text-[#1d4ed8] mb-3 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#2563eb]" />
                <span>Recommended AI Blueprint • {selectedIndustry.industryName}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#001e00] tracking-tight">
                {workflow.title}
              </h3>
              <p className="text-base sm:text-lg text-[#475569] mt-2 font-normal leading-relaxed">
                {workflow.problemSolved}
              </p>
            </div>

            <Link
              href={`/match?category=${workflow.categorySlug}&need=${encodeURIComponent(
                `Interested in implementing ${workflow.title} for ${selectedIndustry.industryName}`
              )}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm sm:text-base shadow-sm transition-all shrink-0 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Request Implementation Intro
            </Link>
          </div>

          {/* Blueprint Details Grid: Distinct Three-Color Pillar Separation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Automated Architecture - Cobalt Blue */}
            <div className="rounded-2xl bg-[#eff6ff] p-6 border-2 border-[#93c5fd] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-[#1d4ed8] uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2563eb]" />
                    <span>System Architecture</span>
                  </h4>
                  <span className="text-sm font-bold text-[#1e40af] bg-white px-3 py-1 rounded-full border border-[#bfdbfe]">
                    Automated
                  </span>
                </div>
                <p className="text-base text-[#1e3a8a] leading-relaxed font-normal">
                  {workflow.systemArchitecture}
                </p>
              </div>
            </div>

            {/* 2. THE HITL GUARDRAIL - Signature Emerald Green */}
            <div className="rounded-2xl bg-[#f2faf3] p-6 border-2 border-[#108a00] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-[#108a00] uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#108a00]" />
                    <span>Mandatory Human Safeguard</span>
                  </h4>
                  <span className="text-sm font-bold text-[#0f3d17] bg-white px-3 py-1 rounded-full border border-[#b2e8b8]">
                    HITL Gate
                  </span>
                </div>
                <p className="text-base text-[#0f3d17] leading-relaxed font-bold">
                  {workflow.hitlSafeguard}
                </p>
              </div>
            </div>

            {/* 3. Expected Business Impact - Warm Honey Amber */}
            <div className="rounded-2xl bg-[#fffbeb] p-6 border-2 border-[#fde68a] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-[#b45309] uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#d97706]" />
                    <span>Expected Business Impact</span>
                  </h4>
                  <span className="text-sm font-bold text-[#92400e] bg-white px-3 py-1 rounded-full border border-[#fde68a]">
                    Verified ROI
                  </span>
                </div>
                <p className="text-base text-[#78350f] leading-relaxed font-extrabold">
                  {workflow.typicalRoi}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#fef3c7]">
                <span className="text-sm font-bold uppercase tracking-wider text-[#78350f] block mb-2.5">Recommended Tools:</span>
                <div className="flex flex-wrap gap-1.5">
                  {workflow.recommendedStack.map((tool) => (
                    <ToolBadge key={tool} name={tool} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Matched Experts / Companies Who Can Implement */}
          <div className="space-y-5 pt-6 border-t border-[#cde8cf]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-[#001e00]">
                  Vetted Specialists Ready to Build This for You
                </h4>
                <p className="text-sm sm:text-base text-[#475569] font-medium mt-0.5">
                  These verified experts have demonstrated production case studies in this exact workflow:
                </p>
              </div>
              <Link
                href={`/experts?category=${workflow.categorySlug}`}
                className="text-sm font-bold text-[#108a00] hover:text-[#14a800] inline-flex items-center gap-1.5 shrink-0"
              >
                View Category Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fallbackExperts.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl p-6 border border-[#e4ebe4] bg-white shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f4f6f4] border border-[#e4ebe4] shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={exp.avatar_url}
                          alt={exp.full_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-base sm:text-lg text-[#001e00] truncate">
                            <Link href={`/experts/${exp.slug}`} className="hover:text-[#108a00]">
                              {exp.full_name}
                            </Link>
                          </h5>
                          {exp.is_verified && <VerifiedBadge count={exp.verified_case_study_count} />}
                        </div>
                        <p className="text-sm text-[#108a00] font-bold truncate mt-0.5">
                          {exp.professional_title}
                        </p>
                        {exp.agency_name && (
                          <p className="text-sm text-[#5e6d55] flex items-center gap-1.5 mt-1 font-medium">
                            <Building className="w-3.5 h-3.5" />
                            {exp.agency_name}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-base text-[#223022] line-clamp-2 leading-relaxed mb-4 font-normal">
                      {exp.tagline}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-[#5e6d55] mb-4 font-medium">
                      <MapPin className="w-4 h-4 text-[#889888]" />
                      <span>{exp.city}, {exp.country}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#f0f3f0] flex items-center justify-between">
                    <span className="text-sm font-bold text-[#108a00] bg-[#e4f7e6] px-3 py-1 rounded-full border border-[#b2e8b8]">
                      Starting: {exp.starting_budget.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/experts/${exp.slug}`}
                        className="text-sm font-bold text-[#001e00] hover:text-[#108a00] px-4 py-2 rounded-full border border-[#d5ded5] hover:border-[#108a00] transition-colors"
                      >
                        Inspect Guardrails
                      </Link>
                      {exp.booking_url ? (
                        <a
                          href={exp.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#108a00] hover:bg-[#14a800] px-4 py-2 rounded-full shadow-xs transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Call
                        </a>
                      ) : (
                        <Link
                          href={`/match?expert=${exp.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-[#108a00] hover:bg-[#14a800] px-4 py-2 rounded-full shadow-xs transition-colors"
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
