import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
} from 'react';

import { cn } from '@/lib/utils';

/**
 * A display heading whose words rise out of their own baselines, one after
 * another, the first time it scrolls into view. SSR output is plain visible
 * text; only headings that start below the fold are hidden after hydration.
 * CJK strings (no spaces) rise as a single line.
 */
export function RevealHeading({
  as = 'h2',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setVisible(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = children.split(/(\s+)/);
  let i = 0;
  return createElement(
    as,
    { ref, className: cn('fw-words', className), 'data-visible': visible },
    words.map((w, k) =>
      /^\s+$/.test(w) ? (
        w
      ) : (
        <span key={k} className="fw-mask">
          <span
            className="fw-word"
            style={{ transitionDelay: `${i++ * 55}ms` }}
          >
            {w}
          </span>
        </span>
      )
    )
  );
}
