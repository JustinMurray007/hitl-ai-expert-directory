import AiToolsDirectory from '@/components/AiToolsDirectory';
import { Cpu, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Top AI Models & AI Tools Directory (2026) | Find Ai Pros',
  description:
    'Curated directory of top AI models and AI tools including Viktor, Claude, ChatGPT, Google Gemini, Grok, Perplexity AI, Make, Cursor, and more. Compare capabilities, pricing, and find specialists to integrate them.',
};

export default function AiToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-soft border border-brand-line text-sm font-bold text-brand mb-4 shadow-xs">
          <Cpu className="w-5 h-5 text-brand" />
          <span>Curated AI Software &amp; Models</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-ink tracking-tight leading-tight">
          Top AI Models &amp; AI Tools Directory
        </h1>
        <p className="text-base sm:text-lg text-muted-strong mt-4 leading-relaxed font-normal">
          Explore the industry-leading AI models, automation platforms, and developer tools powering modern business automation. Compare features, pricing, and discover specialists who can build them into your business workflows.
        </p>
      </div>

      {/* Directory Component */}
      <AiToolsDirectory />
    </div>
  );
}
