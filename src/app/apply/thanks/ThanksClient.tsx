'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { personalPayPath } from '@/lib/billing/pay-link';
import { tallyIdFromSearch, thanksLookupResult } from '@/lib/tally/lookup';

const WAIT_MS = 12_000;
const POLL_MS = 1_500;

type Phase = 'waiting' | 'ready' | 'unresolved';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function ThanksStatus({ phase, expertId }: { phase: Phase; expertId?: string }) {
  const payHref = phase === 'ready' && expertId ? personalPayPath(expertId) : null;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="rounded-3xl border border-[#e4ebe4] bg-white p-8 shadow-xs">
        <h1 className="text-3xl font-black text-[#001e00]">Application received</h1>
        {phase === 'waiting' && (
          <p className="mt-3 text-[#5e6d55] leading-relaxed" aria-live="polite">
            Thanks for applying. We&apos;re saving your free listing. This usually takes a few seconds.
          </p>
        )}
        {phase === 'ready' && payHref && (
          <>
            <p className="mt-3 text-[#5e6d55] leading-relaxed">
              Thanks for applying. Your listing is free for 30 days. Nothing is charged until you choose a plan.
            </p>
            <a
              href={payHref}
              className="mt-6 inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold"
            >
              Choose a paid plan
            </a>
          </>
        )}
        {phase === 'unresolved' && (
          <p className="mt-3 text-[#5e6d55] leading-relaxed" aria-live="polite">
            Thanks for applying. Your free listing is being reviewed. A personal pay link will come by email if you want a paid plan. Nothing is charged until you use that link.
          </p>
        )}
      </div>
    </div>
  );
}

export default function ThanksClient() {
  const submissionId = tallyIdFromSearch(useSearchParams());
  const [phase, setPhase] = useState<Phase>(submissionId ? 'waiting' : 'unresolved');
  const [expertId, setExpertId] = useState<string | null>(null);

  useEffect(() => {
    if (!submissionId) return;
    const id: string = submissionId;
    let cancelled = false;
    const started = Date.now();

    async function poll() {
      while (!cancelled && Date.now() - started <= WAIT_MS) {
        try {
          const response = await fetch(`/api/tally/application?submissionId=${encodeURIComponent(id)}`, {
            headers: { accept: 'application/json' },
          });
          const result = thanksLookupResult(await response.json());
          if (cancelled) return;
          if (result.status === 'ready') {
            setExpertId(result.expertId);
            setPhase('ready');
            return;
          }
          if (result.status === 'unresolved') {
            setPhase('unresolved');
            return;
          }
        } catch {
          // The webhook can land a few seconds after Tally redirects.
        }
        if (cancelled || Date.now() - started >= WAIT_MS) break;
        await delay(POLL_MS);
      }
      if (!cancelled) setPhase('unresolved');
    }

    void poll();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  return <ThanksStatus phase={phase} expertId={expertId ?? undefined} />;
}
