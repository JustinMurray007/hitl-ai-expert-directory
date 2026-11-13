import { CaseStudy } from '@/lib/types';
import { CheckCircle2, Video, AlertTriangle, TrendingUp, Layers } from 'lucide-react';

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="hover-lift relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-rest sm:p-8">
      {/* Verification Evidence Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-ink">
            {study.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{study.client_industry}</p>
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
          <h4 className="mb-2 text-base font-semibold text-ink">
            Client bottleneck and problem
          </h4>
          <p className="text-ink-soft text-base leading-relaxed font-normal">
            {study.problem_statement}
          </p>
        </div>
        <div className="rounded-2xl bg-brand-soft border border-brand-line p-5">
          <h4 className="mb-2 text-base font-semibold text-ink">
            Solution architecture
          </h4>
          <p className="text-brand-ink text-base leading-relaxed font-normal">
            {study.solution_architecture}
          </p>
        </div>
      </div>

      {(study.failure_safeguards || study.outcomes_roi) && (
      <div className={`grid grid-cols-1 ${study.failure_safeguards && study.outcomes_roi ? 'sm:grid-cols-2' : ''} gap-5`}>
        {study.failure_safeguards && (
        <div className="rounded-2xl bg-accent-soft border border-accent-tint p-5">
          <h4 className="mb-2 text-base font-semibold text-ink">
            Failure safeguards and circuit breakers
          </h4>
          <p className="text-accent-deep text-base leading-relaxed font-normal">
            {study.failure_safeguards}
          </p>
        </div>
        )}

        {study.outcomes_roi && (
        <div className="rounded-2xl bg-success-soft border border-success-line p-5">
          <h4 className="mb-2 text-base font-semibold text-ink">
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
