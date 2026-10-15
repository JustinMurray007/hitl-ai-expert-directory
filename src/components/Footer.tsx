import Link from 'next/link';
import { ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="w-full bg-[#001e00] text-[#a0aba0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#1b3a1b]">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#14a800]/20 border border-[#14a800]/40 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#14a800]" />
              </div>
              <span className="font-bold text-white text-base">Human in the Loop</span>
            </Link>
            <p className="text-xs text-[#a0aba0] leading-relaxed">
              The verified directory of AI specialists who build systems with real human accountability. We reject zero-touch hallucination black boxes.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b3a1b] border border-[#2b522b] text-xs text-[#c1eec6]">
                <span className="w-2 h-2 rounded-full bg-[#14a800] animate-pulse" />
                Vetting Gate: 2 Case Studies Required
              </div>
            </div>
          </div>

          {/* Col 2: Category Taxonomy */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Category Hubs
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/categories/operations-workflow-automation" className="hover:text-white transition-colors">
                  Operations & Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/categories/sales-lead-qualification" className="hover:text-white transition-colors">
                  Sales & Lead Qualification
                </Link>
              </li>
              <li>
                <Link href="/categories/customer-support-knowledge-base" className="hover:text-white transition-colors">
                  Customer Support & Knowledge Bases
                </Link>
              </li>
              <li>
                <Link href="/categories/marketing-programmatic-content" className="hover:text-white transition-colors">
                  Marketing & Programmatic Content
                </Link>
              </li>
              <li>
                <Link href="/categories/executive-personal-ai-ops" className="hover:text-white transition-colors">
                  Executive & Personal AI Ops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform & Vetting */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Vetting Standards
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about#the-standard" className="hover:text-white transition-colors">
                  The HITL Standard
                </Link>
              </li>
              <li>
                <Link href="/about#two-case-studies" className="hover:text-white transition-colors">
                  Two Case Studies Rule
                </Link>
              </li>
              <li>
                <Link href="/about#guardrail-interview" className="hover:text-white transition-colors">
                  Failure Safeguards Checklist
                </Link>
              </li>
              <li>
                <Link href="/match" className="hover:text-[#14a800] transition-colors flex items-center gap-1 font-semibold text-white">
                  Founder Concierge Match <ArrowRight className="w-3 h-3 text-[#14a800]" />
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors">
                  Apply for Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical & Admin */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Architecture & Admin
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Review Queue
                </Link>
              </li>
              <li>
                <span className="text-[#6d7a6d]">PostgreSQL Schema (Supabase RLS)</span>
              </li>
              <li>
                <Link href="/api/health" className="hover:text-white transition-colors flex items-center gap-1">
                  API Health Status <ExternalLink className="w-3 h-3 text-[#6d7a6d]" />
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/JustinMurray007/hitl-ai-expert-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6d7a6d] gap-4">
          <p>© 2026 Human in the Loop (HITL) Directory. Real human oversight in every deployed system.</p>
          <div className="flex items-center gap-6">
            <span>Next.js 15 App Router</span>
            <span>Tailwind CSS</span>
            <span>Supabase RLS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
