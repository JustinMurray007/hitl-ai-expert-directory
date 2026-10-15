import { CaseStudy } from '@/lib/types';
import { ShieldAlert, CheckCircle2, Video, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs relative overflow-hidden">
      {/* Verification Evidence Ribbon */}
      {study.reviewer_confirmed && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8] mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Reviewer Confirmed Production Case Study</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
            {study.client_industry}
          </span>
          <h3 className="text-lg font-extrabold text-[#001e00] mt-1">
            {study.title}
          </h3>
        </div>
        {study.demo_video_url && (
          <a
            href={study.demo_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#001e00] hover:text-[#108a00] bg-[#f4f6f4] hover:bg-[#e4f7e6] border border-[#dbe3db] px-3.5 py-2 rounded-full transition-colors shrink-0 self-start sm:self-center font-semibold"
          >
            <Video className="w-3.5 h-3.5 text-[#108a00]" />
            Watch Loom Walkthrough
          </a>
        )}
      </div>

      {/* Problem & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-[#fafafa] border border-[#e5e7eb] p-4 text-xs">
          <h4 className="font-bold text-[#1f2937] mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Client Bottleneck & Problem
          </h4>
          <p className="text-[#4b5563] leading-relaxed">
            {study.problem_statement}
          </p>
        </div>
        <div className="rounded-xl bg-[#fafafa] border border-[#e5e7eb] p-4 text-xs">
          <h4 className="font-bold text-[#1f2937] mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#108a00]" />
            Solution Architecture
          </h4>
          <p className="text-[#4b5563] leading-relaxed">
            {study.solution_architecture}
          </p>
        </div>
      </div>

      {/* THE TRUST MOAT: MANDATORY HITL MECHANISM CONTAINER */}
      <div className="rounded-xl bg-[#f2faf3] border-2 border-[#b2e8b8] p-5 mb-4">
        <div className="flex items-center gap-2 text-[#108a00] font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4 text-[#108a00]" />
          <span>The Human-in-the-Loop Oversight Mechanism</span>
        </div>
        <p className="text-sm text-[#0f3d17] leading-relaxed font-semibold">
          &quot;{study.hitl_oversight_mechanism}&quot;
        </p>
      </div>

      {/* Safeguards & ROI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="rounded-xl bg-[#fffbeb] border border-[#fef3c7] p-4">
          <h4 className="font-bold text-[#92400e] mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#d97706]" />
            Failure Safeguards & Circuit Breakers
          </h4>
          <p className="text-[#78350f] leading-relaxed">
            {study.failure_safeguards}
          </p>
        </div>

        <div className="rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] p-4">
          <h4 className="font-bold text-[#166534] mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />
            Quantified ROI & Business Outcome
          </h4>
          <p className="text-[#14532d] leading-relaxed font-semibold">
            {study.outcomes_roi}
          </p>
        </div>
      </div>
    </div>
  );
}
