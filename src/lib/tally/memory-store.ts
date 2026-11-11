import {
  isTerminalTallyStatus,
  type CatalogEntry,
  type PendingListing,
  type TallyIntakeStore,
  type TallySaveInput,
  type TallySaveResult,
} from './types';

type StoredSubmission = {
  status: 'received' | 'stored' | 'needs_review' | 'ignored';
  expertId: string | null;
  applicationId: string | null;
  payload: unknown;
};

export type MemoryTallyStore = TallyIntakeStore & {
  submissions: Map<string, StoredSubmission>;
  listings: PendingListing[];
  expertIds: string[];
};

export function memoryTallyStore(catalog: {
  categories: CatalogEntry[];
  tools: CatalogEntry[];
}): MemoryTallyStore {
  const submissions = new Map<string, StoredSubmission>();
  const listings: PendingListing[] = [];
  const expertIds: string[] = [];
  let sequence = 0;

  return {
    submissions,
    listings,
    expertIds,
    async listCategories() {
      return catalog.categories;
    },
    async listTools() {
      return catalog.tools;
    },
    async save(input: TallySaveInput): Promise<TallySaveResult> {
      const existing = submissions.get(input.responseId);
      if (existing && isTerminalTallyStatus(existing.status)) {
        return { outcome: 'duplicate', expertId: existing.expertId, applicationId: existing.applicationId };
      }

      if (input.outcome !== 'listing' || !input.listing) {
        const status = input.outcome === 'ignored' ? 'ignored' : 'needs_review';
        submissions.set(input.responseId, {
          status,
          expertId: null,
          applicationId: null,
          payload: input.payload,
        });
        return { outcome: status, expertId: null, applicationId: null };
      }

      const prior = listings.find((listing) => listing.expert.slug === input.listing?.expert.slug);
      if (prior) {
        const index = listings.indexOf(prior);
        const expertId = expertIds[index] || `expert-${index + 1}`;
        submissions.set(input.responseId, {
          status: 'stored',
          expertId,
          applicationId: `application-${index + 1}`,
          payload: input.payload,
        });
        return { outcome: 'created', expertId, applicationId: `application-${index + 1}` };
      }

      sequence += 1;
      const expertId = `expert-${sequence}`;
      const applicationId = `application-${sequence}`;
      listings.push(input.listing);
      expertIds.push(expertId);
      submissions.set(input.responseId, {
        status: 'stored',
        expertId,
        applicationId,
        payload: input.payload,
      });
      return { outcome: 'created', expertId, applicationId };
    },
  };
}
