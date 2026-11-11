/**
 * Ask Cloudflare Pages to rebuild the static export after a listing's public
 * state changes.
 *
 * Pages Functions do not share memory across isolates, and this project has no
 * KV binding. A burst (checkout, subscription update, and invoice.paid within
 * a few seconds) is collapsed in two layers:
 *
 * 1. An in-isolate timestamp, set synchronously before the first await, so
 *    parallel calls in the same isolate share one POST.
 * 2. The Workers Cache API (`caches.default`), which Pages Functions in the
 *    same colo can read. The claim lives for {@link DEPLOY_HOOK_DEBOUNCE_MS}.
 *
 * Two isolates can both miss the cache and POST once each. That is a couple of
 * builds, not one per Stripe event. A failed POST drops the claim so the next
 * change can retry. The call never throws: a hook failure must not fail the
 * webhook, the limiter, or an admin review.
 */
export const DEPLOY_HOOK_DEBOUNCE_MS = 90_000;

const DEBOUNCE_CACHE_URL = 'https://findaipros.com/__cf_deploy_hook_debounce';

export type DeployHookEnv = {
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
};

type WorkersCache = {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
  delete(request: Request): Promise<boolean>;
};

let claimedUntil = 0;

export function resetDeployHookForTests(): void {
  claimedUntil = 0;
}

function resolveHookUrl(env?: DeployHookEnv): string {
  const fromBinding = env?.CLOUDFLARE_DEPLOY_HOOK_URL?.trim();
  if (fromBinding) return fromBinding;
  if (typeof process === 'undefined') return '';
  return process.env.CLOUDFLARE_DEPLOY_HOOK_URL?.trim() || '';
}

function workersCache(): WorkersCache | null {
  const storage = (globalThis as { caches?: { default?: WorkersCache } }).caches;
  const cache = storage?.default;
  if (!cache || typeof cache.match !== 'function' || typeof cache.put !== 'function') return null;
  return cache;
}

async function releaseCacheClaim(cache: WorkersCache | null, request: Request): Promise<void> {
  if (!cache || typeof cache.delete !== 'function') return;
  try {
    await cache.delete(request);
  } catch (error) {
    console.log('[deploy-hook] could not release debounce claim', error);
  }
}

export async function requestProductionRebuild(reason: string, env?: DeployHookEnv): Promise<void> {
  const cacheRequest = new Request(DEBOUNCE_CACHE_URL);
  let cache: WorkersCache | null = null;
  try {
    const url = resolveHookUrl(env);
    if (!url) {
      console.log(`[deploy-hook] skipped (${reason}): CLOUDFLARE_DEPLOY_HOOK_URL is unset`);
      return;
    }

    const now = Date.now();
    if (now < claimedUntil) {
      console.log(`[deploy-hook] debounced (${reason})`);
      return;
    }
    // Claim before the first await so a burst in this isolate shares one POST.
    claimedUntil = now + DEPLOY_HOOK_DEBOUNCE_MS;

    cache = workersCache();
    if (cache) {
      try {
        const hit = await cache.match(cacheRequest);
        if (hit) {
          console.log(`[deploy-hook] debounced (${reason})`);
          return;
        }
        await cache.put(
          cacheRequest,
          new Response('1', {
            headers: {
              'Cache-Control': `public, max-age=${Math.ceil(DEPLOY_HOOK_DEBOUNCE_MS / 1000)}`,
            },
          }),
        );
      } catch (error) {
        console.log('[deploy-hook] debounce cache unavailable', error);
      }
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        signal: AbortSignal.timeout(8_000),
      });
      console.log(`[deploy-hook] posted (${reason}) status=${response.status}`);
      if (!response.ok) {
        claimedUntil = 0;
        await releaseCacheClaim(cache, cacheRequest);
      }
    } catch (error) {
      claimedUntil = 0;
      await releaseCacheClaim(cache, cacheRequest);
      console.log(`[deploy-hook] failed (${reason})`, error);
    }
  } catch (error) {
    claimedUntil = 0;
    await releaseCacheClaim(cache, cacheRequest);
    console.log(`[deploy-hook] unexpected failure (${reason})`, error);
  }
}
