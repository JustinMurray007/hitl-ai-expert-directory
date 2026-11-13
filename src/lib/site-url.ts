/** Canonical origin for public URLs. Sitemap and robots always use this host. */
export const SITE_ORIGIN = 'https://findaipros.com';

/** Absolute URL with no trailing slash, except the origin itself has no path. */
export function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return SITE_ORIGIN;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized.replace(/\/+$/, '')}`;
}
