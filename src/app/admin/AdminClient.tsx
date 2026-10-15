'use client';

import { useState } from 'react';
import { Application, Expert, MatchRequest } from '@/lib/types';
import { executeAdminReviewAction, adminLogoutAction } from '@/app/actions';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Building,
  Mail,
  Lock,
  Layers,
  Sparkles,
  LogOut,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

interface AdminClientProps {
  applications: Application[];
  experts: Expert[];
  matchRequests: MatchRequest[];
  token: string;
}

export default function AdminClient({
  applications,
  experts,
  matchRequests,
  token,
}: AdminClientProps) {
  const [activeTab, setActiveTab] = useState<'applications' | 'matches'>('applications');
  const [expandedAppId, setExpandedAppId] = useState<string | null>(applications[0]?.id || null);
  const [reviewState, setReviewState] = useState<
    Record<
      string,
      {
        status: string;
        verificationStatus: string;
        sponsorRank: number;
        reviewNotes: string;
        reviewedBy: string;
        confirmedCaseStudyIds: string[];
      }
    >
  >(() => {
    const initial: any = {};
    applications.forEach((app) => {
      const exp = app.expert || experts.find((e) => e.id === app.expert_id);
      const confirmedIds = (exp?.case_studies || [])
        .filter((cs) => cs.reviewer_confirmed)
        .map((cs) => cs.id);

      initial[app.id] = {
        status: exp?.status || 'pending_review',
        verificationStatus: app.review_decision || (exp?.is_verified ? 'verified' : 'unverified'),
        sponsorRank: exp?.sponsor_rank || 0,
        reviewNotes: app.review_notes || '',
        reviewedBy: app.reviewed_by || 'Justin Murray (Lead Reviewer)',
        confirmedCaseStudyIds: confirmedIds,
      };
    });
    return initial;
  });

  const [savingAppId, setSavingAppId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ id: string; error?: string; success?: string } | null>(null);

  const toggleConfirmCaseStudy = (appId: string, csId: string) => {
    setReviewState((prev) => {
      const current = prev[appId] || { confirmedCaseStudyIds: [] };
      const exists = current.confirmedCaseStudyIds.includes(csId);
      const nextConfirmed = exists
        ? current.confirmedCaseStudyIds.filter((id: string) => id !== csId)
        : [...current.confirmedCaseStudyIds, csId];

      return {
        ...prev,
        [appId]: {
          ...current,
          confirmedCaseStudyIds: nextConfirmed,
        },
      };
    });
  };

  const handleSaveReview = async (app: Application) => {
    const exp = app.expert || experts.find((e) => e.id === app.expert_id);
    if (!exp) return;

    const current = reviewState[app.id];
    setSavingAppId(app.id);
    setActionMessage(null);

    const result = await executeAdminReviewAction({
      token,
      expertId: exp.id,
      status: current.status as any,
      verificationStatus: current.verificationStatus as any,
      sponsorRank: Number(current.sponsorRank),
      reviewNotes: current.reviewNotes,
      reviewedBy: current.reviewedBy,
      confirmedCaseStudyIds: current.confirmedCaseStudyIds,
    });

    setSavingAppId(null);

    if (!result.success) {
      setActionMessage({ id: app.id, error: result.error });
    } else {
      setActionMessage({ id: app.id, success: 'Review decision saved and synchronized!' });
    }
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    window.location.reload();
  };

  // KPIs
  const pendingCount = applications.filter(
    (a) => a.review_decision === 'unverified' || a.expert?.status === 'pending_review'
  ).length;
  const verifiedCount = experts.filter((e) => e.is_verified).length;

  return (
    <div className="space-y-8">
      {/* Admin Top Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] bg-[#11131c]/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
              Administrative Control Session
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            HITL Review Queue & Verification Gate
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Strict verification threshold: Requires ≥2 reviewer-confirmed production case studies with explicit human fallback mechanisms.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          End Session
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-white/[0.06] bg-[#11131c]/60">
          <span className="text-[11px] text-zinc-400 uppercase font-mono">Total Submissions</span>
          <p className="text-2xl font-bold text-white mt-1">{applications.length}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border border-amber-500/20 bg-amber-950/10">
          <span className="text-[11px] text-amber-300 uppercase font-mono">Pending Review</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border border-emerald-500/20 bg-emerald-950/10">
          <span className="text-[11px] text-emerald-300 uppercase font-mono">Verified Specialists</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{verifiedCount}</p>
        </div>
        <div className="glass-panel rounded-xl p-4 border border-cyan-500/20 bg-cyan-950/10">
          <span className="text-[11px] text-cyan-300 uppercase font-mono">Match Inquiries</span>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{matchRequests.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Applications Queue ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'matches'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Founder Match Inquiries ({matchRequests.length})
        </button>
      </div>

      {/* TAB 1: APPLICATIONS QUEUE */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          {applications.map((app) => {
            const exp = app.expert || experts.find((e) => e.id === app.expert_id);
            const isExpanded = expandedAppId === app.id;
            const current = reviewState[app.id] || {
              status: exp?.status || 'pending_review',
              verificationStatus: app.review_decision || 'unverified',
              sponsorRank: exp?.sponsor_rank || 0,
              reviewNotes: '',
              reviewedBy: 'Admin',
              confirmedCaseStudyIds: [],
            };

            const confirmedCount = current.confirmedCaseStudyIds.length;
            const isVerificationEligible = confirmedCount >= 2;

            return (
              <div
                key={app.id}
                className="glass-panel rounded-2xl border border-white/[0.08] bg-[#11131c]/90 overflow-hidden shadow-lg transition-all"
              >
                {/* Accordion Summary Header */}
                <div
                  onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={exp?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">
                          {exp?.full_name || 'Applicant'}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {app.legal_entity_type || 'Entity Unspecified'}
                        </span>
                        {exp?.is_verified && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400">
                        {exp?.professional_title} {exp?.agency_name ? `• ${exp.agency_name}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-zinc-400 text-[11px]">
                        Status: <strong className="text-white capitalize">{current.status.replace('_', ' ')}</strong>
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400">
                        {confirmedCount} confirmed case study(ies)
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Review Drawer */}
                {isExpanded && (
                  <div className="p-6 border-t border-white/[0.08] bg-[#0a0c13] space-y-6">
                    {/* Private Info Strip */}
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-zinc-500 block">Private Contact Email:</span>
                        <span className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-purple-400" />
                          {app.contact_email}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Legal Entity:</span>
                        <span className="text-white font-medium mt-0.5 block">
                          {app.legal_entity_type || 'None'}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">Submitted At:</span>
                        <span className="text-zinc-300 font-mono mt-0.5 block">
                          {new Date(app.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Case Studies Inspection with Reviewer Confirmation Gate */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Submitted Production Case Studies & Human Guardrails</span>
                        </h4>
                        <div className="text-[11px] font-mono text-zinc-400">
                          Threshold: <strong className={isVerificationEligible ? 'text-emerald-400' : 'text-amber-400'}>
                            {confirmedCount} / 2 confirmed
                          </strong>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {(exp?.case_studies || []).map((cs, idx) => {
                          const isConfirmed = current.confirmedCaseStudyIds.includes(cs.id);
                          return (
                            <div
                              key={cs.id}
                              className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                                isConfirmed
                                  ? 'bg-emerald-950/20 border-emerald-500/40'
                                  : 'bg-zinc-900/80 border-white/5'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <span className="font-mono text-cyan-400 text-[10px] uppercase">
                                    Case Study #{idx + 1} • {cs.client_industry}
                                  </span>
                                  <h5 className="font-bold text-white text-sm mt-0.5">{cs.title}</h5>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleConfirmCaseStudy(app.id, cs.id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                                    isConfirmed
                                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-sm'
                                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{isConfirmed ? 'Confirmed as Evidence' : 'Confirm Study'}</span>
                                </button>
                              </div>

                              <p className="text-zinc-400 text-xs">
                                <strong>Problem:</strong> {cs.problem_statement}
                              </p>

                              {/* HITL MECHANISM REVIEW BOX */}
                              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                                  Audited Human-in-the-Loop Mechanism:
                                </span>
                                <p className="text-zinc-200 italic">&quot;{cs.hitl_oversight_mechanism}&quot;</p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-400">
                                <p><strong>Safeguards:</strong> {cs.failure_safeguards}</p>
                                <p><strong>ROI / Outcomes:</strong> {cs.outcomes_roi}</p>
                              </div>

                              {cs.demo_video_url && (
                                <a
                                  href={cs.demo_video_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                                >
                                  Inspect Video Walkthrough <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Review Form & Decision Panel */}
                    <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        Reviewer Decision & Audit Trail
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {/* Listing Status */}
                        <div>
                          <label className="block text-zinc-400 mb-1 font-semibold">
                            Listing Status
                          </label>
                          <select
                            value={current.status}
                            onChange={(e) =>
                              setReviewState((prev) => ({
                                ...prev,
                                [app.id]: { ...current, status: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-white/10 text-xs text-white"
                          >
                            <option value="pending_review">Pending Review</option>
                            <option value="published">Published</option>
                            <option value="rejected">Rejected</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>

                        {/* Verification Status */}
                        <div>
                          <label className="block text-zinc-400 mb-1 font-semibold">
                            Verification Tier
                          </label>
                          <select
                            value={current.verificationStatus}
                            onChange={(e) =>
                              setReviewState((prev) => ({
                                ...prev,
                                [app.id]: { ...current, verificationStatus: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-white/10 text-xs text-white"
                          >
                            <option value="unverified">Unverified (Community Tier)</option>
                            <option value="in_review">In Review (Awaiting 2nd Study)</option>
                            <option value="verified">Verified (Requires 2 Confirmed Studies)</option>
                            <option value="rejected">Rejected (Guardrail Inadequate)</option>
                          </select>
                        </div>

                        {/* Sponsor Rank */}
                        <div>
                          <label className="block text-zinc-400 mb-1 font-semibold">
                            Sponsor Rank (0 = Normal)
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={current.sponsorRank}
                            onChange={(e) =>
                              setReviewState((prev) => ({
                                ...prev,
                                [app.id]: { ...current, sponsorRank: parseInt(e.target.value) || 0 },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Reviewer Name & Notes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-zinc-400 mb-1 font-semibold">
                            Reviewed By (Identifier)
                          </label>
                          <input
                            type="text"
                            value={current.reviewedBy}
                            onChange={(e) =>
                              setReviewState((prev) => ({
                                ...prev,
                                [app.id]: { ...current, reviewedBy: e.target.value },
                              }))
                            }
                            className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-white/10 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-400 mb-1 font-semibold">
                            Audit Notes (Private evidence record)
                          </label>
                          <input
                            type="text"
                            value={current.reviewNotes}
                            onChange={(e) =>
                              setReviewState((prev) => ({
                                ...prev,
                                [app.id]: { ...current, reviewNotes: e.target.value },
                              }))
                            }
                            placeholder="e.g. Identity confirmed via LinkedIn, verified n8n webhook Slack queue..."
                            className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Feedback banner */}
                      {actionMessage && actionMessage.id === app.id && (
                        <div
                          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                            actionMessage.error
                              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                              : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {actionMessage.error ? (
                            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                          )}
                          <span>{actionMessage.error || actionMessage.success}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2">
                        {exp?.slug && (
                          <Link
                            href={`/experts/${exp.slug}`}
                            target="_blank"
                            className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            Preview Profile Page <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}

                        <button
                          type="button"
                          disabled={savingAppId === app.id}
                          onClick={() => handleSaveReview(app)}
                          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {savingAppId === app.id ? 'Saving Decision...' : 'Save Review Decision'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: FOUNDER MATCH INQUIRIES */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          {matchRequests.map((req) => (
            <div
              key={req.id}
              className="glass-panel rounded-2xl p-6 border border-white/[0.08] bg-[#11131c]/90 text-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{req.requester_name}</h3>
                    {req.company && (
                      <span className="text-zinc-400 font-mono text-[11px]">({req.company})</span>
                    )}
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-zinc-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-zinc-500" />
                    {req.requester_email}
                  </p>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">
                  {new Date(req.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <div>
                <span className="font-semibold text-zinc-300 block mb-1">Operational Need:</span>
                <p className="text-zinc-200 leading-relaxed bg-zinc-900/80 p-3 rounded-xl border border-white/5">
                  {req.need_description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-400 text-[11px] pt-1">
                <p>
                  <strong>Budget:</strong> {req.budget_range ? req.budget_range.replace('_', ' ') : 'Flexible'}
                </p>
                <p>
                  <strong>Timeline:</strong> {req.timeline || 'Immediate'}
                </p>
              </div>

              {req.internal_notes && (
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300">
                  <strong>Internal Match Note:</strong> {req.internal_notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
