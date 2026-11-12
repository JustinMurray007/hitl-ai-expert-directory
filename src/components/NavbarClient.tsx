'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import {
  ShieldCheck,
  Sparkles,
  UserPlus,
  ChevronDown,
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
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
    href: '/business/logistics-freight',
    icon: Truck,
  },
  {
    name: 'Medical & Dental',
    desc: 'Emergency intake & patient routing',
    href: '/business/healthcare-dental',
    icon: Stethoscope,
  },
  {
    name: 'Home Services & Trades',
    desc: 'Estimate follow-ups & dispatch',
    href: '/business/home-services-trades',
    icon: Wrench,
  },
  {
    name: 'Legal & Accounting',
    desc: 'Citation checks & contract intake',
    href: '/business/legal-finance-consulting',
    icon: Scale,
  },
  {
    name: 'E-Commerce & Retail',
    desc: 'Inventory reconciliation & returns',
    href: '/business/ecommerce-retail',
    icon: ShoppingBag,
  },
  {
    name: 'Real Estate & Property',
    desc: 'Tenant triage & maintenance calls',
    href: '/business/real-estate-property',
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/95 border-b border-line shadow-xs">


      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 xl:h-20 flex items-center justify-between gap-2">
        <Link href="/" className="brand-link flex items-center gap-2 sm:gap-3 group shrink min-w-0">
          <Logo priority className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform" />
          <span className="font-display font-semibold text-base min-[420px]:text-lg sm:text-xl xl:text-2xl text-ink tracking-tight leading-none truncate">
            <span className="sm:hidden">Find Ai</span>
            <span className="hidden sm:inline">
              Find Ai <span className="bg-gradient-to-r from-brand to-hub-sky bg-clip-text text-transparent">PROS</span>
            </span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 text-base font-semibold text-ink" aria-label="Primary">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              onMouseEnter={() => setMegaMenuOpen(true)}
              className={`nav-link inline-flex items-center gap-1.5 px-3 rounded-xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40 ${
                megaMenuOpen ? 'text-brand bg-brand-soft' : ''
              }`}
              aria-expanded={megaMenuOpen}
              aria-controls="desktop-mega-menu"
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
            onMouseEnter={() => setMegaMenuOpen(false)}
            className="nav-link inline-flex items-center gap-1.5 px-3 rounded-xl text-ink"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Find Your Business</span>
          </Link>

          <Link
            href="/tools"
            onMouseEnter={() => setMegaMenuOpen(false)}
            className="nav-link inline-flex items-center px-3 rounded-xl"
          >
            AI Tools
          </Link>

          <Link
            href="/about#how-it-works"
            onMouseEnter={() => setMegaMenuOpen(false)}
            className="nav-link inline-flex items-center px-3 rounded-xl"
          >
            How It Works
          </Link>

          <Link
            href="/match"
            onMouseEnter={() => setMegaMenuOpen(false)}
            className="nav-link inline-flex items-center px-3 rounded-xl"
          >
            Concierge Match
          </Link>
        </nav>

        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-sm font-bold bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-full shadow-rest"
          >
            <UserPlus className="w-4 h-4" />
            Ai Expert? Join Here Free
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center min-h-11 px-3.5 text-sm font-bold bg-brand text-white rounded-full"
          >
            Join Free
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl text-ink hover:bg-slate-100"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
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
          id="desktop-mega-menu"
          className="hidden xl:block absolute top-full left-0 w-full bg-white z-50 border-b border-line-strong mega-menu-shadow"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Column 1: Solution Domains (5 cols) */}
              <div className="col-span-5 pr-4 border-r border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-medium tracking-wider uppercase text-slate-500">
                    By Solution Area
                  </span>
                  <Link
                    href="/categories"
                    className="text-sm font-medium text-brand hover:underline flex items-center gap-1"
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
                        className="menu-link group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60"
                      >
                        <div
                          className={`w-9 h-9 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div>
                          <div className="text-base font-medium text-ink group-hover:text-brand transition-colors">
                            {item.name}
                          </div>
                          <p className="text-sm font-normal text-slate-600 leading-snug">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Industry Verticals (4 cols) */}
              <div className="col-span-4 pr-4 border-r border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-medium tracking-wider uppercase text-slate-500">
                    By Target Industry
                  </span>
                  <Link
                    href="/recommendations"
                    className="text-sm font-medium text-brand hover:underline flex items-center gap-1"
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
                        className="menu-link group flex items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-slate-50"
                      >
                        <IndIcon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-brand" />
                        <span className="text-base font-medium text-ink group-hover:text-brand">
                          {ind.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link
                    href="/experts"
                    className="text-base font-medium text-brand hover:text-brand-hover flex items-center justify-between p-2 rounded-lg bg-brand-soft/50 hover:bg-brand-soft transition-colors"
                  >
                    <span>Browse All 26+ AI Experts</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/locations"
                    className="text-sm font-medium text-brand hover:text-brand flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors mt-1"
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
                  <h4 className="text-lg font-medium text-ink leading-snug">
                    Built-In Human Safety Checks.
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                    Every listed specialist names one accountable person and gives references we can contact. Case studies are optional.
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-ink font-normal">
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
                      className="w-full text-center py-2.5 px-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-all shadow-xs"
                    >
                      Request Founder Match
                    </Link>
                    <Link
                      href="/about"
                      className="text-center text-sm font-medium text-slate-600 hover:text-ink transition-colors"
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
          MOBILE DRAWER (SM / MD SCREENS)
      ======================================================================== */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="xl:hidden border-b border-line bg-white px-4 py-4 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Quick Links */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <Link
              href="/experts"
              className="menu-link flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-bold text-ink"
            >
              <span>Browse All AI Experts</span>
              <ArrowRight className="w-4 h-4 text-brand" />
            </Link>
            <Link
              href="/recommendations"
              className="menu-link flex items-center justify-between p-3 rounded-xl bg-blue-50 text-base font-bold text-blue-900"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Find Your Business</span>
              </div>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">Free Tool</span>
            </Link>
            <Link
              href="/tools"
              className="menu-link flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-medium text-ink"
            >
              <span>AI Tools</span>
              <ArrowRight className="w-4 h-4 text-brand" />
            </Link>
            <Link
              href="/match"
              className="menu-link flex items-center justify-between p-3 rounded-xl bg-brand-soft text-base font-bold text-ink"
            >
              <span>Request Concierge Match</span>
              <ArrowRight className="w-4 h-4 text-brand" />
            </Link>
            <Link
              href="/about#how-it-works"
              className="menu-link flex items-center p-3 text-base font-medium text-slate-700 hover:text-ink"
            >
              How It Works
            </Link>
            <Link
              href="/categories"
              className="menu-link flex items-center p-3 text-base font-semibold text-slate-700 hover:text-ink"
            >
              Browse Category Hubs
            </Link>
            <Link
              href="/locations"
              className="menu-link flex items-center justify-between p-3 rounded-xl bg-slate-50 text-base font-bold text-ink hover:bg-brand-soft"
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
            <div className="text-sm font-mono font-medium uppercase tracking-wider text-slate-500 mb-3">
              Explore by Solution
            </div>
            <div className="grid grid-cols-1 gap-2">
              {solutionCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="menu-link flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-800"
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

          <div>
            <div className="text-sm font-mono font-medium uppercase tracking-wider text-slate-500 mb-3">
              Explore by industry
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {industryVerticals.map((ind) => {
                const IndIcon = ind.icon;
                return (
                  <Link
                    key={ind.name}
                    href={ind.href}
                    className="menu-link flex items-center gap-3 rounded-xl px-2.5 py-2 text-base font-medium text-ink hover:bg-slate-50"
                  >
                    <IndIcon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="min-w-0">
                      <span className="block">{ind.name}</span>
                      <span className="block text-sm font-normal text-muted-strong">{ind.desc}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/apply"
              className="inline-flex w-full items-center justify-center min-h-11 py-3 rounded-full bg-brand text-white font-bold text-base shadow-rest"
            >
              Ai Expert? Join Here Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
