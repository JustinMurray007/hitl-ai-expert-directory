import { MetadataRoute } from 'next';
import { getCategories, getExperts } from '@/lib/store';
import { getLocationsSummary } from '@/lib/locations';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://findaipros.com';

  const [categories, experts] = await Promise.all([
    getCategories(),
    getExperts(),
  ]);

  const { states, cities, zips } = getLocationsSummary(experts);

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
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
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

  // Location Hubs: States
  const stateRoutes: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${baseUrl}/locations/state/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Location Hubs: Cities
  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${baseUrl}/locations/city/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Location Hubs: Zip codes
  const zipRoutes: MetadataRoute.Sitemap = zips.map((z) => ({
    url: `${baseUrl}/locations/zip/${z.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
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

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...stateRoutes,
    ...cityRoutes,
    ...zipRoutes,
    ...profileRoutes,
  ];
}
