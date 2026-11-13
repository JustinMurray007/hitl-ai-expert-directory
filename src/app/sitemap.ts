import { MetadataRoute } from 'next';
import { listPublicPages, toSitemapUrls } from '@/lib/public-sitemap';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await listPublicPages();
  return toSitemapUrls(pages).map((entry) => ({
    url: entry.loc,
    lastModified: entry.lastmod,
    changeFrequency: entry.changefreq,
    priority: entry.priority,
  }));
}
