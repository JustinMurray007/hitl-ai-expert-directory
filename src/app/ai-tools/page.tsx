import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tools Directory | Find Ai Pros',
  description: 'The AI tools directory now lives on the tools page of Find Ai Pros.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/tools' },
};

export default function LegacyAiToolsRedirect() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <meta httpEquiv="refresh" content="0; url=/tools" />
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">The AI tools directory moved</h1>
      <p className="mt-3 text-base text-muted-strong">
        It now lives at <a className="font-medium text-brand" href="/tools">/tools</a>.
      </p>
    </div>
  );
}
