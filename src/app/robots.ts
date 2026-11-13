import { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/site-url';
import { STATIC_EXPORT_PLACEHOLDER } from '@/lib/static-params';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/ai-tools',
          '/apply/thanks',
          '/match/thanks',
          `/experts/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/city/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/state/${STATIC_EXPORT_PLACEHOLDER}`,
          `/locations/zip/${STATIC_EXPORT_PLACEHOLDER}`,
          `/business/${STATIC_EXPORT_PLACEHOLDER}`,
          `/recommendations/${STATIC_EXPORT_PLACEHOLDER}`,
          `/tools/${STATIC_EXPORT_PLACEHOLDER}`,
        ],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
