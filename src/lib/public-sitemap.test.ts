import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { listPublicPages, resolveLastmod, sitemapValidationErrors, SITEMAP_GROUPS, toSitemapUrls } from './public-sitemap';
import { SITE_ORIGIN } from './site-url';
import { faqPage, organizationAndWebsite } from './schema';

test('public sitemap lists canonical pages once and skips redirects', async () => {
  const pages = await listPublicPages();
  const errors = sitemapValidationErrors(pages);
  assert.deepEqual(errors, []);

  const paths = new Set(pages.map((entry) => entry.path));
  for (const path of [
    '/',
    '/about',
    '/apply',
    '/match',
    '/tools',
    '/ai-solutions-by-industry',
    '/ai-solutions-by-industry/healthcare-dental',
    '/ai-solutions-by-industry/home-services-trades',
    '/ai-solutions-by-industry/logistics-freight',
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
    '/apply/success',
    '/apply/thanks',
    '/match/thanks',
    '/how-it-works',
    '/business/healthcare-dental',
    '/business/home-services-trades',
    '/business/logistics-freight',
    '/business/freight_logistics',
    '/recommendations',
    '/recommendations/healthcare-dental',
    '/recommendations/medical_dental',
    '/tools/anthropic-claude',
    '/experts/withn-tech',
    '/experts/withn-tech/',
    '/experts/build-placeholder',
    '/business/build-placeholder',
  ]) {
    assert.equal(paths.has(path), false, path);
  }

  assert.equal(paths.has('/experts/jake-read'), true);
  assert.equal(pages.some((entry) => entry.path.includes('withn')), false);

  const urls = toSitemapUrls(pages);
  assert.equal(urls.length, pages.length);
  assert.ok(urls.length < 50000);
  assert.equal(urls[0].loc, SITE_ORIGIN);
  assert.ok(urls.every((url) => url.loc.startsWith('https://findaipros.com')));
  assert.equal(new Set(urls.map((url) => url.loc)).size, urls.length);

  const groups = new Set(pages.map((entry) => entry.group));
  for (const group of SITEMAP_GROUPS) assert.equal(groups.has(group.id), true, group.id);
  assert.equal(pages.filter((entry) => entry.path.startsWith('/business/')).length, 0);
  assert.ok(pages.filter((entry) => entry.group === 'ai-solutions').length >= 16);
  assert.ok(pages.some((entry) => entry.group === 'experts'));
  assert.ok(pages.some((entry) => entry.group === 'tools' && entry.path === '/tools/make'));

  const homeGit = execFileSync('git', ['log', '-1', '--format=%cs', '--', 'src/app/page.tsx'], { encoding: 'utf8' }).trim();
  assert.equal(pages.find((entry) => entry.path === '/')?.lastmod, homeGit);
  assert.equal(resolveLastmod('2024-05-01T15:00:00Z', 'src/app/page.tsx'), '2024-05-01');
  assert.equal(pages.some((entry) => entry.lastmod === '2026-11-13'), false);
});

test('sitewide schema is valid JSON with the directory search action', () => {
  const data = organizationAndWebsite();
  const parsed = JSON.parse(JSON.stringify(data)) as { '@graph': Array<Record<string, unknown>> };
  assert.equal(parsed['@graph'][1].potentialAction && (parsed['@graph'][1].potentialAction as { '@type': string })['@type'], 'SearchAction');
  const faq = faqPage([{ question: 'How are experts vetted?', answer: 'Each expert names a human fallback.' }]);
  assert.equal(JSON.parse(JSON.stringify(faq)).mainEntity.length, 1);
});

test('withn-tech redirects permanently to jake-read', () => {
  const rules = readFileSync(new URL('../../public/_redirects', import.meta.url), 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
  assert.ok(rules.includes('/experts/withn-tech /experts/jake-read 301'));
  assert.ok(rules.includes('/experts/withn-tech/ /experts/jake-read 301'));
  assert.ok(rules.includes('/ai-tools /tools 301'));
  assert.ok(rules.includes('/tools/anthropic-claude /tools/claude 301'));
});
