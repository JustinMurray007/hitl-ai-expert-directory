/**
 * Shared check for the admin review token.
 * The static export cannot run this on the page itself. Cloudflare Pages
 * middleware calls `decideAdminAccess` before `/admin` is served, and
 * `verifyAdminToken` uses the same comparison for review actions.
 * Access fails closed when ADMIN_REVIEW_TOKEN is unset.
 */

export const ADMIN_SESSION_COOKIE = 'hitl_admin';
const SESSION_MESSAGE = 'findaipros-admin-session-v1';

export function configuredAdminToken(value: string | undefined | null): string {
  return value?.trim() ?? '';
}

/** Constant-time string compare. Empty values never match. */
export function tokensMatch(provided: string, expected: string): boolean {
  const left = new TextEncoder().encode(provided.trim());
  const right = new TextEncoder().encode(expected.trim());
  if (left.length === 0 || right.length === 0) return false;
  const length = Math.max(left.length, right.length);
  let mismatch = left.length === right.length ? 0 : 1;
  for (let i = 0; i < length; i += 1) {
    mismatch |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return mismatch === 0;
}

export async function adminSessionValue(token: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(token),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(SESSION_MESSAGE));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function readCookie(header: string | null, name: string): string {
  if (!header) return '';
  for (const part of header.split(';')) {
    const [rawName, ...rest] = part.trim().split('=');
    if (rawName === name) return decodeURIComponent(rest.join('='));
  }
  return '';
}

export function bearerToken(header: string | null): string {
  if (!header) return '';
  const match = /^Bearer\s+(\S+)\s*$/i.exec(header);
  return match?.[1] ?? '';
}

export function adminSessionCookie(session: string): string {
  return `${ADMIN_SESSION_COOKIE}=${session}; HttpOnly; Secure; SameSite=Strict; Path=/admin; Max-Age=28800`;
}

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/');
}

export type AdminAccess =
  | { action: 'ignore' }
  | { action: 'unconfigured' }
  | { action: 'allow'; setCookie?: string }
  | { action: 'deny' }
  | { action: 'redirect'; cookie: string };

export async function decideAdminAccess(request: Request, envToken: string | undefined | null): Promise<AdminAccess> {
  const { pathname } = new URL(request.url);
  if (!isAdminPath(pathname)) return { action: 'ignore' };

  const expected = configuredAdminToken(envToken);
  if (!expected) return { action: 'unconfigured' };

  const session = await adminSessionValue(expected);
  const cookie = readCookie(request.headers.get('cookie'), ADMIN_SESSION_COOKIE);
  const bearer = bearerToken(request.headers.get('authorization'));
  const cookieOk = cookie ? tokensMatch(cookie, session) : false;
  const bearerOk = bearer ? tokensMatch(bearer, expected) : false;

  if (cookieOk || bearerOk) {
    return bearerOk && !cookieOk ? { action: 'allow', setCookie: adminSessionCookie(session) } : { action: 'allow' };
  }

  if (request.method === 'POST') {
    const type = request.headers.get('content-type') || '';
    let provided = '';
    if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
      const form = await request.formData();
      provided = String(form.get('token') ?? '');
    }
    if (tokensMatch(provided, expected)) {
      return { action: 'redirect', cookie: adminSessionCookie(session) };
    }
  }

  return { action: 'deny' };
}
