import assert from 'node:assert/strict';
import test from 'node:test';
import { businessPath, businessTypeBySlug, canonicalBusinessSlug, listBusinessTypes } from './business-routes';

test('legacy industry query values map to canonical business paths', () => {
  assert.equal(canonicalBusinessSlug('freight_logistics'), 'logistics-freight');
  assert.equal(canonicalBusinessSlug('medical_dental'), 'healthcare-dental');
  assert.equal(canonicalBusinessSlug('home_services_trade'), 'home-services-trades');
  assert.equal(canonicalBusinessSlug('legal_accounting'), 'legal-finance-consulting');
  assert.equal(canonicalBusinessSlug('ecommerce_retail'), 'ecommerce-retail');
  assert.equal(canonicalBusinessSlug('real_estate_property'), 'real-estate-property');
  assert.equal(businessPath('logistics-freight'), '/business/logistics-freight');
  assert.equal(businessTypeBySlug('healthcare-dental')?.industryName, 'Healthcare, Dental & Medical Clinics');
  assert.equal(canonicalBusinessSlug('not-a-business'), null);
  assert.ok(listBusinessTypes().length > 6);
});
