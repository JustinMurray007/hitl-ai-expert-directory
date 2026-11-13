import { absoluteUrl, SITE_ORIGIN } from './site-url';

export interface FaqEntry {
  question: string;
  answer: string;
}

type Json = Record<string, unknown>;

export function breadcrumbList(items: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemList(name: string, urls: { name: string; path: string }[]): Json {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: urls.length,
    itemListElement: urls.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(entries: readonly FaqEntry[]): Json | null {
  if (entries.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export function organizationAndWebsite(): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Find AI Pros',
        url: SITE_ORIGIN,
        logo: absoluteUrl('/logo-full.png'),
        description:
          'Directory of vetted AI consultants and automation agencies for small and mid-sized businesses. Every listed expert names an accountable person and a human fallback.',
        founder: { '@type': 'Person', name: 'Justin Murray' },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'Find AI Pros',
        url: SITE_ORIGIN,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_ORIGIN}/experts?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function graph(...nodes: Array<Json | null | undefined>): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter((node): node is Json => Boolean(node)),
  };
}
