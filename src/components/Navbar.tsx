import Link from 'next/link';
import { ShieldCheck, Sparkles, UserPlus, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { isDemoMode } from '@/lib/store';

export default function Navbar() {
  const demoActive = isDemoMode();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-[#e4ebe4] shadow-xs">
      {/* Demo Mode Banner */}
      {demoActive && (
        <div className="bg-[#fff9eb] border-b border-[#fef08a] px-4 py-2 text-xs text-[#854d0e] flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ca8a04] shrink-0" />
          <span>
            <strong>Demo Mode Active:</strong> Displaying labeled seed experts. Database environment variables not connected.
          </span>
          <Link
            href="/admin"
            className="underline hover:text-[#713f12] ml-2 font-semibold inline-flex items-center gap-0.5"
          >
            Review Admin Queue <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-[#108a00]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-[#001e00] tracking-tight">HITL</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8]">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-[#5e6d55] font-medium leading-none">Human in the Loop AI Directory</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#222325]">
          <Link href="/experts" className="hover:text-[#108a00] transition-colors">
            Find Talent
          </Link>
          <Link href="/#categories" className="hover:text-[#108a00] transition-colors">
            Categories
          </Link>
          <Link href="/match" className="hover:text-[#108a00] transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#108a00]" />
            Concierge Match
          </Link>
          <Link href="/about" className="hover:text-[#108a00] transition-colors">
            Vetting Standards
          </Link>
          <Link href="/admin" className="text-xs text-[#5e6d55] hover:text-[#001e00] px-3 py-1.5 rounded-full border border-[#d5ded5] hover:border-[#108a00] transition-all">
            Admin
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/match"
            className="hidden sm:inline-flex text-xs font-semibold text-[#001e00] hover:bg-[#f2f4f2] px-4 py-2.5 rounded-full border border-[#d5ded5] transition-all"
          >
            Request Match
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#108a00] hover:bg-[#14a800] text-white px-5 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Apply as Specialist
          </Link>
        </div>
      </div>
    </header>
  );
}
