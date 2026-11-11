import type { Metadata } from 'next';

/**
 * Reserved dynamic segment so `output: 'export'` can emit a route when a
 * directory is empty. It is not a listing. Pages call `notFound()` for it,
 * and the sitemap and robots file keep it out of search.
 */
export const STATIC_EXPORT_PLACEHOLDER = 'build-placeholder';

export function ensureStaticParams<T extends Record<string, string>>(params: T[], empty: T): T[] {
  return params.length > 0 ? params : [empty];
}

export function isStaticExportPlaceholder(value: string | undefined | null): boolean {
  return value === STATIC_EXPORT_PLACEHOLDER;
}

export function staticPlaceholderMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
