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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-icon.png"
                  alt="Find Ai Pros Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-white text-xl tracking-tight">
                Find Ai <span className="text-[#38d976]">PROS</span>
              </span>
            </Link>
            <p className="text-sm text-[#b2beb2] leading-relaxed">
              The verified directory of AI specialists who build systems with real human accountability. We reject zero-touch hallucination black boxes.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1b3a1b] border border-[#2b522b] text-sm font-semibold text-[#c1eec6]">
                <span className="w-2 h-2 rounded-full bg-[#14a800] animate-pulse" />
                Vetting Gate: 2 Case Studies Required
              </div>
            </div>
          </div>

          {/* Col 2: Category Taxonomy */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-5">
              Category Hubs
            </h4>
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
                <Link href="/categories/ai-advertising-paid-media" className="hover:text-[#57df66] transition-colors font-medium">
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

          {/* Col 3: Platform & Vetting */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-5">
              Vetting Standards
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/recommendations" className="hover:text-[#14a800] transition-colors flex items-center gap-1.5 font-bold text-[#57df66]">
                  Find Your Business Solutions <ArrowRight className="w-3.5 h-3.5 text-[#14a800]" />
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="hover:text-[#14a800] transition-colors flex items-center gap-1.5 font-medium text-white">
                  AI Models &amp; Tools Directory <ArrowRight className="w-3.5 h-3.5 text-[#14a800]" />
                </Link>
              </li>
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
                <Link href="/match" className="hover:text-[#14a800] transition-colors flex items-center gap-1.5 font-bold text-white">
                  Founder Concierge Match <ArrowRight className="w-3.5 h-3.5 text-[#14a800]" />
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
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-5">
              Governance &amp; Admin
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1b3a1b] text-[#57df66] hover:text-white hover:bg-[#275327] font-bold text-xs border border-[#2b522b] transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[#14a800]" />
                  Admin Review Queue
                </Link>
              </li>
              <li>
                <span className="text-[#889888]">PostgreSQL Schema (Supabase RLS)</span>
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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-[#889888] gap-4">
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
