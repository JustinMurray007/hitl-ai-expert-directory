import assert from 'node:assert/strict';
import test from 'node:test';
import { listPublicPages, sitemapValidationErrors, SITEMAP_GROUPS, toSitemapUrls } from './public-sitemap';
import { SITE_ORIGIN } from './site-url';

test('public sitemap lists canonical pages once and skips redirects', async () => {
  const pages = await listPublicPages();
  const errors = sitemapValidationErrors(pages);
  assert.deepEqual(errors, []);

  const paths = new Set(pages.map((entry) => entry.path));
  for (const path of [
    '/',
    '/about',
    '/apply',
    '/apply/success',
    '/match',
    '/tools',
    '/recommendations',
    '/recommendations/healthcare-dental',
    '/recommendations/home-services-trades',
    '/recommendations/logistics-freight',
    '/business/healthcare-dental',
    '/business/home-services-trades',
    '/business/logistics-freight',
    '/tools/claude',
    '/tools/vapi',
    '/categories',
    '/categories/operations-workflow-automation',
    '/experts',
    '/locations',
    '/sitemap',
    '/construction-lp',
    '/outdoor-lp',
  ]) {
    assert.equal(paths.has(path), true, path);
  }

  for (const path of [
    '/admin',
    '/ai-tools',
    '/apply/thanks',
    '/match/thanks',
    '/how-it-works',
    '/business/freight_logistics',
    '/recommendations/medical_dental',
    '/tools/anthropic-claude',
    '/experts/build-placeholder',
    '/business/build-placeholder',
  ]) {
    assert.equal(paths.has(path), false, path);
  }

  const urls = toSitemapUrls(pages);
  assert.equal(urls.length, pages.length);
  assert.ok(urls.length < 50000);
  assert.equal(urls[0].loc, SITE_ORIGIN);
  assert.ok(urls.every((url) => url.loc.startsWith('https://findaipros.com')));
  assert.equal(new Set(urls.map((url) => url.loc)).size, urls.length);

  const groups = new Set(pages.map((entry) => entry.group));
  for (const group of SITEMAP_GROUPS) assert.equal(groups.has(group.id), true, group.id);
  assert.ok(pages.filter((entry) => entry.group === 'business').length >= 16);
  assert.equal(
    pages.filter((entry) => entry.group === 'business').length,
    pages.filter((entry) => entry.group === 'recommendations').length,
  );
  assert.ok(pages.some((entry) => entry.group === 'experts'));
  assert.ok(pages.some((entry) => entry.group === 'tools' && entry.path === '/tools/make'));
});
