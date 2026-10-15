'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitMatchRequestAction } from '@/app/actions';
import { Sparkles, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Lock } from 'lucide-react';

const CATEGORIES = [
  { slug: 'operations-workflow-automation', label: 'Operations & Workflow Automation' },
  { slug: 'sales-lead-qualification', label: 'Sales & Lead Qualification' },
  { slug: 'customer-support-knowledge-base', label: 'Customer Support & Knowledge Bases' },
  { slug: 'marketing-programmatic-content', label: 'Marketing & Programmatic Content' },
  { slug: 'executive-personal-ai-ops', label: 'Executive & Personal AI Ops' },
];

export default function MatchPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const toggleCategory = (slug: string) => {
    if (selectedCats.includes(slug)) {
      setSelectedCats(selectedCats.filter((s) => s !== slug));
    } else {
      setSelectedCats([...selectedCats, slug]);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    selectedCats.forEach((c) => formData.append('preferredCategories', c));

    const result = await submitMatchRequestAction(formData);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to submit match request');
    } else {
      setSubmittedId(result.matchId || 'new');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Founder Concierge Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Request AI Specialist Matchmaking
        </h1>
        <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
          Tell us about your business process, stack, and budget. We will review your request privately and introduce two verified specialists with demonstrable domain case studies.
        </p>
      </div>

      {submittedId ? (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/40 bg-cyan-950/20 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Match Request Received</h2>
            <p className="text-sm text-zinc-300 mt-2 max-w-md mx-auto">
              Thank you! Our review team has logged your inquiry. We will curate two verified specialists whose past production case studies match your workflow requirements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 max-w-sm mx-auto text-xs text-zinc-400 font-mono">
            Reference ID: <span className="text-cyan-400 font-bold">{submittedId}</span>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/experts"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors"
            >
              Browse Directory
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-colors"
            >
              View in Admin Queue
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-[#11131c]/90 space-y-6 shadow-2xl">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-zinc-400 border-b border-white/[0.06] pb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>All inquiries are confidential and accessible only by the HITL matchmaking team.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Your Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="requesterName"
                required
                placeholder="e.g. Rachel Sterling"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Work Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="requesterEmail"
                required
                placeholder="rachel@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Company or Organization Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Summit Logistics Group"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Describe Your Operational Bottleneck or AI Need <span className="text-rose-400">*</span>
            </label>
            <p className="text-[11px] text-zinc-400 mb-1.5">
              Explain what process you want to automate, what software you use, and what failure risks worry you most.
            </p>
            <textarea
              name="needDescription"
              required
              rows={4}
              placeholder="e.g. We receive 300+ invoices and bill of ladings weekly. We want an automated OCR and classification pipeline, but we cannot afford incorrect entries in QuickBooks without human triage."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Approximate Budget Range
              </label>
              <select
                name="budgetRange"
                defaultValue="5000_to_15000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="under_2500">Under $2,500 (Small sprint or audit)</option>
                <option value="2500_to_5000">$2,500 – $5,000 (Standard workflow)</option>
                <option value="5000_to_15000">$5,000 – $15,000 (Multi-step pipeline)</option>
                <option value="15000_plus">$15,000+ (Enterprise integration)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Target Timeline <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="timeline"
                required
                defaultValue="Within 2-3 weeks"
                placeholder="e.g. Immediate / Next 30 days"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">
              Relevant Operational Categories
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCats.includes(cat.slug);
                return (
                  <button
                    type="button"
                    key={cat.slug}
                    onClick={() => toggleCategory(cat.slug)}
                    className={`p-2.5 rounded-xl text-xs text-left border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                        : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-xl shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Submitting Inquiry...' : 'Submit Matchmaking Request'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
