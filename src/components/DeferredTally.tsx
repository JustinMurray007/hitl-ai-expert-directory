'use client';

import { useEffect, useRef, useState } from 'react';

const EMBED_SRC = 'https://tally.so/widgets/embed.js';

function loadTallyScript() {
  if (document.querySelector('script[data-tally-embed]')) return;
  const script = document.createElement('script');
  script.src = EMBED_SRC;
  script.async = true;
  script.dataset.tallyEmbed = 'true';
  document.body.appendChild(script);
}

export default function DeferredTally({
  src,
  title,
  height = 680,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = frame.current;
    if (!node || active) return;
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    if (active) loadTallyScript();
  }, [active]);

  return (
    <div ref={frame} className="w-full overflow-hidden rounded-2xl bg-white" style={{ minHeight: height }}>
      <noscript>
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height}
          className="w-full border-0"
        />
      </noscript>
      {active ? (
        <iframe
          src={src}
          data-tally-src={src}
          title={title}
          width="100%"
          height={height}
          loading="lazy"
          className="w-full border-0"
        />
      ) : (
        <div className="flex items-center justify-center px-6 text-center" style={{ minHeight: height }}>
          <button
            type="button"
            onClick={() => setActive(true)}
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-bold text-white"
          >
            Load the form
          </button>
        </div>
      )}
    </div>
  );
}
