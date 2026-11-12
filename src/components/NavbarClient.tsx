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
  MapPin,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Layers,
  Target,
  Coins,
  ExternalLink,
  Gift,
} from 'lucide-react';
import { SAVE_ON_AI_DEALS } from '@/lib/ai-tools';

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
    color: 'text-hub-indigo',
    bg: 'bg-hub-indigo-soft',
    border: 'border-hub-indigo-line',
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
  const [aiToolsMenuOpen, setAiToolsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const aiToolsMenuRef = useRef<HTMLDivElement>(null);
  const aiToolsButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setAiToolsMenuOpen(false);
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
      if (
        aiToolsMenuRef.current &&
        !aiToolsMenuRef.current.contains(event.target as Node) &&
        aiToolsButtonRef.current &&
        !aiToolsButtonRef.current.contains(event.target as Node)
      ) {
        setAiToolsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-line shadow-xs">


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
          <span className="font-display font-semibold text-2xl text-ink tracking-tight leading-none">
            Find Ai <span className="bg-gradient-to-r from-brand to-hub-sky bg-clip-text text-transparent">PROS</span>
          </span>
        </Link>

        {/* Simplified Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-semibold text-ink">
          {/* Mega Menu Trigger */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => {
                setMegaMenuOpen(!megaMenuOpen);
                if (!megaMenuOpen) setAiToolsMenuOpen(false);
              }}
              onMouseEnter={() => {
                setMegaMenuOpen(true);
                setAiToolsMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 py-2 rounded-lg hover:text-brand transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40 ${
                megaMenuOpen ? 'text-brand' : ''
              }`}
              aria-expanded={megaMenuOpen}
            >
              <span>Find Ai Expert</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  megaMenuOpen ? 'rotate-180 text-brand' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          <Link
            href="/recommendations"
            onMouseEnter={() => {
              setMegaMenuOpen(false);
              setAiToolsMenuOpen(false);
            }}
            className="hover:text-brand transition-colors flex items-center gap-1.5 text-ink"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Find Your Business</span>
          </Link>

          {/* AI Tools & Save on AI Dropdown Trigger */}
          <div className="relative">
            <button
              ref={aiToolsButtonRef}
              type="button"
              onClick={() => {
                setAiToolsMenuOpen(!aiToolsMenuOpen);
                if (!aiToolsMenuOpen) setMegaMenuOpen(false);
              }}
              onMouseEnter={() => {
                setAiToolsMenuOpen(true);
                setMegaMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1.5 py-2 rounded-lg hover:text-brand transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40 ${
                aiToolsMenuOpen ? 'text-brand' : ''
              }`}
              aria-expanded={aiToolsMenuOpen}
            >
              <span>AI Tools</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  aiToolsMenuOpen ? 'rotate-180 text-brand' : 'text-slate-400'
                }`}
              />
            </button>
          </div>

          <Link
            href="/about"
            onMouseEnter={() => {
              setMegaMenuOpen(false);
              setAiToolsMenuOpen(false);
            }}
            className="hover:text-brand transition-colors"
          >
            How It Works
          </Link>

          <Link
            href="/match"
            onMouseEnter={() => {
              setMegaMenuOpen(false);
              setAiToolsMenuOpen(false);
            }}
            className="hover:text-brand transition-colors"
          >
            Concierge Match
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-sm font-bold bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <UserPlus className="w-4 h-4" />
            Ai Expert? Join Here Free
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/apply"
            className="text-xs font-bold bg-brand text-white px-3 py-2 rounded-full"
          >
            Join Free
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-ink hover:bg-slate-100 transition-colors"
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
          className="hidden lg:block absolute top-full left-0 w-full bg-white z-50 border-b border-line-strong mega-menu-shadow transition-all duration-200 animate-in fade-in slide-in-from-top-2"
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
                    className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
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
                          <div className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
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
                    className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
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
                          <IndIcon className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                          <span className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
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
                    className="text-sm font-bold text-brand hover:text-brand-hover flex items-center justify-between p-2 rounded-lg bg-brand-soft/50 hover:bg-brand-soft transition-colors"
                  >
                    <span>Browse All 26+ AI Experts</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/locations"
                    className="text-xs font-bold text-brand hover:text-brand flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors mt-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Find AI Consultants Near You (By City &amp; State)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Column 3: HITL Guarantee Card (3 cols) */}
              <div className="col-span-3 flex flex-col justify-between">
                <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-soft/90 via-white to-brand-soft border border-brand-line shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand text-white text-xs font-bold mb-3 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>The accountability standard</span>
                  </div>
                  <h4 className="text-base font-semibold text-ink leading-snug">
                    Built-In Human Safety Checks.
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    Every listed specialist names one accountable person and gives references we can contact. Case studies are optional.
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-ink font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                      <span>Code &amp; Systems Audited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                      <span>No Fake 5-Star Paid Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                      <span>Instant Staff Alerts &amp; Human Review</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-brand-line/60 flex flex-col gap-2">
                    <Link
                      href="/match"
                      className="w-full text-center py-2 px-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Request Founder Match
                    </Link>
                    <Link
                      href="/about"
                      className="text-center text-xs font-bold text-slate-600 hover:text-ink transition-colors"
                    >
                      Read the HITL Standard →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          AI TOOLS & SAVE ON AI MEGA DROPDOWN (DESKTOP)
      ======================================================================== */}
      {aiToolsMenuOpen && (
        <div
          ref={aiToolsMenuRef}
          onMouseLeave={() => setAiToolsMenuOpen(false)}
          className="hidden lg:block absolute top-full left-0 w-full bg-white z-50 border-b border-line-strong mega-menu-shadow transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: AI Tools Overview & Quick Navigation (4 cols) */}
              <div className="col-span-4 pr-6 border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                      Explore AI Stack
                    </span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
                      35+ Models &amp; Tools
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink tracking-tight">
                    AI Tools Directory
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Explore curated, battle-tested AI models, voice telephony APIs, coding assistants, and workflow automation platforms used by real businesses.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <Link
                      href="/ai-tools"
                      onClick={() => setAiToolsMenuOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-canvas-muted border border-line hover:border-brand hover:bg-white transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-soft text-brand flex items-center justify-center font-bold">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
                            Browse All 35+ AI Tools
                          </div>
                          <div className="text-[11px] text-slate-500">Search, filter &amp; compare models</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand transition-colors" />
                    </Link>

                    <Link
                      href="/ai-tools"
                      onClick={() => setAiToolsMenuOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-brand-soft border border-brand-line hover:border-brand hover:bg-brand-soft transition-all shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center font-bold">
                          <Coins className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
                            Save on Ai Hub
                          </div>
                          <div className="text-[11px] text-brand font-semibold">Verified business credits &amp; grants</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand" />
                    </Link>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Zero student fluff • Built for businesses</span>
                  <Link
                    href="/match"
                    onClick={() => setAiToolsMenuOpen(false)}
                    className="text-brand font-bold hover:underline"
                  >
                    Need an Expert? →
                  </Link>
                </div>
              </div>

              {/* Right Column: "Save on Ai" Offers, Discounts & Grants (8 cols) */}
              <div className="col-span-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold tracking-wider uppercase text-brand flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-brand" />
                      Save on Ai:
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      Offers, Discounts &amp; Startup Grants
                    </span>
                  </div>
                  <Link
                    href="/ai-tools"
                    onClick={() => setAiToolsMenuOpen(false)}
                    className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                  >
                    View in Directory <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* 2-Column Grid of Verified Business Deals */}
                <div className="grid grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {SAVE_ON_AI_DEALS.map((deal) => (
                    <a
                      key={deal.id}
                      href={deal.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3.5 rounded-xl bg-canvas border border-line hover:border-brand hover:bg-white transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            {deal.company}
                          </span>
                          <span className="text-[10px] font-mono font-semibold bg-brand-soft border border-brand-line text-brand px-2 py-0.5 rounded-full">
                            {deal.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-ink group-hover:text-brand transition-colors leading-snug">
                          {deal.headline}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {deal.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium truncate pr-2">{deal.category}</span>
                        <span className="font-bold text-brand inline-flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                          Claim <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </a>
                  ))}
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
        <div className="lg:hidden border-b border-line bg-white px-4 py-6 space-y-6 max-h-[85vh] overflow-y-auto">
          {/* Quick Links */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <Link
              href="/experts"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-bold text-ink"
            >
              <span>Browse All AI Experts</span>
              <ArrowRight className="w-4 h-4 text-brand" />
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
            {/* AI Tools & Save on Ai Mobile Section */}
            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <Link
                  href="/ai-tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-bold text-purple-950 text-base hover:text-brand"
                >
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span>AI Models &amp; Tools</span>
                </Link>
                <Link
                  href="/ai-tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-full"
                >
                  35+ Tools
                </Link>
              </div>

              {/* Save on AI sub-list */}
              <div className="pt-2.5 border-t border-purple-200/50">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-brand" />
                    Save on Ai: Credits &amp; Grants
                  </span>
                  <Link
                    href="/ai-tools"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[10px] font-bold text-slate-500 hover:underline"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {SAVE_ON_AI_DEALS.slice(0, 5).map((deal) => (
                    <a
                      key={deal.id}
                      href={deal.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 hover:border-brand"
                    >
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span className="font-bold text-ink">{deal.company}:</span>
                        <span className="text-slate-600 truncate">{deal.headline}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-brand bg-brand-soft px-1.5 py-0.5 rounded shrink-0">
                        {deal.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/match"
              className="flex items-center justify-between p-3 rounded-xl bg-brand-soft text-base font-bold text-ink"
            >
              <span>Request Concierge Match</span>
              <ArrowRight className="w-4 h-4 text-brand" />
            </Link>
            <Link
              href="/about"
              className="block p-3 text-base font-semibold text-slate-700 hover:text-ink"
            >
              How It Works & the HITL Standard
            </Link>
            <Link
              href="/categories"
              className="block p-3 text-base font-semibold text-slate-700 hover:text-ink"
            >
              Browse Category Hubs
            </Link>
            <Link
              href="/locations"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-bold text-ink hover:bg-brand-soft"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                Find AI Near You (City &amp; State)
              </span>
              <ArrowRight className="w-4 h-4 text-brand" />
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
              className="w-full text-center py-3 rounded-full bg-brand text-white font-bold text-sm shadow-sm"
            >
              Ai Expert? Join Here Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
