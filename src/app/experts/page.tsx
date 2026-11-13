import Link from 'next/link';
import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertsDirectoryClient from './ExpertsDirectoryClient';
import JsonLd from '@/components/JsonLd';
import { getLocationsSummary } from '@/lib/locations';
import { breadcrumbList, graph, itemList } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { expertForPage, isPublicDirectoryExpert } from '@/lib/listing';
export const metadata = withCanonical('/experts', {
  title: 'AI Experts Directory: Consultants and Agencies',
  description:
    'Browse AI consultants, voice AI builders, and automation agencies. Filter by category, tools, budget, and city.',
});

export default async function ExpertsPage() {
  const [categories, tools, experts] = await Promise.all([
    getCategories(),
    getTools(),
    getExperts(),
  ]);
  const published = experts.filter((expert) => isPublicDirectoryExpert(expert));
  const { cities } = getLocationsSummary(published);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <JsonLd
        data={graph(
          { '@type': 'CollectionPage', name: 'AI Experts Directory', url: 'https://findaipros.com/experts' },
          itemList(
            'AI experts',
            published.map((expert) => ({ name: expert.full_name, path: `/experts/${expert.slug}` })),
          ),
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Experts', path: '/experts' },
          ]),
        )}
      />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
          AI Experts Directory: Consultants and Agencies
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-3 max-w-3xl leading-relaxed font-normal">
          The Find AI Pros directory lists AI consultants and automation agencies. Every profile shows a starting budget, tools, categories, and location.
        </p>
      </div>

      <nav aria-label="Browse by category" className="mb-6 flex flex-wrap gap-2 text-sm">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="rounded-full border border-line bg-white px-3 py-1.5 font-medium text-ink hover:border-brand"
          >
            {category.name} ({category.expert_count ?? 0})
          </Link>
        ))}
      </nav>
      <nav aria-label="Browse by city" className="mb-8 flex flex-wrap gap-2 text-sm">
        {cities.slice(0, 12).map((city) => (
          <Link
            key={`${city.stateCode}-${city.slug}`}
            href={`/locations/city/${city.slug}`}
            className="rounded-full border border-line bg-white px-3 py-1.5 font-medium text-muted-strong hover:text-ink"
          >
            {city.name}, {city.stateCode}
          </Link>
        ))}
      </nav>

      <ExpertsDirectoryClient
        allExperts={published.map(expertForPage)}
        categories={categories}
        tools={tools}
      />
    </div>
  );
}
