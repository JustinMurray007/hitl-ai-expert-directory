import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbList, graph, itemList } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH } from '@/lib/business-routes';
import { getCategories } from '@/lib/store';
import {
  Workflow,
  PhoneCall,
  LifeBuoy,
  Megaphone,
  UserCheck,
  Cpu,
  Target,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const metadata = withCanonical('/categories', {
  title: 'AI Experts by Business Need | Find AI Pros',
  description:
    'Browse vetted AI specialists by the job you need done, from voice receptionists to workflow automation. Each hub shows who is listed.',
});

const categoryIcons: Record<string, any> = {
  Workflow: Workflow,
  PhoneCall: PhoneCall,
  LifeBuoy: LifeBuoy,
  Megaphone: Megaphone,
  UserCheck: UserCheck,
  Cpu: Cpu,
  Target: Target,
};

const categoryThemes: Record<string, { bg: string; border: string; text: string; badgeBg: string }> = {
  'operations-workflow-automation': {
    bg: 'bg-brand-soft',
    border: 'border-brand-line',
    text: 'text-brand',
    badgeBg: 'bg-brand-tint',
  },
  'sales-lead-qualification': {
    bg: 'bg-hub-indigo-soft',
    border: 'border-hub-indigo-line',
    text: 'text-hub-indigo',
    badgeBg: 'bg-hub-indigo-tint',
  },
  'customer-support-knowledge-base': {
    bg: 'bg-hub-teal-soft',
    border: 'border-hub-teal-line',
    text: 'text-hub-teal',
    badgeBg: 'bg-hub-teal-tint',
  },
  'marketing-programmatic-content': {
    bg: 'bg-hub-violet-soft',
    border: 'border-hub-violet-line',
    text: 'text-hub-violet',
    badgeBg: 'bg-hub-violet-tint',
  },
  'executive-personal-ai-ops': {
    bg: 'bg-accent-soft',
    border: 'border-accent-line',
    text: 'text-accent',
    badgeBg: 'bg-accent-tint',
  },
  'ai-advertising-paid-media': {
    bg: 'bg-danger-soft',
    border: 'border-danger-line',
    text: 'text-danger-bright',
    badgeBg: 'bg-danger-tint',
  },
  'custom-ai-models-integration': {
    bg: 'bg-canvas',
    border: 'border-line-strong',
    text: 'text-hub-sky',
    badgeBg: 'bg-line',
  },
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-canvas pb-24">
      <JsonLd
        data={graph(
          { '@type': 'CollectionPage', name: 'AI solutions by business need', url: 'https://findaipros.com/categories' },
          itemList(
            'Category hubs',
            categories.map((category) => ({ name: category.name, path: `/categories/${category.slug}` })),
          ),
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
          ]),
        )}
      />
      {/* Header */}
      <section className="mesh-gradient-hero border-b border-line pt-16 pb-14 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-bold text-brand shadow-rest">
            <ShieldCheck className="w-4 h-4 text-brand" />
            <span>Business AI Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight max-w-3xl mx-auto leading-tight">
            Browse AI Specialists by the Job You Need Done
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-strong max-w-2xl mx-auto leading-relaxed font-normal">
            Every category hub groups specialists and the human safety checks they commit to.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <span className="text-muted flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" /> 6 Solution Hubs
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-muted flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" /> References we contact
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-muted flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" /> Built-In Human Safety Checks
            </span>
          </div>
        </div>
      </section>

      {/* Symmetrical 3x2 Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div data-reveal-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon_name] || Workflow;
            const theme = categoryThemes[category.slug] || {
              bg: 'bg-brand-soft',
              border: 'border-brand-line',
              text: 'text-brand',
              badgeBg: 'bg-brand-tint',
            };

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-rest hover:border-brand/40 sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${theme.text}`} />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${theme.badgeBg} ${theme.text}`}
                    >
                      {category.expert_count ?? 0} Listed Expert{category.expert_count === 1 ? '' : 's'}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-ink group-hover:text-brand transition-colors">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-base text-muted-strong leading-relaxed font-normal">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-line-soft flex items-center justify-between text-sm font-bold text-brand">
                  <span>Explore Specialists & Blueprints</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl p-8 sm:p-10 border border-brand-line bg-gradient-to-r from-brand-soft via-white to-brand-soft shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-line text-xs font-bold text-brand mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              Need an Automated Recommendation?
            </div>
            <h3 className="text-2xl font-semibold text-ink">
              Not sure which solution fits your business best?
            </h3>
            <p className="mt-2 text-base text-muted-strong font-normal">
              Take our interactive 2-minute business assessment to get an instant AI recommendation with built-in human safety checks.
            </p>
          </div>
          <Link
            href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
            className="shrink-0 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-base shadow-sm transition-all"
          >
            AI Solutions by Industry →
          </Link>
        </div>
      </section>
    </div>
  );
}
