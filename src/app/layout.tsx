import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealRoute from '@/components/RevealRoute';
import JsonLd from '@/components/JsonLd';
import { organizationAndWebsite } from '@/lib/schema';
import { SITE_ORIGIN } from '@/lib/site-url';

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
  function show(el){el.setAttribute('data-revealed','')}
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
      for(var n=0;n<nodes.length;n++){show(nodes[n]);nodes[n].setAttribute('data-reveal-ready','')}
      return;
    }
    if(!window.__revealOnScroll){
      window.__revealOnScroll=new IntersectionObserver(function(entries){
        for(var e=0;e<entries.length;e++){
          if(!entries[e].isIntersecting) continue;
          show(entries[e].target);
          window.__revealOnScroll.unobserve(entries[e].target);
        }
      },{threshold:0.12,rootMargin:'0px 0px -4% 0px'});
    }
    var io=window.__revealOnScroll;
    var viewH=window.innerHeight||800;
    for(var j=0;j<nodes.length;j++){
      var el=nodes[j];
      el.setAttribute('data-reveal-ready','');
      var rect=el.getBoundingClientRect();
      if(rect.bottom>0 && rect.top<viewH) show(el);
      else io.observe(el);
    }
    /* React rewrites className when a control's state changes, which used to
       drop the revealed class and hide the control. data-revealed is not part
       of className, so it survives. Re-show anything already on screen. */
    var faded=document.querySelectorAll('[data-reveal]:not([data-revealed])');
    for(var f=0;f<faded.length;f++){
      var box=faded[f].getBoundingClientRect();
      if(box.bottom>0 && box.top<viewH) show(faded[f]);
    }
  }
  window.__armReveal=arm;
  try { arm(); }
  catch (err) {
    var stuck=document.querySelectorAll('[data-reveal]');
    for (var k=0;k<stuck.length;k++) show(stuck[k]);
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
    'AI automation consultant',
    'voice AI developer',
    'enterprise RAG consultant',
    'n8n consultant',
    'Make expert',
  ],
  authors: [{ name: 'Find Ai Pros Network' }],
  metadataBase: new URL(SITE_ORIGIN),
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
    <html lang="en" className={`${body.variable} ${display.variable} h-full`} data-scroll-behavior="smooth">
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
        <JsonLd data={organizationAndWebsite()} />
        <Navbar />
        <main id="content" className="min-w-0 flex-1">{children}</main>
        <Footer />
        <RevealRoute />
        <script dangerouslySetInnerHTML={{ __html: revealArmScript }} />
      </body>
    </html>
  );
}
