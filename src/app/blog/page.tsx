import type { Metadata } from 'next';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical('/blog', {
  title: 'AI Consulting Guides | Find AI Pros',
  description: 'Guides for hiring AI consultants and for experts who want clients. No posts are published yet.',
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">Guides</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-strong sm:text-lg">
        This is the listing page for Find AI Pros guides. No posts are published yet.
      </p>
      <p className="mt-6 rounded-2xl border border-line bg-white p-5 text-base text-ink">
        TODO: add posts here when they are written. Do not invent articles, prices, or case results on this page.
      </p>
    </div>
  );
}
