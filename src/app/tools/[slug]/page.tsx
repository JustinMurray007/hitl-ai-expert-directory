import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { AI_SOLUTIONS_BY_INDUSTRY_PATH, businessPath } from '@/lib/business-routes';
import {
  groupToolFits,
  resolveToolSlug,
  toolAliasSlugs,
  toolBySlug,
  toolPath,
  toolStaticSlugs,
} from '@/lib/tool-catalog';
import PathRedirect from '@/components/PathRedirect';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
  staticPlaceholderMetadata,
} from '@/lib/static-params';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ensureStaticParams(
    toolStaticSlugs().map((slug) => ({ slug })),
    { slug: STATIC_EXPORT_PLACEHOLDER },
  );
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) return staticPlaceholderMetadata('AI tool');
  const canonical = resolveToolSlug(slug);
  const tool = canonical ? toolBySlug(canonical) : null;
  if (!canonical || !tool) return { title: 'Tool not found | Find Ai Pros' };
  const path = toolPath(canonical);
  const title = `${tool.name} | AI Tools | Find Ai Pros`;
  const description = tool.description;
  const alias = toolAliasSlugs().some((item) => item.slug === slug);
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: alias ? { index: false, follow: true } : undefined,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  if (isStaticExportPlaceholder(slug)) notFound();
  const canonical = resolveToolSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) {
    return <PathRedirect href={toolPath(canonical)} title="This tool page moved" />;
  }
  const tool = toolBySlug(canonical);
  if (!tool) notFound();
  const groups = groupToolFits(tool.fits);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href="/tools" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover">
        <ArrowLeft className="h-4 w-4" />
        All tools
      </Link>

      <article className="rounded-3xl border border-line bg-white p-6 shadow-rest sm:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {tool.company && (
            <span className="text-xs font-medium uppercase tracking-wide text-muted">{tool.company}</span>
          )}
          <span className="rounded-full border border-brand-line bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
            {tool.category}
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{tool.name}</h1>
        <p className="mt-4 text-base font-normal leading-relaxed text-muted-strong sm:text-lg">{tool.description}</p>
        {tool.bestFor && (
          <p className="mt-4 text-base text-ink">
            <span className="font-medium">Best for: </span>
            {tool.bestFor}
          </p>
        )}
        {tool.pricing && <p className="mt-2 text-sm text-muted-strong">{tool.pricing}</p>}
        <a
          href={tool.websiteUrl}
          target="_blank"
          rel={tool.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-hover"
        >
          Official website
          <ExternalLink className="h-4 w-4" />
        </a>
      </article>

      <section className="mt-8 rounded-3xl border border-line bg-canvas-muted p-6 shadow-rest sm:p-8">
        <h2 className="text-2xl font-semibold text-ink">Business types and areas this helps</h2>
        {groups.length === 0 ? (
          <p className="mt-3 text-base leading-relaxed text-muted-strong">
            This tool is listed in the directory. It is not attached to a business bottleneck yet.
          </p>
        ) : (
          <ul className="mt-5 space-y-5">
            {groups.map((group) => (
              <li key={group.businessSlug ?? 'all'} className="rounded-2xl border border-line bg-white p-5 shadow-xs">
                {group.businessSlug ? (
                  <Link href={businessPath(group.businessSlug)} className="text-base font-semibold text-brand hover:text-brand-hover">
                    {group.businessName}
                  </Link>
                ) : (
                  <Link href={AI_SOLUTIONS_BY_INDUSTRY_PATH} className="text-base font-semibold text-brand hover:text-brand-hover">
                    {group.businessName}
                  </Link>
                )}
                <ul className="mt-2 space-y-1.5">
                  {group.areas.map((area) => (
                    <li key={area.id} className="text-sm leading-relaxed text-ink-soft">
                      {area.label}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-sm text-muted-strong">
          <Link href="/tools" className="font-medium text-brand hover:text-brand-hover">
            Back to all tools
          </Link>
        </p>
      </section>
    </div>
  );
}
