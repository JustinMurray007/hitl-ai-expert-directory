import { decideAdminAccess } from '../src/lib/admin-gate';

type AdminEnv = { ADMIN_REVIEW_TOKEN?: string };

type MiddlewareContext = {
  request: Request;
  env: AdminEnv;
  next: () => Promise<Response>;
};

const PRIVATE = {
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
};

const LOGIN_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Admin sign-in</title>
</head>
<body>
<main>
<h1>Admin review</h1>
<p>This page is private. Enter the review token to continue.</p>
<form method="post" action="/admin">
<label for="token">Review token</label>
<input id="token" name="token" type="password" autocomplete="current-password" required>
<button type="submit">Continue</button>
</form>
</main>
</body>
</html>`;

function text(status: number, body: string, contentType: string): Response {
  return new Response(body, { status, headers: { 'content-type': contentType, ...PRIVATE } });
}

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const decision = await decideAdminAccess(context.request, context.env.ADMIN_REVIEW_TOKEN);
  if (decision.action === 'ignore') return context.next();
  if (decision.action === 'unconfigured') {
    return text(503, 'Admin review is not configured.', 'text/plain; charset=utf-8');
  }
  if (decision.action === 'deny') {
    return text(401, LOGIN_HTML, 'text/html; charset=utf-8');
  }
  if (decision.action === 'redirect') {
    return new Response(null, {
      status: 303,
      headers: { location: '/admin', 'set-cookie': decision.cookie, ...PRIVATE },
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('cache-control', 'no-store');
  headers.set('x-robots-tag', 'noindex, nofollow');
  if (decision.setCookie) headers.append('set-cookie', decision.setCookie);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
