import assert from 'node:assert/strict';
import test from 'node:test';
import {
  STATIC_EXPORT_PLACEHOLDER,
  ensureStaticParams,
  isStaticExportPlaceholder,
} from './static-params';

test('empty static params use one placeholder and real params pass through', () => {
  assert.deepEqual(ensureStaticParams([], { slug: STATIC_EXPORT_PLACEHOLDER }), [
    { slug: STATIC_EXPORT_PLACEHOLDER },
  ]);
  assert.deepEqual(ensureStaticParams([{ slug: 'koby-oranski' }], { slug: STATIC_EXPORT_PLACEHOLDER }), [
    { slug: 'koby-oranski' },
  ]);
  assert.equal(isStaticExportPlaceholder(STATIC_EXPORT_PLACEHOLDER), true);
  assert.equal(isStaticExportPlaceholder('koby-oranski'), false);
  assert.equal(isStaticExportPlaceholder(''), false);
});
