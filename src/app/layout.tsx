import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealRoute from '@/components/RevealRoute';

const body = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-body',
  preload: true,
  adjustFontFallback: true,
});

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-display-face',
  preload: true,
  adjustFontFallback: true,
});

const revealClassScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')}catch(e){}`;

const revealArmScript = `(function(){
  var reduce=false;
  try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  if(reduce){document.documentElement.classList.remove('js-reveal');return}
  function arm(){
    var grids=document.querySelectorAll('[data-reveal-stagger]');
    for(var g=0;g<grids.length;g++){
      var kids=grids[g].children;
      for(var i=0;i<kids.length;i++){
        if(!kids[i].hasAttribute('data-reveal')) kids[i].setAttribute('data-reveal','');
        kids[i].style.setProperty('--reveal-delay', Math.min(i,5)*70+'ms');
      }
    }
    var nodes=document.querySelectorAll('[data-reveal]:not([data-reveal-ready])');
    if(!('IntersectionObserver' in window)){
      for(var n=0;n<nodes.length;n++){nodes[n].classList.add('is-in');nodes[n].setAttribute('data-reveal-ready','')}
      return;
    }
      if(!window.__hitlRevealIO){
      window.__hitlRevealIO=new IntersectionObserver(function(entries){
        for(var e=0;e<entries.length;e++){
          if(!entries[e].isIntersecting) continue;
          entries[e].target.classList.add('is-in');
          window.__hitlRevealIO.unobserve(entries[e].target);
        }
      },{threshold:0.12,rootMargin:'0px 0px -4% 0px'});
    }
    var io=window.__hitlRevealIO;
    var viewH=window.innerHeight||800;
    for(var j=0;j<nodes.length;j++){
      var el=nodes[j];
      el.setAttribute('data-reveal-ready','');
      var rect=el.getBoundingClientRect();
      if(rect.bottom>0 && rect.top<viewH) el.classList.add('is-in');
      else io.observe(el);
    }
  }
  window.__armReveal=arm;
  try { arm(); }
  catch (err) {
    var stuck=document.querySelectorAll('[data-reveal]');
    for (var k=0;k<stuck.length;k++) stuck[k].classList.add('is-in');
  }
})();`;

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
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script dangerouslySetInnerHTML={{ __html: revealClassScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased selection:bg-brand-tint selection:text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-ink focus:shadow-raised"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="content" className="min-w-0 flex-1">{children}</main>
        <Footer />
        <RevealRoute />
        <script dangerouslySetInnerHTML={{ __html: revealArmScript }} />
      </body>
    </html>
  );
}
