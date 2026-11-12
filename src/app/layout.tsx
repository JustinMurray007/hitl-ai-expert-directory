import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const body = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  variable: '--font-display-face',
});

export const metadata: Metadata = {
  title: 'Find Ai Pros — AI Specialists Directory',
  description:
    'Find the Best AI Experts in the World To Elevate Your Business With the Latest in AI. Our team has one of the largest databases of AI experts globally and locally for small businesses and corporations to find the best match for their needs.',
  keywords: [
    'Find Ai Pros',
    'find ai pros',
    'AI expert directory',
    'hire AI specialist',
    'human in the loop',
    'AI automation consultant',
    'voice AI developer',
    'enterprise RAG consultant',
    'n8n consultant',
    'Make expert',
  ],
  authors: [{ name: 'Find Ai Pros Network' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Find Ai Pros — AI Specialists Directory',
    description:
      'Find the Best AI Experts in the World To Elevate Your Business With the Latest in AI. Our team has one of the largest databases of AI experts globally and locally for small businesses and corporations to find the best match for their needs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased selection:bg-brand-tint selection:text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
