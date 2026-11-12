'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RevealRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const arm = (window as Window & { __armReveal?: () => void }).__armReveal;
    arm?.();
  }, [pathname]);

  return null;
}
