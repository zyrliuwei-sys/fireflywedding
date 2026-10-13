import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  EPISODE_COUNT,
  EPISODE_TITLES,
  episodeAirDate,
  OFFICIAL_ANIME_URL,
  READ_LINKS,
  WATCH_PLATFORMS,
} from '@/config/firefly';
import { srcSet } from '@/lib/img';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { FireflyField } from '@/components/firefly-field';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

// Static lookups (not tDynamic) keep the page bundle tree-shaken.
const REGION: Record<string, () => string> = {
  global: () => m['fw.watch.region.global'](),
  jp: () => m['fw.watch.region.jp'](),
  asia: () => m['fw.watch.region.asia'](),
};
const PLATFORM_NOTE: Record<string, () => string> = {
  crunchyroll: () => m['fw.watch.platform.crunchyroll'](),
  noitamina: () => m['fw.watch.platform.noitamina'](),
  atx: () => m['fw.watch.platform.atx'](),
  abema: () => m['fw.watch.platform.abema'](),
  tver: () => m['fw.watch.platform.tver'](),
  netflix: () => m['fw.watch.platform.netflix'](),
  prime: () => m['fw.watch.platform.prime'](),
  unext: () => m['fw.watch.platform.unext'](),
  muse: () => m['fw.watch.platform.muse'](),
};
const READ_NOTE: Record<string, () => string> = {
  urasunday: () => m['fw.watch.read.urasunday'](),
  viz: () => m['fw.watch.read.viz'](),
  comikey: () => m['fw.watch.read.comikey'](),
};

function formatDay(date: Date) {
  return new Intl.DateTimeFormat(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'Asia/Tokyo',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/** Current time after hydration; null during SSR so markup stays stable. */
function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);
  return now;
}

const featured = WATCH_PLATFORMS.find((p) => p.featured)!;
const others = WATCH_PLATFORMS.filter((p) => !p.featured);

/** Where-to-watch section. `full` adds the schedule, regions and manga. */
export function FwWatch({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section id="watch" className="scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Framed night still */}
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--night)] shadow-[0_24px_60px_-30px_oklch(0.21_0.03_265/0.6)]">
              <img
                src="/imgs/generated/fw-watch-garden.webp"
                srcSet={srcSet(
                  '/imgs/generated/fw-watch-garden.webp',
                  [560, 880],
                  1122
                )}
                sizes="(min-width: 1024px) 38vw, 100vw"
                alt=""
                width={1122}
                height={1402}
                loading="lazy"
                className="fw-parallax absolute inset-0 h-full w-full object-cover"
              />
              <FireflyField count={34} seed={21} />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--night)] to-transparent p-6 pt-20 text-white">
                <p className="fw-display text-5xl">23:30 JST</p>
                <p className="mt-2 text-sm text-white/75">
                  {m['fw.watch.media_caption']()}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            {showHeading && (
              <Reveal>
                <RevealHeading className="fw-display text-[clamp(2.75rem,5.5vw,4.75rem)]">
                  {m['fw.watch.title']()}
                </RevealHeading>
                <p className="text-foreground/75 mt-6 max-w-xl text-lg leading-relaxed">
                  {m['fw.watch.subtitle']()}
                </p>
              </Reveal>
            )}

            {/* Featured platform */}
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group bg-primary text-primary-foreground flex items-end justify-between gap-6 rounded-xl p-6 transition-[filter] hover:brightness-95 sm:p-8',
                showHeading && 'mt-12'
              )}
            >
              <div>
                <p className="fw-label opacity-70">
                  {REGION[featured.region]()}
                </p>
                <p className="fw-display mt-4 text-[clamp(2.75rem,6vw,4.5rem)]">
                  {featured.name}
                </p>
                <p className="mt-2 text-sm opacity-80">
                  {PLATFORM_NOTE[featured.id]()}
                </p>
              </div>
              <ArrowUpRight className="size-7 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Other platforms */}
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
              {others.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card flex h-full items-start justify-between gap-2 rounded-xl border p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--pulse)] hover:shadow-[0_14px_34px_-18px_color-mix(in_oklab,var(--pulse)_70%,transparent)] sm:gap-4 sm:p-5"
                  >
                    <div>
                      <p className="fw-display text-2xl sm:text-3xl">
                        {p.name}
                      </p>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {REGION[p.region]()}, {PLATFORM_NOTE[p.id]()}
                      </p>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              {m['fw.watch.note']()}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <a
                href={OFFICIAL_ANIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--ai)] underline-offset-4 hover:underline"
              >
                {m['fw.watch.official']()}
                <ArrowUpRight className="size-3.5" />
              </a>
              {!full && (
                <Link
                  href="/watch"
                  className="inline-flex items-center gap-1.5 font-medium underline-offset-4 hover:underline"
                >
                  {m['fw.watch.full_link']()}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {full && (
          <>
            <EpisodeSchedule />
            <RegionGuide />
            <ReadManga />
          </>
        )}
      </div>
    </section>
  );
}

function EpisodeSchedule() {
  const now = useNow();
  const episodes = Array.from({ length: EPISODE_COUNT }, (_, i) => {
    const n = i + 1;
    return { n, at: episodeAirDate(n), title: EPISODE_TITLES[n] };
  });
  const nextN =
    now === null ? null : episodes.find((e) => e.at.getTime() > now)?.n;
  const zh = getLocale() === 'zh';

  return (
    <div id="episodes" className="mt-28 scroll-mt-24">
      <RevealHeading className="fw-display text-[clamp(2.5rem,5vw,4rem)]">
        {m['fw.watch.episodes']()}
      </RevealHeading>
      <p className="text-muted-foreground mt-4 text-sm">
        {m['fw.watch.schedule_note']()}
      </p>
      <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {episodes.map((e) => {
          const aired = now !== null && e.at.getTime() <= now;
          const isNext = e.n === nextN;
          return (
            <li
              key={e.n}
              className={cn(
                'flex min-h-36 flex-col justify-between gap-4 rounded-xl border p-4',
                isNext
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : aired
                    ? 'bg-card'
                    : 'border-dashed'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">
                  {m['fw.watch.ep']({ number: String(e.n).padStart(2, '0') })}
                </span>
                {(aired || isNext) && (
                  <span className="text-[11px] opacity-70">
                    {isNext ? m['fw.watch.next']() : m['fw.watch.aired']()}
                  </span>
                )}
              </div>
              <div>
                <p
                  className={cn(
                    'text-sm leading-snug',
                    !e.title && !isNext && 'text-muted-foreground'
                  )}
                >
                  {e.title
                    ? zh
                      ? e.title.ja
                      : e.title.en
                    : m['fw.watch.tba']()}
                </p>
                <p className="mt-1 text-xs opacity-70">{formatDay(e.at)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function RegionGuide() {
  const regions = [
    {
      title: m['fw.watchpage.global.title'](),
      body: m['fw.watchpage.global.body'](),
    },
    { title: m['fw.watchpage.jp.title'](), body: m['fw.watchpage.jp.body']() },
    {
      title: m['fw.watchpage.asia.title'](),
      body: m['fw.watchpage.asia.body'](),
    },
  ];
  return (
    <div className="mt-28 grid gap-x-16 gap-y-12 lg:grid-cols-2">
      {regions.map((r, i) => (
        <Reveal key={r.title} className={cn(i === 0 && 'lg:row-span-2')}>
          <h3
            className={cn(
              'fw-display',
              i === 0 ? 'text-5xl sm:text-6xl' : 'text-4xl'
            )}
          >
            {r.title}
          </h3>
          <p className="text-foreground/80 mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
            {r.body}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function ReadManga() {
  return (
    <div className="mt-28">
      <RevealHeading className="fw-display text-[clamp(2.5rem,5vw,4rem)]">
        {m['fw.watch.read_title']()}
      </RevealHeading>
      <div className="mt-10 flex flex-col gap-3 md:flex-row">
        {READ_LINKS.map((r, i) => (
          <a
            key={r.id}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group bg-card hover:border-foreground/25 flex flex-col justify-between gap-10 rounded-xl border p-6 transition-colors',
              i === 0 ? 'md:flex-[1.6]' : 'md:flex-1'
            )}
          >
            <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-5 self-end transition-colors" />
            <div>
              <p className="fw-display text-4xl">{r.name}</p>
              <p className="text-muted-foreground mt-2 text-sm">
                {READ_NOTE[r.id]()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
