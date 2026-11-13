import type { Metadata } from 'next';
import { absoluteUrl } from './site-url';

/** Self-referencing canonical on the public origin, plus a matching Open Graph URL. */
export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  const url = absoluteUrl(path);
  const { url: _ignored, ...openGraph } = metadata.openGraph ?? {};
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: url },
    openGraph: {
      type: 'website',
      ...openGraph,
      url,
    },
  };
}
