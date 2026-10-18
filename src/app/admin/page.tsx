'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="rounded-3xl p-8 sm:p-12 border border-[#e4ebe4] bg-white shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center mx-auto text-[#108a00]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#001e00]">Admin Operations</h1>
          <p className="text-base text-[#475569] mt-3 max-w-lg mx-auto font-normal leading-relaxed">
            Form submissions from prospective AI experts and concierge match inquiries are collected directly in your linked form service (Tally, Google Forms, or email).
          </p>
        </div>

        <div className="pt-6 border-t border-[#f0f3f0] flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/experts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-sm shadow-xs"
          >
            View All AI Experts <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f4f6f4] hover:bg-[#e4f7e6] text-[#001e00] font-bold text-sm border border-[#dbe3db]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
