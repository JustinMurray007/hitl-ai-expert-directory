import Link from 'next/link';
import { ShieldCheck, Sparkles, UserPlus, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { isDemoMode } from '@/lib/store';

export default function Navbar() {
  const demoActive = isDemoMode();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-[#e4ebe4] shadow-xs">
      {/* Demo Mode Banner */}
      {demoActive && (
        <div className="bg-[#fff9eb] border-b border-[#fef08a] px-4 py-2.5 text-sm text-[#854d0e] flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ca8a04] shrink-0" />
          <span>
            <strong>Demo Mode Active:</strong> Displaying labeled seed experts. Database environment variables not connected.
          </span>
          <Link
            href="/admin"
            className="underline hover:text-[#713f12] ml-2 font-bold inline-flex items-center gap-0.5"
          >
            Review Admin Queue <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-[#108a00]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl text-[#001e00] tracking-tight">HITL</span>
              <span className="text-sm uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8]">
                Verified
              </span>
            </div>
            <p className="text-sm text-[#5e6d55] font-semibold leading-none mt-1">Human in the Loop AI Directory</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-base font-semibold text-[#1e2a1e]">
          <Link href="/experts" className="hover:text-[#108a00] transition-colors">
            Find Talent
          </Link>
          <Link href="/recommendations" className="hover:text-[#1d4ed8] transition-colors flex items-center gap-1.5 text-[#1d4ed8] font-bold">
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            AI Recommender
            <span className="text-sm font-bold bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] px-2.5 py-0.5 rounded-full">
              Interactive
            </span>
          </Link>
          <Link href="/#categories" className="hover:text-[#108a00] transition-colors">
            Categories
          </Link>
          <Link href="/match" className="hover:text-[#108a00] transition-colors">
            Concierge Match
          </Link>
          <Link href="/about" className="hover:text-[#108a00] transition-colors">
            Vetting Standards
          </Link>
          <Link href="/admin" className="text-sm font-semibold text-[#5e6d55] hover:text-[#001e00] px-3.5 py-1.5 rounded-full border border-[#d5ded5] hover:border-[#108a00] transition-all">
            Admin
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/match"
            className="hidden sm:inline-flex text-sm font-bold text-[#001e00] hover:bg-[#f2f4f2] px-5 py-2.5 rounded-full border border-[#d5ded5] transition-all"
          >
            Request Match
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-sm font-bold bg-[#108a00] hover:bg-[#14a800] text-white px-6 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md"
          >
            <UserPlus className="w-4 h-4" />
            Apply as Specialist
          </Link>
        </div>
      </div>
    </header>
  );
}
