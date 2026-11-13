import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES, GUIDE_DATE } from '@/lib/guides';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/blog', {
  title: 'AI Consulting Guides | Find AI Pros',
  description: 'Guides on AI consultant cost, hiring for a small business, voice receptionists, and freelance marketplaces.',
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Guides</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        Practical guides for hiring AI help. Prices in these articles are cited from other sites and dated.
      </p>
      <ul className="mt-8 space-y-4">
        {GUIDES.map((guide) => (
          <li key={guide.slug} className="rounded-2xl border border-line bg-white p-5">
            <p className="text-sm text-muted">{GUIDE_DATE}</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              <Link href={`/blog/${guide.slug}`} className="hover:text-brand">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 text-base leading-relaxed text-muted-strong">{guide.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
