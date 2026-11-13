import assert from 'node:assert/strict';
import test from 'node:test';
import { businessTypeBySlug, listBusinessTypes } from './business-routes';
import type { BottleneckItem } from './recommendations';
import {
  bottlenecksForBusiness,
  defaultAreaSelection,
  groupedAreaRecommendations,
  toggleAreaSelection,
} from './recommendation-selection';
import { toolSlugForStackName } from './tool-catalog';

test('areas can be selected together and removed without reordering the rest', () => {
  const industry = businessTypeBySlug('healthcare-dental');
  assert.ok(industry);
  const areas = bottlenecksForBusiness(industry);
  const first = defaultAreaSelection(industry);
  assert.equal(first.length, 1);
  assert.equal(first[0], areas[0].id);

  const two = toggleAreaSelection(first, areas[1].id);
  assert.deepEqual(two, [areas[0].id, areas[1].id]);
  const three = toggleAreaSelection(two, 'bottleneck-marketing');
  assert.deepEqual(three, [areas[0].id, areas[1].id, 'bottleneck-marketing']);
  assert.deepEqual(toggleAreaSelection(three, areas[1].id), [areas[0].id, 'bottleneck-marketing']);
});

test('selected areas stack in click order and collapse duplicate tools inside an area', () => {
  const industry = businessTypeBySlug('logistics-freight');
  assert.ok(industry);
  const areas = bottlenecksForBusiness(industry);
  const duplicate: BottleneckItem = {
    id: 'dup-tools',
    label: 'Duplicate tools',
    description: 'Same tool under two labels.',
    recommendedWorkflow: {
      title: 'Duplicate stack',
      problemSolved: 'Dedupes inside the area.',
      systemArchitecture: 'One architecture.',
      staffHandoff: 'Unused in the results view.',
      typicalRoi: 'Cleaner list.',
      recommendedStack: ['Make', 'Make', 'Anthropic Claude', 'Claude 3.5 Sonnet'],
      categorySlug: 'operations-workflow-automation',
      matchingExpertSlugs: [],
    },
  };
  const selected = toggleAreaSelection(
    toggleAreaSelection([duplicate.id], areas[0].id),
    'bottleneck-advertising',
  );
  const groups = groupedAreaRecommendations([duplicate, ...areas], selected);
  assert.deepEqual(
    groups.map((group) => group.id),
    [duplicate.id, areas[0].id, 'bottleneck-advertising'],
  );
  assert.deepEqual(
    groups[0].tools.map((tool) => tool.slug),
    ['make', 'claude'],
  );
  assert.equal(groups[0].tools.length, 2);
});

test('every recommended tool name resolves to a tool page', () => {
  for (const industry of listBusinessTypes()) {
    for (const area of bottlenecksForBusiness(industry)) {
      for (const name of area.recommendedWorkflow.recommendedStack) {
        const slug = toolSlugForStackName(name);
        assert.ok(slug, `missing tool page for ${name}`);
      }
    }
  }
});
