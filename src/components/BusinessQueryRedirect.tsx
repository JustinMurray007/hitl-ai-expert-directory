'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { businessPath, canonicalBusinessSlug } from '@/lib/business-routes';

/** Static export cannot match query strings in `_redirects`. Send old `?industry=` and `?business=` links to `/recommendations/<slug>`. */
export default function BusinessQueryRedirect() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get('industry') || params.get('business');

  useEffect(() => {
    const slug = canonicalBusinessSlug(raw);
    if (slug) router.replace(businessPath(slug));
  }, [raw, router]);

  return null;
}
