import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import { GUIDES, GUIDE_DATE, guideBySlug } from '@/lib/guides';
import { graph } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { absoluteUrl, SITE_ORIGIN } from '@/lib/site-url';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return { title: 'Guide not found' };
  return withCanonical(`/blog/${guide.slug}`, {
    title: `${guide.title} | Find AI Pros`,
    description: guide.description,
    openGraph: { type: 'article', title: guide.title, description: guide.description },
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const url = absoluteUrl(`/blog/${guide.slug}`);
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <JsonLd
        data={graph({
          '@type': 'Article',
          headline: guide.title,
          description: guide.description,
          datePublished: GUIDE_DATE,
          dateModified: GUIDE_DATE,
          url,
          author: { '@type': 'Organization', name: 'Find AI Pros', url: SITE_ORIGIN },
          publisher: { '@type': 'Organization', name: 'Find AI Pros', url: SITE_ORIGIN, logo: absoluteUrl('/logo-full.png') },
          mainEntityOfPage: url,
        })}
      />
      <p className="text-sm font-medium text-brand">
        <Link href="/blog" className="hover:underline">
          Guides
        </Link>
        <span className="text-muted"> · {GUIDE_DATE}</span>
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{guide.title}</h1>
      {guide.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 80)} className="mt-4 text-base leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <FaqList entries={guide.faqs} />
    </article>
  );
}
