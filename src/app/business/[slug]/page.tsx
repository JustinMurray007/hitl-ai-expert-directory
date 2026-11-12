import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { getExperts } from '@/lib/store';
import BusinessRecommender from '@/components/BusinessRecommender';
import { businessTypeBySlug, listBusinessTypes } from '@/lib/business-routes';
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
    listBusinessTypes().map((industry) => ({ slug: industry.industrySlug })),
    { slug: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) return staticPlaceholderMetadata('Business type');
  const industry = businessTypeBySlug(slug);
  if (!industry) return { title: 'Business type not found | Find Ai Pros' };
  const title = `${industry.industryName} AI Experts | Find Ai Pros`;
  const description = `Find AI experts for ${industry.industryName}. ${industry.industryDescription} Match workflows to specialists who can estimate the work.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function BusinessTypePage({ params }: BusinessPageProps) {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) notFound();
  const industry = businessTypeBySlug(slug);
  if (!industry || industry.industrySlug !== slug) notFound();
  const experts = await getExperts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <Link href="/recommendations" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover mb-6">
        <ArrowLeft className="w-4 h-4" />
        All business types
      </Link>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-line bg-brand-soft px-4 py-2 text-center text-sm font-medium text-brand">
          <Sparkles className="w-5 h-5 text-brand" />
          <span>{industry.industryName}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          AI Experts for {industry.industryName}
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          {industry.industryDescription} Pick the need that matches your business, then choose one or more specialists to request estimates.
        </p>
      </div>
      <BusinessRecommender key={industry.industrySlug} allExperts={experts} initialIndustrySlug={industry.industrySlug} />
    </div>
  );
}
