import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { toolPath, toolsBeyondDirectory } from '@/lib/tool-catalog';

/** Stack tools that are not already a card in the main directory. Server-rendered so the tools page client bundle stays the same. */
export default function RecommendationToolLinks() {
  const tools = toolsBeyondDirectory();
  if (tools.length === 0) return null;

  return (
    <section className="mt-12 scroll-mt-28" aria-labelledby="recommendation-tools-heading">
      <div data-reveal className="mb-5 flex items-end justify-between gap-4">
        <h2 id="recommendation-tools-heading" className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Tools used in business recommendations
        </h2>
        <span className="text-sm text-muted-strong">{tools.length} tools</span>
      </div>
      <div data-reveal-stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article
            key={tool.slug}
            className="hover-lift flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-rest hover:border-brand sm:p-6"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{tool.company || tool.category}</span>
                <span className="rounded-full border border-brand-line bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold leading-tight text-ink">
                <Link href={toolPath(tool.slug)} className="hover:text-brand">
                  {tool.name}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-strong">{tool.description}</p>
              {tool.bestFor && (
                <p className="mt-3 text-sm text-ink">
                  <span className="font-medium">Best for: </span>
                  {tool.bestFor}
                </p>
              )}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
              <Link href={toolPath(tool.slug)} className="text-sm font-medium text-brand hover:text-brand-hover">
                View tool
              </Link>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-hover"
              >
                Visit
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
