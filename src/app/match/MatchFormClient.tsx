'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Lock, UserCheck, Layers } from 'lucide-react';

const CATEGORIES = [
  { slug: 'operations-workflow-automation', label: 'Operations & Workflow Automation' },
  { slug: 'sales-lead-qualification', label: 'Sales & Lead Qualification' },
  { slug: 'customer-support-knowledge-base', label: 'Customer Support & Knowledge Bases' },
  { slug: 'ai-advertising-paid-media', label: 'AI Advertising & Paid Media Ops' },
  { slug: 'marketing-programmatic-content', label: 'Marketing & Programmatic Content' },
  { slug: 'executive-personal-ai-ops', label: 'Executive & Personal AI Ops' },
];

export default function MatchFormClient() {
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get('category') || '';
  const paramNeed = searchParams.get('need') || '';
  const paramExpert = searchParams.get('expert') || '';
  const paramBudget = searchParams.get('budget') || '5000_to_15000';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  
  const [selectedCats, setSelectedCats] = useState<string[]>(() => {
    return paramCategory ? [paramCategory] : [];
  });

  const [needDescription, setNeedDescription] = useState<string>(() => {
    if (paramNeed) return paramNeed;
    if (paramExpert) return `Inquiring about introducing specialist: ${paramExpert}. Our business requirements are: `;
    return '';
  });

  const [budgetRange, setBudgetRange] = useState<string>(paramBudget);

  // Sync if URL search params change dynamically
  useEffect(() => {
    if (paramCategory && !selectedCats.includes(paramCategory)) {
      setSelectedCats((prev) => (prev.includes(paramCategory) ? prev : [...prev, paramCategory]));
    }
    if (paramNeed && !needDescription) {
      setNeedDescription(paramNeed);
    }
    if (paramBudget && budgetRange !== paramBudget) {
      setBudgetRange(paramBudget);
    }
  }, [paramCategory, paramNeed, paramBudget]);

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

    // Simulate instant receipt & confirmation in static export mode
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedId(`match-${Date.now()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }

  if (submittedId) {
    return (
      <div className="rounded-3xl p-8 sm:p-12 border border-[#b2e8b8] bg-[#edf7ee] text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center mx-auto text-[#108a00]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#001e00]">Match Request Received</h2>
          <p className="text-base text-[#465a46] mt-3 max-w-md mx-auto font-medium leading-relaxed">
            Thank you! Our review team has logged your inquiry. We will curate two verified specialists whose past production case studies match your workflow requirements.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#cbd5cb] max-w-sm mx-auto text-sm sm:text-base text-[#5e6d55] font-mono shadow-xs">
          Reference ID: <span className="text-[#108a00] font-bold">{submittedId}</span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/experts"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-sm sm:text-base border border-[#cbd5cb] transition-colors text-center"
          >
            Browse Directory
          </Link>
          <Link
            href="/admin"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white text-sm sm:text-base font-bold shadow-xs transition-colors text-center"
          >
            View in Admin Queue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl p-6 sm:p-10 border border-[#e4ebe4] bg-white space-y-6 shadow-xs">
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Context Banners if coming from a blueprint or specialist profile */}
      {paramExpert && (
        <div className="p-4 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-medium">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-[#2563eb] shrink-0" />
            <span>
              Specialist Inquired: <strong className="font-bold text-[#1e3a8a]">{paramExpert}</strong>. We will coordinate this introduction with verified case studies.
            </span>
          </div>
          <span className="text-xs bg-white text-[#1d4ed8] font-mono font-bold px-3 py-1 rounded-full border border-[#bfdbfe] self-start sm:self-auto">
            Direct Match
          </span>
        </div>
      )}

      {paramNeed && !paramExpert && (
        <div className="p-4 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] text-[#0f3d17] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm font-medium">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-[#108a00] shrink-0" />
            <span>
              Pre-filled from Selected AI Blueprint. You can edit or add details below.
            </span>
          </div>
          <span className="text-xs bg-white text-[#108a00] font-mono font-bold px-3 py-1 rounded-full border border-[#b2e8b8] self-start sm:self-auto">
            Blueprint Match
          </span>
        </div>
      )}

      <div className="flex items-center gap-2.5 text-sm text-[#5e6d55] border-b border-[#f0f3f0] pb-4 font-medium">
        <Lock className="w-4 h-4 text-[#108a00] shrink-0" />
        <span>All inquiries are confidential and accessible only by the Find Ai Pros matchmaking team.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-[#001e00] mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="requesterName"
            required
            placeholder="e.g. Rachel Sterling"
            className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#001e00] mb-1.5">
            Work Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="requesterEmail"
            required
            placeholder="rachel@company.com"
            className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#001e00] mb-1.5">
          Company or Organization Name
        </label>
        <input
          type="text"
          name="company"
          placeholder="e.g. Summit Logistics Group"
          className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#001e00] mb-1.5">
          Describe Your Operational Bottleneck or AI Need <span className="text-rose-500">*</span>
        </label>
        <p className="text-sm text-[#5e6d55] mb-2 leading-relaxed">
          Explain what process you want to automate, what software you use, and what failure risks worry you most.
        </p>
        <textarea
          name="needDescription"
          required
          rows={4}
          value={needDescription}
          onChange={(e) => setNeedDescription(e.target.value)}
          placeholder="e.g. We receive 300+ invoices and receipts weekly. We want an automated scan and data-entry system, but we need our staff to approve any exceptions before data hits QuickBooks."
          className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-[#001e00] mb-1.5">
            Approximate Budget Range
          </label>
          <select
            name="budgetRange"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-semibold"
          >
            <option value="under_2500">Under $2,500 (Small sprint or audit)</option>
            <option value="2500_to_5000">$2,500 – $5,000 (Standard workflow)</option>
            <option value="5000_to_15000">$5,000 – $15,000 (Multi-step automation system)</option>
            <option value="15000_plus">$15,000+ (Enterprise integration)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#001e00] mb-1.5">
            Target Timeline <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="timeline"
            required
            defaultValue="Within 2-3 weeks"
            placeholder="e.g. Immediate / Next 30 days"
            className="w-full px-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#001e00] mb-2.5">
          Relevant Operational Categories
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCats.includes(cat.slug);
            return (
              <button
                type="button"
                key={cat.slug}
                onClick={() => toggleCategory(cat.slug)}
                className={`p-3.5 rounded-xl text-sm sm:text-base text-left border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#e4f7e6] border-[#108a00] text-[#0f3d17] font-bold shadow-xs'
                    : 'bg-[#f9faf9] border-[#e4ebe4] text-[#334133] hover:border-[#cbd5cb] font-medium'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? 'Submitting Inquiry...' : 'Submit Matchmaking Request'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
