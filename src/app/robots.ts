import { MetadataRoute } from 'next';
import { STATIC_EXPORT_PLACEHOLDER } from '@/lib/static-params';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          `/experts/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/city/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/state/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/zip/${STATIC_EXPORT_PLACEHOLDER}`,
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
