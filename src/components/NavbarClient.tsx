'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Sparkles,
  UserPlus,
  ShieldAlert,
  ArrowUpRight,
  ChevronDown,
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  Cpu,
  ArrowRight,
  Menu,
  X,
  Truck,
  Stethoscope,
  Wrench,
  Scale,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Layers,
  Target,
} from 'lucide-react';

interface NavbarClientProps {
  demoActive: boolean;
}

const solutionCategories = [
  {
    name: 'Workflow Automation',
    desc: 'Invoice processing, QuickBooks sync & automations',
    href: '/categories/operations-workflow-automation',
    icon: Workflow,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    name: 'Voice AI & Telephony',
    desc: '24/7 call answering, booking & live staff transfers',
    href: '/categories/sales-lead-qualification',
    icon: PhoneCall,
    color: 'text-[#108a00]',
    bg: 'bg-[#e4f7e6]',
    border: 'border-[#b2e8b8]',
  },
  {
    name: 'Customer Support & Knowledge Bases',
    desc: 'AI search for company files, FAQs & client questions',
    href: '/categories/customer-support-knowledge-base',
    icon: LifeBuoy,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  {
    name: 'Marketing & SEO Automation',
    desc: 'Local Google ranking, quote follow-ups & review generation',
    href: '/categories/marketing-programmatic-content',
    icon: Megaphone,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    name: 'Executive & Personal Ops',
    desc: 'Inbox triage, meeting digestion & daily briefs',
    href: '/categories/executive-personal-ai-ops',
    icon: UserCheck,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    name: 'AI Advertising & Paid Media',
    desc: 'Automated ad creative, budget management & lead tracking',
    href: '/categories/ai-advertising-paid-media',
    icon: Target,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
];

const industryVerticals = [
  {
    name: 'Freight & Logistics',
    desc: 'Bill parsing & automated quarantine',
    href: '/recommendations?industry=freight_logistics',
    icon: Truck,
  },
  {
    name: 'Medical & Dental',
    desc: 'Emergency intake & patient routing',
    href: '/recommendations?industry=medical_dental',
    icon: Stethoscope,
  },
  {
    name: 'Home Services & Trades',
    desc: 'Estimate follow-ups & dispatch',
    href: '/recommendations?industry=home_services_trade',
    icon: Wrench,
  },
  {
    name: 'Legal & Accounting',
    desc: 'Citation checks & contract intake',
    href: '/recommendations?industry=legal_accounting',
    icon: Scale,
  },
  {
    name: 'E-Commerce & Retail',
    desc: 'Inventory reconciliation & returns',
    href: '/recommendations?industry=ecommerce_retail',
    icon: ShoppingBag,
  },
  {
    name: 'Real Estate & Property',
    desc: 'Tenant triage & maintenance calls',
    href: '/recommendations?industry=real_estate_property',
    icon: Building2,
  },
];

export default function NavbarClient({ demoActive }: NavbarClientProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle outside clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-[#e4ebe4] shadow-xs">
      {/* Demo Mode Notice */}
      {demoActive && (
        <div className="bg-[#fff9eb] border-b border-[#fef08a] px-4 py-2 text-sm text-[#854d0e] flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#ca8a04] shrink-0" />
          <span>
            <strong>Demo Mode:</strong> Seed experts displayed.
          </span>
          <Link
            href="/admin"
            className="underline hover:text-[#713f12] ml-2 font-bold inline-flex items-center gap-0.5"
          >
            Review Admin Queue <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: Find Ai Pros emblem and typography */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-icon.png"
              alt="Find Ai Pros Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-black text-2xl text-[#001e00] tracking-tight leading-none block">
              Find Ai <span className="bg-gradient-to-r from-[#108a00] via-[#0d9488] to-[#0284c7] bg-clip-text text-transparent">PROS</span>
            </span>
            <p className="text-xs text-[#5e6d55] font-semibold tracking-tight mt-1">Verified AI Specialists Directory</p>
          </div>
        </Link>

        {/* Simplified Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-semibold text-[#1e2a1e]">
          {/* Mega Menu Trigger */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              className={`inline-flex items-center gap-1.5 py-2 hover:text-[#108a00] transition-colors focus:outline-hidden ${
                megaMenuOpen ? 'text-[#108a00]' : ''
              }`}
              aria-expanded={megaMenuOpen}
            >
              <span>Find Specialists</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  megaMenuOpen ? 'rotate-180 text-[#108a00]' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          <Link
            href="/recommendations"
            className="hover:text-[#1d4ed8] transition-colors flex items-center gap-1.5 text-[#1e2a1e]"
          >
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            <span>Find Your Business</span>
          </Link>

          <Link href="/ai-tools" className="hover:text-[#108a00] transition-colors">
            AI Tools
          </Link>

          <Link href="/about" className="hover:text-[#108a00] transition-colors">
            How It Works
          </Link>

          <Link href="/match" className="hover:text-[#108a00] transition-colors">
            Concierge Match
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-sm font-bold bg-[#108a00] hover:bg-[#14a800] text-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <UserPlus className="w-4 h-4" />
            Ai Expert? Join Here Free
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/apply"
            className="text-xs font-bold bg-[#108a00] text-white px-3 py-2 rounded-full"
          >
            Join Free
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#001e00] hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* =======================================================================
          MEGA MENU DROPDOWN (DESKTOP)
      ======================================================================== */}
      {megaMenuOpen && (
        <div
          ref={megaMenuRef}
          onMouseLeave={() => setMegaMenuOpen(false)}
          className="hidden lg:block absolute top-full left-0 w-full bg-white z-50 border-b border-[#c8d6c8] mega-menu-shadow transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Column 1: Solution Domains (5 cols) */}
              <div className="col-span-5 pr-4 border-r border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                    By Solution Area
                  </span>
                  <Link
                    href="/categories"
                    className="text-xs font-bold text-[#108a00] hover:underline flex items-center gap-1"
                  >
                    All 6 Categories <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {solutionCategories.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
                      >
                        <div
                          className={`w-9 h-9 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#001e00] group-hover:text-[#108a00] transition-colors">
                            {item.name}
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Industry Verticals (4 cols) */}
              <div className="col-span-4 pr-4 border-r border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                    By Target Industry
                  </span>
                  <Link
                    href="/recommendations"
                    className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                  >
                    AI Blueprints <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {industryVerticals.map((ind) => {
                    const IndIcon = ind.icon;
                    return (
                      <Link
                        key={ind.name}
                        href={ind.href}
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <IndIcon className="w-4 h-4 text-slate-400 group-hover:text-[#108a00] transition-colors" />
                          <span className="text-sm font-semibold text-[#001e00] group-hover:text-[#108a00] transition-colors">
                            {ind.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-slate-600">
                          {ind.desc}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link
                    href="/experts"
                    className="text-sm font-bold text-[#108a00] hover:text-[#14a800] flex items-center justify-between p-2 rounded-lg bg-[#e4f7e6]/50 hover:bg-[#e4f7e6] transition-colors"
                  >
                    <span>Browse All 15+ Verified Specialists</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Column 3: HITL Guarantee Card (3 cols) */}
              <div className="col-span-3 flex flex-col justify-between">
                <div className="rounded-2xl p-6 bg-gradient-to-br from-[#e4f7e6]/90 via-white to-[#eff6ff] border border-[#b2e8b8] shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#108a00] text-white text-xs font-bold mb-3 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>The Find Ai Pros Guarantee</span>
                  </div>
                  <h4 className="text-base font-black text-[#001e00] leading-snug">
                    Zero Unvetted Claims. Built-In Human Safety Checks.
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    Unlike open freelance platforms, every specialist has submitted 2 client case studies with verified human checkpoints before anything goes out.
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-[#001e00] font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      <span>Code &amp; Systems Audited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      <span>No Fake 5-Star Paid Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#108a00] shrink-0" />
                      <span>Instant Staff Alerts &amp; Human Review</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#b2e8b8]/60 flex flex-col gap-2">
                    <Link
                      href="/match"
                      className="w-full text-center py-2 px-3 rounded-xl bg-[#108a00] hover:bg-[#14a800] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Request Founder Match
                    </Link>
                    <Link
                      href="/about"
                      className="text-center text-xs font-bold text-slate-600 hover:text-[#001e00] transition-colors"
                    >
                      Read Vetting Standard →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          MOBILE DRAWER (SM / MD SCREENS)
      ======================================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e4ebe4] bg-white px-4 py-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Quick Links */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <Link
              href="/experts"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-bold text-[#001e00]"
            >
              <span>Browse All Verified Specialists</span>
              <ArrowRight className="w-4 h-4 text-[#108a00]" />
            </Link>
            <Link
              href="/recommendations"
              className="flex items-center justify-between p-3 rounded-xl bg-blue-50 text-base font-bold text-blue-900"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Find Your Business</span>
              </div>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Free Tool</span>
            </Link>
            <Link
              href="/ai-tools"
              className="flex items-center justify-between p-3 rounded-xl bg-purple-50 text-base font-bold text-purple-900"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>AI Models &amp; Tools</span>
              </div>
              <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">Directory</span>
            </Link>
            <Link
              href="/match"
              className="flex items-center justify-between p-3 rounded-xl bg-[#e4f7e6] text-base font-bold text-[#001e00]"
            >
              <span>Request Concierge Match</span>
              <ArrowRight className="w-4 h-4 text-[#108a00]" />
            </Link>
            <Link
              href="/about"
              className="block p-3 text-base font-semibold text-slate-700 hover:text-[#001e00]"
            >
              How It Works & Vetting Standards
            </Link>
            <Link
              href="/categories"
              className="block p-3 text-base font-semibold text-slate-700 hover:text-[#001e00]"
            >
              Browse Category Hubs
            </Link>
          </div>

          {/* Solutions List */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore by Solution
            </div>
            <div className="grid grid-cols-1 gap-2">
              {solutionCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-sm font-semibold text-slate-800"
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/apply"
              className="w-full text-center py-3 rounded-full bg-[#108a00] text-white font-bold text-sm shadow-sm"
            >
              Ai Expert? Join Here Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
