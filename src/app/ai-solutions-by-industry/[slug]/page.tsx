import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getExperts } from '@/lib/store';
import BusinessRecommender from '@/components/BusinessRecommender';
import PathRedirect from '@/components/PathRedirect';
import {
  AI_SOLUTIONS_BY_INDUSTRY_PATH,
  businessOverviewPath,
  businessPath,
  businessStaticSlugs,
  businessTypeBySlug,
  canonicalBusinessSlug,
} from '@/lib/business-routes';
import { absoluteUrl } from '@/lib/site-url';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';

interface AiSolutionsBusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ensureStaticParams(
    businessStaticSlugs().map((slug) => ({ slug })),
    { slug: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: AiSolutionsBusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) return staticPlaceholderMetadata('AI solutions by industry');
  const canonical = canonicalBusinessSlug(slug);
  const industry = canonical ? businessTypeBySlug(canonical) : null;
  if (!canonical || !industry) return { title: 'Business type not found | Find Ai Pros' };
  const path = businessPath(canonical);
  const title = `${industry.industryName} AI Solutions | Find Ai Pros`;
  const description = `AI solutions for ${industry.industryName}. ${industry.industryDescription} Choose the operational areas to improve and see the recommended tools for each one.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: slug === canonical ? undefined : { index: false, follow: true },
    openGraph: { title, description, type: 'website', url: absoluteUrl(path) },
  };
}

export default async function AiSolutionsBusinessPage({ params }: AiSolutionsBusinessPageProps) {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) notFound();
  const canonical = canonicalBusinessSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) {
    return <PathRedirect href={businessPath(canonical)} title="This business page moved" />;
  }
  const industry = businessTypeBySlug(canonical);
  if (!industry) notFound();
  const experts = await getExperts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href={AI_SOLUTIONS_BY_INDUSTRY_PATH} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover">
          <ArrowLeft className="h-4 w-4" />
          AI Solutions by Industry
        </Link>
        <Link href={businessOverviewPath(canonical)} className="text-sm font-medium text-brand hover:text-brand-hover">
          Business type overview
        </Link>
      </div>
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-medium text-brand">
          <Sparkles className="h-5 w-5 text-brand" />
          <span>{industry.industryName}</span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          AI Solutions for {industry.industryName}
        </h1>
        <p className="mt-4 text-base font-normal leading-relaxed text-muted-strong sm:text-lg">
          {industry.industryDescription} Choose one or more operational bottlenecks or areas to improve. Each area stacks its own AI solution and tools below.
        </p>
      </div>
      <BusinessRecommender key={industry.industrySlug} allExperts={experts} industry={industry} />
    </div>
  );
}
