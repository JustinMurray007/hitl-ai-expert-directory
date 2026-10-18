import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Find Ai Pros — Verified AI Specialists Directory',
  description:
    'Find Ai Pros connects businesses with verified AI specialists who build systems with real human accountability. Find vetted automation architects, conversational voice engineers, and applied AI developers.',
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
    title: 'Find Ai Pros — Verified AI Specialists Directory',
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
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#f9f9fb] text-[#001e00] antialiased selection:bg-[#c1eec6] selection:text-[#001e00]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
