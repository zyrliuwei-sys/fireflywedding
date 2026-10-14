import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { CHARACTERS } from '@/config/firefly';
import { srcSet } from '@/lib/img';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { FireflyField } from '@/components/firefly-field';
import { NodeCard } from '@/components/node-card';

/* Stage geometry (xl+ only): 1200×620, nodes placed in px so the wires can
   meet the ports exactly. Port y = node y + 24 (label row) + panel h / 2. */
const STAGE = { w: 1200, h: 620 };
const N = {
  manga: { x: 0, y: 0, w: 240, h: 300 },
  setting: { x: 0, y: 380, w: 240, h: 120 },
  anime: { x: 330, y: 40, w: 420, h: 520 },
  text: { x: 900, y: 0, w: 280, h: 170 },
  cast: { x: 900, y: 240, w: 280, h: 110 },
  onair: { x: 900, y: 420, w: 280, h: 170 },
};
type Box = (typeof N)[keyof typeof N];
const portR = (b: Box) => [b.x + b.w, b.y + 24 + b.h / 2] as const;
const portL = (b: Box) => [b.x, b.y + 24 + b.h / 2] as const;
function wire(a: readonly [number, number], b: readonly [number, number]) {
  const mx = (a[0] + b[0]) / 2;
  return `M${a[0]},${a[1]} C${mx},${a[1]} ${mx},${b[1]} ${b[0]},${b[1]}`;
}
/** Entrance order: the anime node lands first, its sources and outputs follow. */
const ORDER: Record<keyof typeof N, number> = {
  anime: 0,
  manga: 1,
  setting: 2,
  text: 3,
  cast: 4,
  onair: 5,
};
/** Below xl the nodes stack in a dense two-column grid (no wires). */
const MOBILE_SPAN: Record<keyof typeof N, string> = {
  anime: 'col-span-2 lg:col-span-1 lg:row-span-3',
  manga: '',
  setting: '',
  text: 'col-span-2 lg:col-span-1',
  cast: '',
  onair: '',
};
const MOBILE_PANEL: Record<keyof typeof N, string> = {
  anime: 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full',
  manga: 'aspect-[2/3]',
  setting: 'h-full min-h-32',
  text: '',
  cast: 'h-full min-h-32',
  onair: 'h-full min-h-32',
};
const WIRES = [
  wire(portR(N.manga), portL(N.anime)),
  wire(portR(N.setting), portL(N.anime)),
  wire(portR(N.anime), portL(N.text)),
  wire(portR(N.anime), portL(N.cast)),
  wire(portR(N.anime), portL(N.onair)),
];

function useNodes() {
  const zh = getLocale() === 'zh';
  const nodes: {
    key: keyof typeof N;
    label: string;
    meta?: string;
    ports: 'left' | 'right' | 'both';
    panelClassName?: string;
    body: ReactNode;
  }[] = [
    {
      key: 'manga',
      label: m['fw.node.manga'](),
      meta: m['fw.node.copies'](),
      ports: 'right',
      body: (
        <>
          <img
            src="/imgs/firefly/manga-vol4.webp"
            alt=""
            width={320}
            height={480}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </>
      ),
    },
    {
      key: 'setting',
      label: m['fw.node.setting'](),
      meta: '1868-1912',
      ports: 'right',
      panelClassName: 'flex flex-col justify-between p-5',
      body: (
        <>
          <p className="fw-mincho text-3xl">明治</p>
          <p className="text-muted-foreground text-sm">
            {m['fw.node.setting_value']()}
          </p>
        </>
      ),
    },
    {
      key: 'anime',
      label: m['fw.node.anime'](),
      meta: 'david production',
      ports: 'both',
      panelClassName: 'bg-[var(--night)]',
      body: (
        <>
          <img
            src="/imgs/firefly/anime-poster.webp"
            srcSet={srcSet('/imgs/firefly/anime-poster.webp', [480, 840], 990)}
            sizes="(min-width: 1280px) 420px, (min-width: 640px) 60vw, 100vw"
            alt=""
            width={990}
            height={1400}
            loading="eager"
            fetchPriority="high"
            className="fw-parallax h-full w-full object-cover object-top"
          />
          <FireflyField count={26} seed={3} />
        </>
      ),
    },
    {
      key: 'text',
      label: m['fw.node.text'](),
      ports: 'left',
      panelClassName: 'flex items-center p-6',
      body: (
        <blockquote className="font-[family-name:var(--font-serif-display)] text-[1.35rem] leading-[1.25] italic">
          {m['fw.node.quote']()}
        </blockquote>
      ),
    },
    {
      key: 'cast',
      label: m['fw.node.cast'](),
      meta: 'CV',
      ports: 'left',
      panelClassName: 'flex flex-col justify-center gap-2 p-5 text-sm',
      body: (
        <>
          {CHARACTERS.filter((c) => c.lead && c.cv).map((c) => (
            <p key={c.id} className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">{zh ? c.cv!.ja : c.cv!.en}</span>
              <span lang="ja" className="fw-mincho text-muted-foreground">
                {c.ja.replace(' ', '')}
              </span>
            </p>
          ))}
        </>
      ),
    },
    {
      key: 'onair',
      label: m['fw.node.onair'](),
      meta: 'Fuji TV',
      ports: 'left',
      panelClassName:
        'flex flex-col justify-end bg-[var(--night)] p-5 text-white',
      body: (
        <>
          <FireflyField count={10} seed={11} />
          <p className="fw-display relative text-6xl">
            23:30 <span className="text-2xl">JST</span>
          </p>
          <p className="relative mt-2 text-xs text-white/75">
            {m['fw.node.onair_value']()}
          </p>
        </>
      ),
    },
  ];
  return nodes;
}

export function FwHero() {
  const nodes = useNodes();

  return (
    <section className="fw-canvas relative overflow-hidden">
      <div
        aria-hidden
        className="to-background pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent"
      />
      <div className="relative mx-auto max-w-[1320px] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-16">
        <p
          className="fw-label text-muted-foreground fw-intro"
          style={{ animationDelay: '0.05s' }}
        >
          {m['fw.hero.eyebrow']()}
        </p>
        <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <h1 className="fw-display text-[clamp(3.5rem,8.5vw,7.25rem)] xl:whitespace-nowrap">
            <span className="fw-mask">
              <span className="fw-rise" style={{ animationDelay: '0.1s' }}>
                {m['fw.hero.title']()}
              </span>
            </span>
          </h1>
          <p
            lang="ja"
            className="fw-mincho text-foreground/85 text-[clamp(2rem,4vw,3.5rem)] leading-none whitespace-nowrap xl:pb-3"
          >
            <span className="fw-mask">
              <span className="fw-rise" style={{ animationDelay: '0.3s' }}>
                ホタルの嫁入り
              </span>
            </span>
          </p>
        </div>

        <div
          className="fw-intro mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          style={{ animationDelay: '0.5s' }}
        >
          <p className="text-foreground/80 max-w-md text-lg leading-relaxed">
            {m['fw.hero.subtitle']()}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/watch"
              className="bg-primary text-primary-foreground inline-flex items-center gap-3 rounded-lg px-6 py-3.5 text-base font-medium whitespace-nowrap transition-[filter] hover:brightness-95"
            >
              {m['fw.hero.cta_watch']()}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/story"
              className="border-foreground/20 hover:bg-foreground/5 inline-flex items-center gap-2 rounded-lg border px-5 py-3.5 text-base whitespace-nowrap transition-colors"
            >
              {m['fw.hero.cta_story']()}
            </Link>
          </div>
        </div>

        {/* Node canvas: wired stage on xl, stacked grid below */}
        <div
          className="relative mx-auto mt-16 hidden xl:block"
          style={{ width: STAGE.w, height: STAGE.h }}
        >
          <svg
            aria-hidden
            className="absolute inset-0"
            width={STAGE.w}
            height={STAGE.h}
            viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
            fill="none"
          >
            {WIRES.map((d, i) => (
              <g key={i}>
                <path
                  d={d}
                  stroke="var(--wire)"
                  strokeWidth={1.25}
                  pathLength={1}
                  className="fw-draw"
                  style={{ animationDelay: `${0.9 + i * 0.12}s` }}
                />
                <path
                  d={d}
                  className="fw-wire-pulse"
                  strokeWidth={2}
                  strokeLinecap="round"
                  style={{ animationDelay: `${-i * 1.1}s` }}
                />
              </g>
            ))}
          </svg>
          {nodes.map((n, i) => {
            const b = N[n.key];
            return (
              <NodeCard
                key={n.key}
                label={n.label}
                meta={n.meta}
                ports={n.ports}
                className="fw-intro absolute"
                style={{
                  left: b.x,
                  top: b.y,
                  width: b.w,
                  animationDelay: `${0.55 + ORDER[n.key] * 0.09}s`,
                }}
              >
                <div
                  style={{ height: b.h }}
                  className={cn('relative', n.panelClassName)}
                >
                  {n.body}
                </div>
              </NodeCard>
            );
          })}
        </div>

        <div className="relative mt-12 grid grid-cols-2 gap-x-3 gap-y-6 pb-10 sm:gap-x-5 lg:grid-cols-3 xl:hidden">
          {nodes.map((n) => (
            <NodeCard
              key={n.key}
              label={n.label}
              meta={n.key === 'manga' ? undefined : n.meta}
              ports="none"
              className={MOBILE_SPAN[n.key]}
            >
              <div
                className={cn(
                  'relative',
                  MOBILE_PANEL[n.key],
                  n.panelClassName
                )}
              >
                {n.body}
              </div>
            </NodeCard>
          ))}
        </div>
      </div>
    </section>
  );
}
