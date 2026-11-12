'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="rounded-3xl p-8 sm:p-12 border border-line bg-white shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-soft border border-brand-line flex items-center justify-center mx-auto text-brand">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-ink">Admin Operations</h1>
          <p className="text-base text-muted-strong mt-3 max-w-lg mx-auto font-normal leading-relaxed">
            Form submissions from prospective AI experts and concierge match inquiries are collected directly in your linked form service (Tally, Google Forms, or email).
          </p>
        </div>

        <div className="pt-6 border-t border-line-soft flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/experts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-sm shadow-xs"
          >
            View All AI Experts <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas-muted hover:bg-brand-soft text-ink font-bold text-sm border border-line"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
