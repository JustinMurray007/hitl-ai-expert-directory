'use client';

import { useState } from 'react';
import { Application, Expert, MatchRequest } from '@/lib/types';
import { executeAdminReviewAction, adminLogoutAction } from '@/app/actions';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  Layers,
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
      <div className="rounded-2xl p-6 border border-[#e4ebe4] bg-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#108a00] animate-pulse" />
            <span className="text-xs font-mono uppercase text-[#108a00] font-bold tracking-wider">
              Administrative Control Session
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#001e00] mt-1">
            HITL Review Queue & Verification Gate
          </h1>
          <p className="text-xs text-[#5e6d55] mt-0.5 font-medium">
            Strict verification threshold: Requires ≥2 reviewer-confirmed production case studies with explicit human fallback mechanisms.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f4f6f4] hover:bg-[#e4ebe4] text-xs font-bold text-[#001e00] transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          End Session
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 border border-[#e4ebe4] bg-white shadow-xs">
          <span className="text-[11px] text-[#5e6d55] uppercase font-mono font-bold">Total Submissions</span>
          <p className="text-2xl font-black text-[#001e00] mt-1">{applications.length}</p>
        </div>
        <div className="rounded-xl p-4 border border-[#fef08a] bg-[#fffbeb] shadow-xs">
          <span className="text-[11px] text-[#92400e] uppercase font-mono font-bold">Pending Review</span>
          <p className="text-2xl font-black text-[#b45309] mt-1">{pendingCount}</p>
        </div>
        <div className="rounded-xl p-4 border border-[#b2e8b8] bg-[#edf7ee] shadow-xs">
          <span className="text-[11px] text-[#166534] uppercase font-mono font-bold">Verified Specialists</span>
          <p className="text-2xl font-black text-[#108a00] mt-1">{verifiedCount}</p>
        </div>
        <div className="rounded-xl p-4 border border-[#bfdbfe] bg-[#eff6ff] shadow-xs">
          <span className="text-[11px] text-[#1e40af] uppercase font-mono font-bold">Match Inquiries</span>
          <p className="text-2xl font-black text-[#2563eb] mt-1">{matchRequests.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-[#e4ebe4] pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'border-[#108a00] text-[#108a00]'
              : 'border-transparent text-[#5e6d55] hover:text-[#001e00]'
          }`}
        >
          Applications Queue ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'matches'
              ? 'border-[#108a00] text-[#108a00]'
              : 'border-transparent text-[#5e6d55] hover:text-[#001e00]'
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
                className="rounded-2xl border border-[#e4ebe4] bg-white overflow-hidden shadow-xs transition-all"
              >
                {/* Accordion Summary Header */}
                <div
                  onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#fafbfa]"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f4f6f4] border border-[#e4ebe4] overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={exp?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=user`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#001e00]">
                          {exp?.full_name || 'Applicant'}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f4f6f4] text-[#4b554b] border border-[#dbe3db] font-semibold">
                          {app.legal_entity_type || 'Entity Unspecified'}
                        </span>
                        {exp?.is_verified && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8]">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5e6d55] font-medium">
                        {exp?.professional_title} {exp?.agency_name ? `• ${exp.agency_name}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-[#5e6d55] text-[11px]">
                        Status: <strong className="text-[#001e00] capitalize">{current.status.replace('_', ' ')}</strong>
                      </span>
                      <span className="font-mono text-[11px] text-[#108a00] font-bold">
                        {confirmedCount} confirmed case study(ies)
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#889888]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#889888]" />
                    )}
                  </div>
                </div>

                {/* Expanded Review Drawer */}
                {isExpanded && (
                  <div className="p-6 border-t border-[#f0f3f0] bg-[#fbfcfb] space-y-6">
                    {/* Private Info Strip */}
                    <div className="p-4 rounded-xl bg-[#f3e8ff] border border-[#e9d5ff] text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[#6b21a8] block font-semibold">Private Contact Email:</span>
                        <span className="text-[#3b0764] font-bold flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3.5 h-3.5 text-[#7e22ce]" />
                          {app.contact_email}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6b21a8] block font-semibold">Legal Entity:</span>
                        <span className="text-[#3b0764] font-bold mt-0.5 block">
                          {app.legal_entity_type || 'None'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6b21a8] block font-semibold">Submitted At:</span>
                        <span className="text-[#3b0764] font-mono mt-0.5 block font-bold">
                          {new Date(app.created_at || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Case Studies Inspection with Reviewer Confirmation Gate */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#001e00] flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#108a00]" />
                          <span>Submitted Production Case Studies & Human Guardrails</span>
                        </h4>
                        <div className="text-[11px] font-mono font-bold">
                          Threshold: <strong className={isVerificationEligible ? 'text-[#108a00]' : 'text-[#d97706]'}>
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
                                  ? 'bg-[#edf7ee] border-[#b2e8b8]'
                                  : 'bg-white border-[#e4ebe4]'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div>
                                  <span className="font-mono text-[#108a00] text-[10px] uppercase font-bold">
                                    Case Study #{idx + 1} • {cs.client_industry}
                                  </span>
                                  <h5 className="font-black text-[#001e00] text-sm mt-0.5">{cs.title}</h5>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleConfirmCaseStudy(app.id, cs.id)}
                                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                                    isConfirmed
                                      ? 'bg-[#108a00] text-white border-[#108a00] shadow-xs'
                                      : 'bg-white text-[#001e00] border-[#cbd5cb] hover:border-[#108a00]'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{isConfirmed ? 'Confirmed as Evidence' : 'Confirm Study'}</span>
                                </button>
                              </div>

                              <p className="text-[#4b554b] text-xs">
                                <strong className="text-[#001e00]">Problem:</strong> {cs.problem_statement}
                              </p>

                              {/* HITL MECHANISM REVIEW BOX */}
                              <div className="p-3.5 rounded-lg bg-[#f2faf3] border border-[#b2e8b8]">
                                <span className="text-[10px] font-bold text-[#108a00] uppercase tracking-wider block mb-1">
                                  Audited Human-in-the-Loop Mechanism:
                                </span>
                                <p className="text-[#0f3d17] font-semibold italic">&quot;{cs.hitl_oversight_mechanism}&quot;</p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#4b554b]">
                                <p><strong className="text-[#001e00]">Safeguards:</strong> {cs.failure_safeguards}</p>
                                <p><strong className="text-[#001e00]">ROI / Outcomes:</strong> {cs.outcomes_roi}</p>
                              </div>

                              {cs.demo_video_url && (
                                <a
                                  href={cs.demo_video_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-[#108a00] font-bold hover:underline"
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
                    <div className="p-5 rounded-2xl bg-white border border-[#e4ebe4] space-y-4 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#001e00]">
                        Reviewer Decision & Audit Trail
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {/* Listing Status */}
                        <div>
                          <label className="block text-[#001e00] mb-1 font-bold">
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
                            className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium"
                          >
                            <option value="pending_review">Pending Review</option>
                            <option value="published">Published</option>
                            <option value="rejected">Rejected</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>

                        {/* Verification Status */}
                        <div>
                          <label className="block text-[#001e00] mb-1 font-bold">
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
                            className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium"
                          >
                            <option value="unverified">Unverified (Community Tier)</option>
                            <option value="in_review">In Review (Awaiting 2nd Study)</option>
                            <option value="verified">Verified (Requires 2 Confirmed Studies)</option>
                            <option value="rejected">Rejected (Guardrail Inadequate)</option>
                          </select>
                        </div>

                        {/* Sponsor Rank */}
                        <div>
                          <label className="block text-[#001e00] mb-1 font-bold">
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
                            className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] font-medium"
                          />
                        </div>
                      </div>

                      {/* Reviewer Name & Notes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[#001e00] mb-1 font-bold">
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
                            className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#001e00] mb-1 font-bold">
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
                            className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00]"
                          />
                        </div>
                      </div>

                      {/* Feedback banner */}
                      {actionMessage && actionMessage.id === app.id && (
                        <div
                          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                            actionMessage.error
                              ? 'bg-rose-50 border border-rose-200 text-rose-800'
                              : 'bg-[#edf7ee] border border-[#b2e8b8] text-[#166534]'
                          }`}
                        >
                          {actionMessage.error ? (
                            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#108a00]" />
                          )}
                          <span className="font-bold">{actionMessage.error || actionMessage.success}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2">
                        {exp?.slug && (
                          <Link
                            href={`/experts/${exp.slug}`}
                            target="_blank"
                            className="text-xs text-[#108a00] font-bold hover:underline flex items-center gap-1"
                          >
                            Preview Profile Page <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}

                        <button
                          type="button"
                          disabled={savingAppId === app.id}
                          onClick={() => handleSaveReview(app)}
                          className="px-8 py-3 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
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
              className="rounded-2xl p-6 border border-[#e4ebe4] bg-white text-xs space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f0f3f0] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#001e00]">{req.requester_name}</h3>
                    {req.company && (
                      <span className="text-[#5e6d55] font-medium text-[11px]">({req.company})</span>
                    )}
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe] font-bold">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-[#5e6d55] flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-[#889888]" />
                    {req.requester_email}
                  </p>
                </div>
                <span className="text-[#738273] font-mono text-[11px]">
                  {new Date(req.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>

              <div>
                <span className="font-bold text-[#001e00] block mb-1">Operational Need:</span>
                <p className="text-[#223022] leading-relaxed bg-[#f9faf9] p-3.5 rounded-xl border border-[#e4ebe4]">
                  {req.need_description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#5e6d55] text-[11px] pt-1">
                <p>
                  <strong className="text-[#001e00]">Budget:</strong> {req.budget_range ? req.budget_range.replace('_', ' ') : 'Flexible'}
                </p>
                <p>
                  <strong className="text-[#001e00]">Timeline:</strong> {req.timeline || 'Immediate'}
                </p>
              </div>

              {req.internal_notes && (
                <div className="p-3 rounded-lg bg-[#fffbeb] border border-[#fef3c7] text-[11px] text-[#92400e]">
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
