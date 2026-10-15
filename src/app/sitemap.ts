import { MetadataRoute } from 'next';
import { getCategories, getExperts } from '@/lib/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const [categories, experts] = await Promise.all([
    getCategories(),
    getExperts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/experts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/recommendations`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/match`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Category hubs
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Profiles (strictly excluding demo rows from SEO)
  const profileRoutes: MetadataRoute.Sitemap = experts
    .filter((e) => !e.is_demo)
    .map((e) => ({
      url: `${baseUrl}/experts/${e.slug}`,
      lastModified: new Date(e.updated_at || e.created_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

  return [...staticRoutes, ...categoryRoutes, ...profileRoutes];
}
