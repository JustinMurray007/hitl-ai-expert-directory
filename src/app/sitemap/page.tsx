import type { Metadata } from 'next';
import Link from 'next/link';
import { listPublicPages, SITEMAP_GROUPS, type SitemapGroupId } from '@/lib/public-sitemap';
import { absoluteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  title: 'Sitemap | Find Ai Pros',
  description:
    'Every public page on Find Ai Pros: main pages, business types, AI solutions by industry, AI tools, categories, experts, and locations.',
  alternates: { canonical: absoluteUrl('/sitemap') },
};

export default async function HtmlSitemapPage() {
  const pages = await listPublicPages();
  const byGroup = new Map<SitemapGroupId, typeof pages>();
  for (const group of SITEMAP_GROUPS) byGroup.set(group.id, []);
  for (const entry of pages) byGroup.get(entry.group)?.push(entry);
  for (const group of SITEMAP_GROUPS) {
    const items = byGroup.get(group.id) ?? [];
    if (group.id !== 'main') items.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl">
        <p className="text-sm font-medium text-brand">Find Ai Pros</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Sitemap</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
          {pages.length} public pages, grouped so you can jump to a business type, an industry solution, a tool, or a specialist.
        </p>
      </div>

      <div className="space-y-12">
        {SITEMAP_GROUPS.map((group) => {
          const items = byGroup.get(group.id) ?? [];
          if (items.length === 0) return null;
          const headingId = `sitemap-${group.id}`;
          return (
            <section key={group.id} aria-labelledby={headingId}>
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {group.title}
                </h2>
                <span className="text-sm text-muted-strong">{items.length}</span>
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="flex min-h-11 items-center rounded-2xl border border-line bg-white px-4 py-3 text-base font-medium text-ink shadow-rest hover:border-brand hover:text-brand"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
