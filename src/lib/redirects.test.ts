import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

test('old recommendation URLs 301 to AI solutions by industry', () => {
  const file = readFileSync(path.join(process.cwd(), 'public/_redirects'), 'utf8');
  const rules = file
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/));

  function has(source: string, destination: string) {
    assert.ok(
      rules.some((rule) => rule[0] === source && rule[1] === destination && rule[2] === '301'),
      `${source} -> ${destination}`,
    );
  }

  has('/recommendations', '/ai-solutions-by-industry');
  has('/recommendations/', '/ai-solutions-by-industry');
  has('/recommendations/:slug', '/ai-solutions-by-industry/:slug');
  has('/recommendations/:slug/', '/ai-solutions-by-industry/:slug');
  has('/recommendations/freight_logistics', '/ai-solutions-by-industry/logistics-freight');
  has('/recommendations/freight_logistics/', '/ai-solutions-by-industry/logistics-freight');
  has('/recommendations/medical_dental', '/ai-solutions-by-industry/healthcare-dental');
  has('/experts/withn-tech', '/experts/jake-read');
  has('/experts/withn-tech/', '/experts/jake-read');
  has('/hitl-standard', '/about');
  has('/hitl-standard/', '/about');
  has('/business/:slug', '/ai-solutions-by-industry/:slug');
  has('/business/:slug/', '/ai-solutions-by-industry/:slug');
  has('/business/freight_logistics', '/ai-solutions-by-industry/logistics-freight');

  const legacy = rules.findIndex((rule) => rule[0] === '/recommendations/freight_logistics');
  const splat = rules.findIndex((rule) => rule[0] === '/recommendations/:slug');
  assert.ok(legacy >= 0 && splat > legacy);
  const businessAlias = rules.findIndex((rule) => rule[0] === '/business/freight_logistics');
  const businessSplat = rules.findIndex((rule) => rule[0] === '/business/:slug');
  assert.ok(businessAlias >= 0 && businessSplat > businessAlias);
});
