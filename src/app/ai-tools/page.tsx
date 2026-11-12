'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LegacyAiToolsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/tools');
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-ink">The AI tools directory moved</h1>
      <p className="mt-3 text-muted-strong">
        It now lives at <a className="text-brand font-medium" href="/tools">/tools</a>.
      </p>
    </div>
  );
}
