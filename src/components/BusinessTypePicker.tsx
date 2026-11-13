import Link from 'next/link';
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Factory,
  FileText,
  GraduationCap,
  HelpCircle,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { INDUSTRY_RECOMMENDATIONS } from '@/lib/recommendations';
import { businessPath } from '@/lib/business-routes';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Wrench,
  Truck,
  Briefcase,
  Building2,
  BarChart3,
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Factory,
  FileText,
  GraduationCap,
  Store,
  HelpCircle,
  Sparkles,
  CheckCircle2,
};

export default function BusinessTypePicker() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand font-mono text-sm font-semibold text-white shadow-xs">
          1
        </span>
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">Select Your Business Type</h2>
      </div>
      <p className="mb-5 max-w-3xl text-sm font-medium text-muted">
        Each business type opens its own page. From there you can pick the operational bottlenecks or areas to improve.
      </p>
      <div data-reveal-stagger className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {INDUSTRY_RECOMMENDATIONS.map((industry) => {
          const Icon = iconMap[industry.iconName] || Briefcase;
          return (
            <Link
              key={industry.id}
              href={businessPath(industry.industrySlug)}
              className="flex cursor-pointer flex-col justify-between rounded-2xl border border-line bg-white p-4 text-left shadow-xs transition-all hover:border-brand/50 hover:shadow-md sm:p-5"
            >
              <div>
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold leading-snug text-ink sm:text-base">{industry.industryName}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{industry.industryDescription}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2 text-xs font-bold">
                <span className="text-slate-400">Open this business</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
