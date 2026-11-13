import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import PathRedirect from '@/components/PathRedirect';
import {
  AI_SOLUTIONS_BY_INDUSTRY_PATH,
  businessOverviewPath,
  businessPath,
  businessStaticSlugs,
  businessTypeBySlug,
  canonicalBusinessSlug,
} from '@/lib/business-routes';
import { bottlenecksForBusiness } from '@/lib/recommendation-selection';
import { absoluteUrl } from '@/lib/site-url';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ensureStaticParams(
    businessStaticSlugs().map((slug) => ({ slug })),
    { slug: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) return staticPlaceholderMetadata('Business type');
  const canonical = canonicalBusinessSlug(slug);
  const industry = canonical ? businessTypeBySlug(canonical) : null;
  if (!canonical || !industry) {
    return { title: 'Business type not found | Find Ai Pros', robots: { index: false, follow: false } };
  }
  const path = businessOverviewPath(canonical);
  const title = `${industry.industryName} | Find Ai Pros`;
  const description = `AI for ${industry.industryName}. ${industry.industryDescription} See the operational areas, then open the AI solutions for this business.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: slug === canonical ? undefined : { index: false, follow: true },
    openGraph: { title, description, type: 'website', url: absoluteUrl(path) },
  };
}

export default async function BusinessTypePage({ params }: BusinessPageProps) {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) notFound();
  const canonical = canonicalBusinessSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) {
    return <PathRedirect href={businessOverviewPath(canonical)} title="This business page moved" />;
  }
  const industry = businessTypeBySlug(canonical);
  if (!industry) notFound();
  const areas = bottlenecksForBusiness(industry);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Link
        href={AI_SOLUTIONS_BY_INDUSTRY_PATH}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        All business types
      </Link>
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-sm font-medium text-brand">
          <Sparkles className="h-5 w-5 text-brand" />
          <span>Business type</span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">{industry.industryName}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">{industry.industryDescription}</p>
        <Link
          href={businessPath(canonical)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-hover sm:w-auto"
        >
          See AI solutions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="mt-12" aria-labelledby="business-areas">
        <h2 id="business-areas" className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Operational bottlenecks and areas to improve
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-strong">
          These are the areas this business type can work on. Open AI Solutions by Industry to select more than one and see the tools for each.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {areas.map((area) => (
            <li key={area.id} className="rounded-2xl border border-line bg-white p-5 shadow-rest sm:p-6">
              {area.badge && (
                <span className="mb-2 inline-flex rounded-full border border-brand-line bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                  {area.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-ink">{area.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-strong">{area.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
