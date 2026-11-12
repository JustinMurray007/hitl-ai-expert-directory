import { CaseStudy } from '@/lib/types';
import { ShieldAlert, CheckCircle2, Video, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-line bg-white shadow-xs relative overflow-hidden">
      {/* Verification Evidence Ribbon */}
        {study.reviewer_confirmed && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-bold bg-brand-soft text-brand border border-brand-line mb-4 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Reviewer confirmed example</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-sm uppercase font-mono tracking-wider text-brand font-bold">
            {study.client_industry}
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-ink mt-1">
            {study.title}
          </h3>
        </div>
        {study.demo_video_url && (
          <a
            href={study.demo_video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink hover:text-brand bg-canvas-muted hover:bg-brand-soft border border-line px-4 py-2.5 rounded-full transition-colors shrink-0 self-start sm:self-center font-bold"
          >
            <Video className="w-4 h-4 text-brand" />
            Watch Loom Walkthrough
          </a>
        )}
      </div>

      {/* Problem & Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="rounded-2xl bg-canvas border border-line p-5">
          <h4 className="font-bold text-ink-soft mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Client Bottleneck & Problem
          </h4>
          <p className="text-ink-soft text-base leading-relaxed font-normal">
            {study.problem_statement}
          </p>
        </div>
        <div className="rounded-2xl bg-brand-soft border border-brand-line p-5">
          <h4 className="font-bold text-brand mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Layers className="w-4 h-4 text-brand" />
            Solution Architecture
          </h4>
          <p className="text-brand-ink text-base leading-relaxed font-normal">
            {study.solution_architecture}
          </p>
        </div>
      </div>

      {/* THE TRUST MOAT: MANDATORY HITL MECHANISM CONTAINER */}
      <div className="rounded-2xl bg-brand-soft border-2 border-brand-line p-6 mb-6">
        <div className="flex items-center gap-2 text-brand font-bold text-sm uppercase tracking-wider mb-2.5">
          <ShieldAlert className="w-5 h-5 text-brand" />
          <span>The Human-in-the-Loop Oversight Mechanism</span>
        </div>
        <p className="text-base sm:text-lg text-brand-ink leading-relaxed font-bold">
          &quot;{study.hitl_oversight_mechanism}&quot;
        </p>
      </div>

      {(study.failure_safeguards || study.outcomes_roi) && (
      <div className={`grid grid-cols-1 ${study.failure_safeguards && study.outcomes_roi ? 'sm:grid-cols-2' : ''} gap-5`}>
        {study.failure_safeguards && (
        <div className="rounded-2xl bg-accent-soft border border-accent-tint p-5">
          <h4 className="font-bold text-accent-ink mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-accent" />
            Failure Safeguards & Circuit Breakers
          </h4>
          <p className="text-accent-deep text-base leading-relaxed font-normal">
            {study.failure_safeguards}
          </p>
        </div>
        )}

        {study.outcomes_roi && (
        <div className="rounded-2xl bg-success-soft border border-success-line p-5">
          <h4 className="font-bold text-success mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-success-bright" />
            Outcome the specialist reported
          </h4>
          <p className="text-success-ink text-base leading-relaxed font-bold">
            {study.outcomes_roi}
          </p>
        </div>
        )}
      </div>
      )}
    </div>
  );
}
