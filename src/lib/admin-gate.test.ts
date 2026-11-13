import assert from 'node:assert/strict';
import test from 'node:test';
import { adminSessionValue, decideAdminAccess, tokensMatch } from './admin-gate';

const TOKEN = 'test-admin-token';

test('token compare fails closed on empty values', () => {
  assert.equal(tokensMatch('', TOKEN), false);
  assert.equal(tokensMatch(TOKEN, ''), false);
  assert.equal(tokensMatch('other-value', TOKEN), false);
  assert.equal(tokensMatch(TOKEN, TOKEN), true);
  assert.equal(tokensMatch(`  ${TOKEN}  `, TOKEN), true);
});

test('admin routes stay closed when the token is unset', async () => {
  const denied = await decideAdminAccess(new Request('https://findaipros.com/admin'), '');
  assert.equal(denied.action, 'unconfigured');
  const ignored = await decideAdminAccess(new Request('https://findaipros.com/experts'), '');
  assert.equal(ignored.action, 'ignore');
});

test('a matching token sets a session and later requests are allowed', async () => {
  const body = new URLSearchParams({ token: TOKEN });
  const posted = await decideAdminAccess(
    new Request('https://findaipros.com/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    }),
    TOKEN,
  );
  assert.equal(posted.action, 'redirect');
  if (posted.action !== 'redirect') return;

  const session = await adminSessionValue(TOKEN);
  assert.match(posted.cookie, new RegExp(`hitl_admin=${session}`));
  assert.doesNotMatch(posted.cookie, /test-admin-token/);

  const allowed = await decideAdminAccess(
    new Request('https://findaipros.com/admin', { headers: { cookie: `hitl_admin=${session}` } }),
    TOKEN,
  );
  assert.equal(allowed.action, 'allow');

  const wrong = await decideAdminAccess(
    new Request('https://findaipros.com/admin', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token: 'nope' }),
    }),
    TOKEN,
  );
  assert.equal(wrong.action, 'deny');
});

test('bearer token allows /admin without echoing the token into the cookie', async () => {
  const allowed = await decideAdminAccess(
    new Request('https://findaipros.com/admin/', { headers: { authorization: `Bearer ${TOKEN}` } }),
    TOKEN,
  );
  assert.equal(allowed.action, 'allow');
  if (allowed.action !== 'allow') return;
  assert.match(allowed.setCookie || '', /HttpOnly/);
  assert.doesNotMatch(allowed.setCookie || '', /test-admin-token/);
});
