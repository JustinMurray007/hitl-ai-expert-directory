import JsonLd from '@/components/JsonLd';
import { faqPage, graph, type FaqEntry } from '@/lib/schema';

export default function FaqList({ entries, title = 'Questions' }: { entries: readonly FaqEntry[]; title?: string }) {
  if (entries.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <JsonLd data={graph(faqPage(entries))} />
      <div className="mt-4 space-y-4">
        {entries.map((entry) => (
          <div key={entry.question} className="rounded-2xl border border-line bg-white p-5">
            <h3 className="text-lg font-semibold text-ink">{entry.question}</h3>
            <p className="mt-2 text-base leading-relaxed text-muted-strong">{entry.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
