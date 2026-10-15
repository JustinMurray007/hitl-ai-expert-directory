import { CaseStudy } from '@/lib/types';
import { ShieldAlert, CheckCircle2, Video, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs relative overflow-hidden">
      {/* Verification Evidence Ribbon */}
      {study.reviewer_confirmed && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8] mb-4 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Reviewer Confirmed Production Case Study</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-sm uppercase font-mono tracking-wider text-[#108a00] font-bold">
            {study.client_industry}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#001e00] mt-1">
            {study.title}
          </h3>
        </div>
        {study.demo_video_url && (
          <a
            href={study.demo_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#001e00] hover:text-[#108a00] bg-[#f4f6f4] hover:bg-[#e4f7e6] border border-[#dbe3db] px-4 py-2.5 rounded-full transition-colors shrink-0 self-start sm:self-center font-bold"
          >
            <Video className="w-4 h-4 text-[#108a00]" />
            Watch Loom Walkthrough
          </a>
        )}
      </div>

      {/* Problem & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] p-5">
          <h4 className="font-bold text-[#334155] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Client Bottleneck & Problem
          </h4>
          <p className="text-[#334155] text-base leading-relaxed font-normal">
            {study.problem_statement}
          </p>
        </div>
        <div className="rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] p-5">
          <h4 className="font-bold text-[#1d4ed8] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#2563eb]" />
            Solution Architecture
          </h4>
          <p className="text-[#1e3a8a] text-base leading-relaxed font-normal">
            {study.solution_architecture}
          </p>
        </div>
      </div>

      {/* THE TRUST MOAT: MANDATORY HITL MECHANISM CONTAINER */}
      <div className="rounded-2xl bg-[#f2faf3] border-2 border-[#b2e8b8] p-6 mb-6">
        <div className="flex items-center gap-2 text-[#108a00] font-bold text-sm uppercase tracking-wider mb-2.5">
          <ShieldAlert className="w-5 h-5 text-[#108a00]" />
          <span>The Human-in-the-Loop Oversight Mechanism</span>
        </div>
        <p className="text-base sm:text-lg text-[#0f3d17] leading-relaxed font-bold">
          &quot;{study.hitl_oversight_mechanism}&quot;
        </p>
      </div>

      {/* Safeguards & ROI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-[#fffbeb] border border-[#fef3c7] p-5">
          <h4 className="font-bold text-[#92400e] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-[#d97706]" />
            Failure Safeguards & Circuit Breakers
          </h4>
          <p className="text-[#78350f] text-base leading-relaxed font-normal">
            {study.failure_safeguards}
          </p>
        </div>

        <div className="rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] p-5">
          <h4 className="font-bold text-[#166534] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-[#16a34a]" />
            Quantified ROI & Business Outcome
          </h4>
          <p className="text-[#14532d] text-base leading-relaxed font-bold">
            {study.outcomes_roi}
          </p>
        </div>
      </div>
    </div>
  );
}
