import { Cpu } from 'lucide-react';
import ToolsDirectory from '@/components/ToolsDirectory';

export const metadata = {
  title: 'AI Tools Directory | Find Ai Pros',
  description:
    'A directory of AI models and tools grouped by category, including frontier models, automation, voice, coding, design, and business operations.',
};

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-soft border border-brand-line text-sm font-medium text-brand mb-4">
          <Cpu className="w-5 h-5 text-brand" />
          <span>AI tools, grouped by what they do</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          AI Tools
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Jump to a category, or filter the list. Each card names what the tool is for and where to start.
        </p>
      </div>
      <ToolsDirectory />
    </div>
  );
}
