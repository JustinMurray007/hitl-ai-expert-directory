import { Suspense } from 'react';
import ThanksClient, { ThanksStatus } from './ThanksClient';

export const metadata = {
  title: 'Application received | Find Ai Pros',
  description: 'Your free listing application is in. Choose a paid plan only if you want one.',
  robots: { index: false, follow: false },
};

export default function ApplyThanksPage() {
  return (
    <Suspense fallback={<ThanksStatus phase="waiting" />}>
      <ThanksClient />
    </Suspense>
  );
}
