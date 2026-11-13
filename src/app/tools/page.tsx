import { withCanonical } from '@/lib/seo';
import ToolsDirectory from '@/components/ToolsDirectory';
import RecommendationToolLinks from '@/components/RecommendationToolLinks';

export const metadata = withCanonical('/tools', {
  title: 'AI Tools Directory: What Each Tool Does and Who Builds With It',
  description:
    'AI models and tools grouped by use: LLMs, automation, voice, coding, design, CRM. Each page names what it is for.',
});

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          AI Tools for Business, Grouped by What They Do
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Jump to a category, or filter the list. Each card names what the tool is for and where to start.
        </p>
      </div>
      <ToolsDirectory />
      <RecommendationToolLinks />
    </div>
  );
}
