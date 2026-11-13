import Link from 'next/link';
import { getCategories, getTools, getExperts } from '@/lib/store';
import ExpertsDirectoryClient from './ExpertsDirectoryClient';
import JsonLd from '@/components/JsonLd';
import { getLocationsSummary } from '@/lib/locations';
import { breadcrumbList, graph, itemList } from '@/lib/schema';
import { withCanonical } from '@/lib/seo';
import { isPublicDirectoryExpert } from '@/lib/listing';
import { ShieldCheck } from 'lucide-react';

export const metadata = withCanonical('/experts', {
  title: 'Browse AI Experts & Agencies | Find Ai Pros',
  description: 'Search AI automation consultants, conversational voice engineers, and applied AI developers. Filter by category, tool stack, and budget.',
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
        <div className="mb-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-brand-line bg-brand-soft px-3.5 py-1.5 text-sm font-bold text-brand shadow-rest">
          <ShieldCheck className="w-4 h-4" />
          <span>Curated AI Expert Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight">
          Find AI Automation Experts
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-3 max-w-3xl leading-relaxed font-normal">
          Every expert listed below has agreed to name an accountable person and describe their human fallback. Case studies are not required. Filter by category to see who appears on each category page.
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
        allExperts={published}
        categories={categories}
        tools={tools}
      />
    </div>
  );
}
