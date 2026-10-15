import { CaseStudy } from '@/lib/types';
import { ShieldAlert, CheckCircle2, Video, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-[#11131c]/80 relative overflow-hidden">
      {/* Verification Evidence Ribbon */}
      {study.reviewer_confirmed && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Reviewer Confirmed Production Case Study</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">
            {study.client_industry}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">
            {study.title}
          </h3>
        </div>
        {study.demo_video_url && (
          <a
            href={study.demo_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-3 py-1.5 rounded-lg transition-colors shrink-0 self-start sm:self-center"
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            Watch Loom Walkthrough
          </a>
        )}
      </div>

      {/* Problem & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-zinc-900/60 border border-white/[0.05] p-4 text-xs">
          <h4 className="font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Client Bottleneck & Problem
          </h4>
          <p className="text-zinc-400 leading-relaxed">
            {study.problem_statement}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-900/60 border border-white/[0.05] p-4 text-xs">
          <h4 className="font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Solution Architecture
          </h4>
          <p className="text-zinc-400 leading-relaxed">
            {study.solution_architecture}
          </p>
        </div>
      </div>

      {/* THE TRUST MOAT: MANDATORY HITL MECHANISM CONTAINER */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 p-5 mb-4 shadow-inner">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldAlert className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>The Human-in-the-Loop Oversight Mechanism</span>
        </div>
        <p className="text-sm text-zinc-200 leading-relaxed font-medium">
          {study.hitl_oversight_mechanism}
        </p>
      </div>

      {/* Safeguards & ROI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="rounded-xl bg-amber-950/20 border border-amber-500/20 p-4">
          <h4 className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Failure Safeguards & Circuit Breakers
          </h4>
          <p className="text-zinc-300 leading-relaxed">
            {study.failure_safeguards}
          </p>
        </div>

        <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/20 p-4">
          <h4 className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            Quantified ROI & Business Outcome
          </h4>
          <p className="text-zinc-300 leading-relaxed font-medium">
            {study.outcomes_roi}
          </p>
        </div>
      </div>
    </div>
  );
}
