import Link from 'next/link';
import { ShieldCheck, Sparkles, UserPlus, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { isDemoMode } from '@/lib/store';

export default function Navbar() {
  const demoActive = isDemoMode();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#090a0f]/85 border-b border-white/[0.07]">
      {/* Yellow Demo Mode Banner */}
      {demoActive && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 text-xs text-amber-300 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong>Demo Mode Active:</strong> Running locally against labeled seed data. Submissions and reviews are stored in-memory.
          </span>
          <Link
            href="/admin"
            className="underline hover:text-amber-100 ml-2 font-medium inline-flex items-center gap-0.5"
          >
            Review Admin Queue <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <div className="w-full h-full bg-[#090a0f] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">HITL</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-none">Human in the Loop AI Directory</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <Link href="/experts" className="hover:text-emerald-400 transition-colors">
            Browse Experts
          </Link>
          <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
            Categories
          </Link>
          <Link href="/match" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Concierge Match
          </Link>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            Vetting Standards
          </Link>
          <Link href="/admin" className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-md border border-white/10 hover:border-white/20 transition-all">
            Admin
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/match"
            className="hidden sm:inline-flex text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            Find an Expert
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-lg shadow-md shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Apply to Directory
          </Link>
        </div>
      </div>
    </header>
  );
}
