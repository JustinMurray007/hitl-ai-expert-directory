import assert from 'node:assert/strict';
import test from 'node:test';
import {
  businessPath,
  businessStaticSlugs,
  businessTypeBySlug,
  canonicalBusinessSlug,
  listBusinessTypes,
  recommendationPagePaths,
} from './business-routes';

test('legacy industry query values map to canonical recommendation paths', () => {
  assert.equal(canonicalBusinessSlug('freight_logistics'), 'logistics-freight');
  assert.equal(canonicalBusinessSlug('medical_dental'), 'healthcare-dental');
  assert.equal(canonicalBusinessSlug('home_services_trade'), 'home-services-trades');
  assert.equal(canonicalBusinessSlug('legal_accounting'), 'legal-finance-consulting');
  assert.equal(canonicalBusinessSlug('ecommerce_retail'), 'ecommerce-retail');
  assert.equal(canonicalBusinessSlug('real_estate_property'), 'real-estate-property');
  assert.equal(businessPath('logistics-freight'), '/ai-solutions-by-industry/logistics-freight');
  assert.equal(businessPath('healthcare-dental'), '/ai-solutions-by-industry/healthcare-dental');
  assert.equal(businessPath('home-services-trades'), '/ai-solutions-by-industry/home-services-trades');
  assert.equal(businessTypeBySlug('healthcare-dental')?.industryName, 'Healthcare, Dental & Medical Clinics');
  assert.equal(canonicalBusinessSlug('not-a-business'), null);
  assert.ok(listBusinessTypes().length > 6);
});

test('recommendation pages are clean paths and legacy aliases still resolve', () => {
  const paths = recommendationPagePaths();
  assert.ok(paths.includes('/ai-solutions-by-industry/healthcare-dental'));
  assert.ok(paths.includes('/ai-solutions-by-industry/home-services-trades'));
  assert.ok(paths.includes('/ai-solutions-by-industry/logistics-freight'));
  assert.equal(paths.some((path) => path.startsWith('/recommendations')), false);
  assert.equal(paths.some((path) => path.includes('?')), false);
  assert.equal(paths.length, listBusinessTypes().length);
  assert.ok(businessStaticSlugs().includes('freight_logistics'));
  assert.ok(businessStaticSlugs().includes('healthcare-dental'));
});
