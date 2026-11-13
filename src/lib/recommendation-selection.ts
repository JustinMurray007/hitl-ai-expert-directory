import { COMMON_GROWTH_BOTTLENECKS, type BottleneckItem, type IndustryRecommendation } from './recommendations';
import { toolSlugForStackName } from './tool-catalog';

export interface StackToolLink {
  name: string;
  slug: string | null;
}

export interface AreaRecommendationGroup {
  id: string;
  label: string;
  description: string;
  badge?: string;
  workflow: BottleneckItem['recommendedWorkflow'];
  tools: StackToolLink[];
}

/** Industry-specific bottlenecks, then the shared growth areas shown on every business page. */
export function bottlenecksForBusiness(industry: IndustryRecommendation): BottleneckItem[] {
  return [...industry.commonBottlenecks, ...COMMON_GROWTH_BOTTLENECKS];
}

export function defaultAreaSelection(industry: IndustryRecommendation): string[] {
  const first = bottlenecksForBusiness(industry)[0];
  return first ? [first.id] : [];
}

/** Add an area, or remove it when it is already selected. Order follows the clicks. */
export function toggleAreaSelection(selectedIds: readonly string[], id: string): string[] {
  if (selectedIds.includes(id)) return selectedIds.filter((item) => item !== id);
  return [...selectedIds, id];
}

/**
 * One group per selected area, in selection order.
 * Tools repeat across areas so each group stays complete, and collapse inside a group
 * when two labels point at the same tool page.
 */
export function groupedAreaRecommendations(
  bottlenecks: readonly BottleneckItem[],
  selectedIds: readonly string[],
): AreaRecommendationGroup[] {
  const byId = new Map(bottlenecks.map((item) => [item.id, item]));
  const seenIds = new Set<string>();
  const groups: AreaRecommendationGroup[] = [];

  for (const id of selectedIds) {
    if (seenIds.has(id)) continue;
    const item = byId.get(id);
    if (!item) continue;
    seenIds.add(id);

    const seenTools = new Set<string>();
    const tools: StackToolLink[] = [];
    for (const name of item.recommendedWorkflow.recommendedStack) {
      const slug = toolSlugForStackName(name);
      const key = slug ?? name.trim().toLowerCase();
      if (seenTools.has(key)) continue;
      seenTools.add(key);
      tools.push({ name, slug });
    }

    groups.push({
      id: item.id,
      label: item.label,
      description: item.description,
      badge: item.badge,
      workflow: item.recommendedWorkflow,
      tools,
    });
  }

  return groups;
}
