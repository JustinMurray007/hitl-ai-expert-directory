'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitExpertApplicationAction } from '@/app/actions';
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  { slug: 'operations-workflow-automation', label: 'Operations & Workflow Automation' },
  { slug: 'sales-lead-qualification', label: 'Sales & Lead Qualification' },
  { slug: 'customer-support-knowledge-base', label: 'Customer Support & Knowledge Bases' },
  { slug: 'marketing-programmatic-content', label: 'Marketing & Programmatic Content' },
  { slug: 'executive-personal-ai-ops', label: 'Executive & Personal AI Ops' },
];

const TOOL_OPTIONS = [
  'Make', 'Zapier', 'n8n', 'OpenAI API', 'Anthropic Claude', 'Google Gemini',
  'Perplexity', 'Vapi', 'Retell AI', 'Bland.ai', 'Twilio', 'Supabase / PostgreSQL',
  'Pinecone', 'HubSpot', 'Zoho CRM', 'GoHighLevel', 'Zendesk AI', 'Intercom AI',
  'Cursor', 'Python', 'TypeScript', 'Ollama / Local LLM',
];

const toolSlugMap: Record<string, string> = {
  'Make': 'make',
  'Zapier': 'zapier',
  'n8n': 'n8n',
  'OpenAI API': 'openai-api',
  'Anthropic Claude': 'anthropic-claude',
  'Google Gemini': 'gemini',
  'Perplexity': 'perplexity',
  'Vapi': 'vapi',
  'Retell AI': 'retell-ai',
  'Bland.ai': 'bland-ai',
  'Twilio': 'twilio',
  'Supabase / PostgreSQL': 'supabase-postgres',
  'Pinecone': 'pinecone',
  'HubSpot': 'hubspot',
  'Zoho CRM': 'zoho-crm',
  'GoHighLevel': 'gohighlevel',
  'Zendesk AI': 'zendesk',
  'Intercom AI': 'intercom',
  'Cursor': 'cursor',
  'Python': 'python',
  'TypeScript': 'typescript',
  'Ollama / Local LLM': 'ollama',
};

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    expertId?: string;
    applicationId?: string;
  } | null>(null);

  // Category and tool selections
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [tagline, setTagline] = useState('');

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter((s) => s !== slug));
    } else {
      if (selectedCategories.length >= 3) {
        alert('Rule: You may select at most 3 categories to maintain specialist focus.');
        return;
      }
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const toggleTool = (toolName: string) => {
    const slug = toolSlugMap[toolName] || toolName.toLowerCase();
    if (selectedTools.includes(slug)) {
      setSelectedTools(selectedTools.filter((t) => t !== slug));
    } else {
      setSelectedTools([...selectedTools, slug]);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (selectedCategories.length === 0) {
      setErrorMessage('Please select at least 1 category (max 3).');
      return;
    }
    if (selectedTools.length === 0) {
      setErrorMessage('Please select at least 1 primary tool or technology.');
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    selectedCategories.forEach((cat) => formData.append('categories', cat));
    selectedTools.forEach((tool) => formData.append('tools', tool));

    const result = await submitExpertApplicationAction(formData);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to submit application. Please review fields.');
    } else {
      setSuccessData({
        expertId: result.expertId,
        applicationId: result.applicationId,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Vetting Application</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#001e00] tracking-tight">
          Apply to the Human in the Loop Directory
        </h1>
        <p className="text-sm text-[#5e6d55] mt-2 leading-relaxed font-medium">
          We only list specialists who build systems with verifiable human oversight. Free public community listing on approval; Verified badge requires two reviewed production case studies.
        </p>
      </div>

      {/* Success State */}
      {successData ? (
        <div className="rounded-3xl p-8 sm:p-12 border border-[#b2e8b8] bg-[#edf7ee] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center mx-auto text-[#108a00]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#001e00]">Application Received</h2>
            <p className="text-sm text-[#465a46] mt-2 max-w-lg mx-auto font-medium">
              Your profile and case study have been submitted to the private review queue with status <code className="text-[#108a00] font-mono font-bold">pending_review</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#cbd5cb] max-w-md mx-auto text-xs text-[#5e6d55] font-mono text-left space-y-1 shadow-xs">
            <p>Expert ID: <span className="text-[#001e00] font-bold">{successData.expertId}</span></p>
            <p>Application ID: <span className="text-[#001e00] font-bold">{successData.applicationId}</span></p>
            <p>Status: <span className="text-[#d97706] font-bold">pending_review</span></p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-xs shadow-sm transition-all"
            >
              Open Admin Review Queue <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/experts"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#f4f6f4] text-[#001e00] font-bold text-xs border border-[#cbd5cb] transition-colors"
            >
              Back to Directory
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SECTION 1: PUBLIC PROFILE */}
          <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
            <div className="border-b border-[#f0f3f0] pb-4">
              <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
                Section 1 of 4
              </span>
              <h2 className="text-xl font-black text-[#001e00] mt-1">
                Public Specialist Profile
              </h2>
              <p className="text-xs text-[#5e6d55] mt-1">
                This information will appear on your public directory card and profile page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Professional Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="professionalTitle"
                  required
                  placeholder="e.g. Senior Automation Architect"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Agency or Firm Name (Optional)
              </label>
              <input
                type="text"
                name="agencyName"
                placeholder="e.g. Loopguard Systems"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-[#001e00]">
                  Tagline (Max 120 chars) <span className="text-rose-500">*</span>
                </label>
                <span className={`text-[10px] font-mono ${tagline.length > 120 ? 'text-rose-600 font-bold' : 'text-[#738273]'}`}>
                  {tagline.length} / 120
                </span>
              </div>
              <input
                type="text"
                name="tagline"
                required
                maxLength={120}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Deterministic ops pipelines with Slack-first human exception queues."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Bio & Background (Min 50 chars) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="bio"
                required
                rows={3}
                placeholder="Describe your technical background, industry specialties, and approach to client automation..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Austin"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">State / Region</label>
                <input
                  type="text"
                  name="stateRegion"
                  placeholder="TX"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  required
                  defaultValue="United States"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">Timezone *</label>
                <input
                  type="text"
                  name="timezone"
                  required
                  placeholder="CST (UTC-6)"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
            </div>

            {/* Links and Booking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  placeholder="https://youragency.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">Booking URL (Calendly, Cal.com)</label>
                <input
                  type="url"
                  name="bookingUrl"
                  placeholder="https://cal.com/your-name"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">GitHub / Code Profile</label>
                <input
                  type="url"
                  name="githubUrl"
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
            </div>

            {/* Engagement & Budget Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Primary Engagement Model *
                </label>
                <select
                  name="primaryEngagement"
                  required
                  defaultValue="fixed_sprint"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                >
                  <option value="fixed_sprint">Fixed Sprint (Deliverable-based)</option>
                  <option value="monthly_retainer">Monthly Retainer (Fractional Ops)</option>
                  <option value="consulting_audit">Consulting Audit (Architecture Review)</option>
                  <option value="hybrid">Hybrid (Sprint + Maintenance Retainer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Starting Project Budget *
                </label>
                <select
                  name="startingBudget"
                  required
                  defaultValue="2500_to_5000"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                >
                  <option value="under_2500">Under $2,500</option>
                  <option value="2500_to_5000">$2,500 to $5,000</option>
                  <option value="5000_to_15000">$5,000 to $15,000</option>
                  <option value="15000_plus">$15,000+ Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: CATEGORY & TOOLS TAXONOMY */}
          <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
            <div className="border-b border-[#f0f3f0] pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-[#108a00] font-bold">
                    Section 2 of 4
                  </span>
                  <h2 className="text-xl font-black text-[#001e00] mt-1">
                    Specialist Categories & Tools
                  </h2>
                </div>
                <div className="text-xs font-mono font-bold text-[#108a00] bg-[#e4f7e6] px-3 py-1 rounded-full border border-[#b2e8b8]">
                  {selectedCategories.length} / 3 Categories Selected
                </div>
              </div>
              <p className="text-xs text-[#5e6d55] mt-1">
                Rule: Specialists may select at most 3 core categories to avoid diluted positioning.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-3">
                Select 1 to 3 Primary Categories <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CATEGORY_OPTIONS.map((c) => {
                  const isChecked = selectedCategories.includes(c.slug);
                  return (
                    <button
                      type="button"
                      key={c.slug}
                      onClick={() => toggleCategory(c.slug)}
                      className={`p-3.5 rounded-xl text-xs text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#e4f7e6] border-[#108a00] text-[#0f3d17] font-bold shadow-xs'
                          : 'bg-[#f9faf9] border-[#e4ebe4] text-[#4b554b] hover:border-[#cbd5cb]'
                      }`}
                    >
                      <span>{c.label}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-2">
                Core Tool Stack (Select all that apply) <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TOOL_OPTIONS.map((tool) => {
                  const slug = toolSlugMap[tool] || tool.toLowerCase();
                  const isChecked = selectedTools.includes(slug);
                  return (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#108a00] text-white border-[#108a00] shadow-xs'
                          : 'bg-[#f4f6f4] text-[#4b554b] border-[#dbe3db] hover:border-[#108a00]'
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: PRIVATE INTAKE & VERIFICATION DATA */}
          <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
            <div className="border-b border-[#f0f3f0] pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#7e22ce] font-bold">
                  Section 3 of 4
                </span>
                <h2 className="text-xl font-black text-[#001e00] mt-1">
                  Private Entity & Intake Data
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#7e22ce] bg-[#f3e8ff] px-3 py-1 rounded-full border border-[#e9d5ff] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Service-Role Only (Never Public)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Business Contact Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  placeholder="you@yourcompany.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Legal Entity Type *
                </label>
                <select
                  name="legalEntityType"
                  required
                  defaultValue="LLC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                >
                  <option value="LLC">LLC</option>
                  <option value="S-Corp">S-Corporation</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Private Portfolio or Code Repo URLs (One per line)
              </label>
              <textarea
                name="portfolioUrls"
                rows={2}
                placeholder="https://github.com/private-org/repo-demo&#10;https://drive.google.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-[#334133] cursor-pointer">
              <input
                type="checkbox"
                name="referencesProvided"
                className="w-4 h-4 rounded border-[#cbd5cb] text-[#108a00] focus:ring-0"
              />
              <span>I can provide 1-2 verifiable client references upon request during review</span>
            </label>
          </div>

          {/* SECTION 4: PRIMARY PRODUCTION CASE STUDY */}
          <div className="rounded-2xl p-6 sm:p-8 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
            <div className="border-b border-[#f0f3f0] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4f7e6] border border-[#b2e8b8] text-xs font-bold text-[#108a00] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The HITL Proof Engine</span>
              </div>
              <h2 className="text-xl font-black text-[#001e00] mt-1">
                Primary Production Case Study
              </h2>
              <p className="text-xs text-[#5e6d55] mt-1">
                Verification requires two reviewed case studies. Submit your strongest production workflow here. You can submit your second study via the reviewer portal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Case Study Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="caseStudyTitle"
                  required
                  placeholder="e.g. Automated Freight Bill Extraction with Slack Quarantine"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Client Industry <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="clientIndustry"
                  required
                  placeholder="e.g. Regional Freight Logistics (50 Vehicles)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Client Bottleneck / Problem Statement (Min 30 chars) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="problemStatement"
                required
                rows={2}
                placeholder="What was broken? (e.g. 800 invoices received weekly across 12 carrier formats causing 4-day backlogs...)"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Solution Architecture & Flow (Min 30 chars) <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="solutionArchitecture"
                required
                rows={2}
                placeholder="What did you build? (e.g. Claude 3.5 Sonnet extraction on n8n with Supabase hash deduplication...)"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>

            {/* THE CRITICAL DIFFERENTIATOR FIELD */}
            <div className="rounded-xl bg-[#f2faf3] border-2 border-[#b2e8b8] p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#108a00] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#108a00]" />
                <span>The Core HITL Question (Mandatory Filter)</span>
              </div>
              <label className="block text-xs font-bold text-[#001e00]">
                What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case? <span className="text-rose-500">*</span>
              </label>
              <p className="text-[11px] text-[#5e6d55] leading-relaxed">
                Be specific. Do you route to a Slack webhook? A quarantine queue? Trigger an automated SIP warm transfer? &quot;100% autonomous / zero-touch&quot; submissions are automatically rejected.
              </p>
              <textarea
                name="hitlOversightMechanism"
                required
                rows={3}
                placeholder="e.g. Any line-item math variance > $0.05 or OCR confidence < 92% freezes database insertion and pushes a side-by-side PDF preview to the #freight-triage Slack channel with 1-click Approve / Adjust buttons."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#b2e8b8] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Failure Safeguards & Circuit Breakers (Min 25 chars) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="failureSafeguards"
                  required
                  rows={2}
                  placeholder="e.g. Postgres DLQ queue on API rejection, auto-retry caps, PagerDuty alert."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001e00] mb-1">
                  Quantified ROI & Business Outcome (Min 20 chars) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="outcomesRoi"
                  required
                  rows={2}
                  placeholder="e.g. 91% invoice processing time reduction, saving $38,000/month."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#001e00] mb-1">
                Loom Walkthrough or Demo Video URL (Recommended)
              </label>
              <input
                type="url"
                name="demoVideoUrl"
                placeholder="https://loom.com/share/..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-xs text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Validating & Submitting...' : 'Submit Application for Review'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[#738273] mt-3">
              By submitting, you agree to our vetting checklist and human accountability disclosure standards.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
