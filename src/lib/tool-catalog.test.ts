import assert from 'node:assert/strict';
import test from 'node:test';
import { AI_TOOLS } from './ai-tools';
import {
  SEEDED_DIRECTORY_TOOLS,
  groupToolFits,
  listPublicTools,
  toolBySlug,
  toolPath,
  toolSitemapPaths,
  toolStaticSlugs,
} from './tool-catalog';

test('the 22 seeded tools each resolve to a tool page', () => {
  assert.equal(SEEDED_DIRECTORY_TOOLS.length, 22);
  for (const tool of SEEDED_DIRECTORY_TOOLS) {
    const page = toolBySlug(tool.pageSlug);
    assert.ok(page, tool.slug);
    assert.equal(toolPath(tool.slug), `/tools/${tool.pageSlug}`);
    assert.ok(page.description.length > 20, tool.slug);
    assert.ok(page.category, tool.slug);
    assert.ok(page.websiteUrl.startsWith('https://'), tool.slug);
  }
  assert.equal(toolBySlug('anthropic-claude')?.slug, 'claude');
  assert.equal(toolPath('anthropic-claude'), '/tools/claude');
});

test('directory tools and recommendation tools are in the sitemap once', () => {
  const paths = toolSitemapPaths();
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.includes('/tools/claude'));
  assert.ok(paths.includes('/tools/vapi'));
  assert.ok(paths.includes('/tools/make'));
  assert.equal(paths.includes('/tools/anthropic-claude'), false);
  for (const tool of AI_TOOLS) {
    assert.ok(paths.includes(`/tools/${tool.id}`), tool.id);
  }
  assert.ok(toolStaticSlugs().includes('anthropic-claude'));
});

test('a recommended tool lists the business types and areas it helps', () => {
  const vapi = toolBySlug('vapi');
  assert.ok(vapi);
  const groups = groupToolFits(vapi.fits);
  assert.ok(groups.some((group) => group.businessSlug === 'healthcare-dental'));
  assert.ok(
    groups.some(
      (group) =>
        group.businessSlug === null && group.areas.some((area) => area.id === 'bottleneck-lead-growth'),
    ),
  );
  const pages = listPublicTools();
  assert.ok(pages.length >= AI_TOOLS.length);
  for (const tool of pages) {
    assert.equal(tool.websiteUrl.startsWith('http'), true, tool.slug);
  }
});
