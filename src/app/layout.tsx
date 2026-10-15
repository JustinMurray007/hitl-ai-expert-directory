import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Human in the Loop (HITL) — Verified AI Specialists Directory',
  description:
    'The verified directory of AI specialists who build systems with real human accountability. Find vetted automation architects, conversational voice engineers, and applied AI developers for SMBs.',
  keywords: [
    'AI expert directory',
    'hire AI specialist',
    'human in the loop',
    'AI automation consultant',
    'voice AI developer',
    'enterprise RAG consultant',
    'n8n consultant',
    'Make expert',
  ],
  authors: [{ name: 'HITL Network' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Human in the Loop (HITL) — Verified AI Specialists Directory',
    description:
      'Verified AI specialists who build systems with real human accountability. No black boxes. Strict 2-case-study vetting.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#f9f9fb] text-[#001e00] antialiased selection:bg-[#c1eec6] selection:text-[#001e00]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
