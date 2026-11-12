import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer data-reveal className="w-full bg-inverse text-inverse-muted pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-inverse-line">
          {/* Col 1: Brand & Positioning */}
          <div className="space-y-4">
            <Link href="/" className="brand-link flex items-center gap-3 group">
              <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
              <span className="font-display font-semibold text-white text-xl tracking-tight">
                Find Ai <span className="text-brand-on-dark">PROS</span>
              </span>
            </Link>
            <p className="text-sm text-inverse-text leading-relaxed">
              The directory of AI specialists who build systems with real human accountability. We reject zero-touch hallucination black boxes.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-inverse-raised border border-inverse-line text-sm font-semibold text-brand-tint">
                <span className="w-2 h-2 rounded-full bg-brand-on-dark animate-pulse" />
                References required.
              </div>
            </div>
          </div>

          {/* Col 2: Category Taxonomy */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Category Hubs
            </h2>
            <ul className="space-y-3 text-sm">
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
                <Link href="/categories/ai-advertising-paid-media" className="hover:text-brand-on-dark transition-colors font-medium">
                  AI Advertising & Paid Media Ops
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

          {/* Col 3: Platform */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              The HITL Standard
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/recommendations" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-brand-on-dark">
                  Find Your Business Solutions <ArrowRight className="w-3.5 h-3.5 text-brand-on-dark" />
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-brand-on-dark">
                  Find AI Pros Near You <ArrowRight className="w-3.5 h-3.5 text-brand-on-dark" />
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-white">
                  AI Models &amp; Tools Directory <ArrowRight className="w-3.5 h-3.5 text-brand-on-dark" />
                </Link>
              </li>
              <li>
                <Link href="/about#the-standard" className="hover:text-white transition-colors">
                  The HITL Standard
                </Link>
              </li>
              <li>
                <Link href="/about#references" className="hover:text-white transition-colors">
                  References we contact
                </Link>
              </li>
              <li>
                <Link href="/about#guardrail-interview" className="hover:text-white transition-colors">
                  Failure Safeguards Checklist
                </Link>
              </li>
              <li>
                <Link href="/match" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white">
                  Founder Concierge Match <ArrowRight className="w-3.5 h-3.5 text-brand-on-dark" />
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors">
                  Ai Expert? Join Here Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical & Admin */}
          <div>
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Governance &amp; Admin
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-inverse-raised text-brand-on-dark hover:text-white hover:bg-inverse-hover font-bold text-xs border border-inverse-line transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-on-dark" />
                  Admin Review Queue
                </Link>
              </li>
              <li>
                <span className="text-inverse-muted">PostgreSQL Schema (Supabase RLS)</span>
              </li>
              <li>
                <a
                  href="https://github.com/JustinMurray007/hitl-ai-expert-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-inverse-muted gap-4">
          <p>© 2026 Find Ai Pros. Real human oversight in every deployed system.</p>
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
