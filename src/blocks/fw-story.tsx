import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { STAFF } from '@/config/firefly';
import { srcSet } from '@/lib/img';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { FireflyField } from '@/components/firefly-field';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

const BEATS = [
  {
    title: () => m['fw.story.beat.1.title'](),
    body: () => m['fw.story.beat.1.body'](),
  },
  {
    title: () => m['fw.story.beat.2.title'](),
    body: () => m['fw.story.beat.2.body'](),
    lit: true,
  },
  {
    title: () => m['fw.story.beat.3.title'](),
    body: () => m['fw.story.beat.3.body'](),
  },
  {
    title: () => m['fw.story.beat.4.title'](),
    body: () => m['fw.story.beat.4.body'](),
  },
  {
    title: () => m['fw.story.beat.5.title'](),
    body: () => m['fw.story.beat.5.body'](),
  },
  {
    title: () => m['fw.story.beat.6.title'](),
    body: () => m['fw.story.beat.6.body'](),
  },
];

const STAFF_LABEL: Record<string, () => string> = {
  original: () => m['fw.staff.original'](),
  studio: () => m['fw.staff.studio'](),
  director: () => m['fw.staff.director'](),
  composition: () => m['fw.staff.composition'](),
  design: () => m['fw.staff.design'](),
  music: () => m['fw.staff.music'](),
  op: () => m['fw.staff.op'](),
  ed: () => m['fw.staff.ed'](),
};

/** The story beats strung on a single thread, the site's signature line. */
function Thread() {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute top-3 bottom-3 left-[7px] w-px bg-[var(--wire)]"
      >
        <span className="fw-thread-fill absolute inset-0 bg-[var(--pulse)] shadow-[0_0_8px_var(--pulse)]" />
      </span>
      {BEATS.map((b, i) => (
        <li key={i} className="relative pb-10 pl-10 last:pb-0">
          <span
            aria-hidden
            className={cn(
              'absolute top-2 left-0 size-[15px] rounded-full border',
              b.lit
                ? 'border-transparent bg-[var(--pulse)] shadow-[0_0_0_5px_color-mix(in_oklab,var(--glow)_45%,transparent)]'
                : 'fw-thread-dot bg-background border-[var(--wire)]'
            )}
          />
          <h3 className="fw-display text-3xl">{b.title()}</h3>
          <p className="text-muted-foreground mt-2 max-w-md text-base leading-relaxed">
            {b.body()}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Story section. `full` adds setting, themes, manga and credits. */
export function FwStory({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  const tags = [
    m['fw.story.tag.era'](),
    m['fw.story.tag.genre'](),
    m['fw.story.tag.tone'](),
    m['fw.story.tag.source'](),
  ];

  return (
    <section id="story" className="scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            {showHeading && (
              <>
                <RevealHeading className="fw-display text-[clamp(2.75rem,5.5vw,4.75rem)]">
                  {m['fw.story.title']()}
                </RevealHeading>
                <p className="text-muted-foreground mt-5 text-base">
                  {m['fw.story.subtitle']()}
                </p>
              </>
            )}
            <p
              className={cn(
                'text-foreground/85 text-xl leading-[1.75]',
                showHeading && 'mt-10'
              )}
            >
              {m['fw.story.premise']()}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li
                  key={t}
                  className="text-foreground/75 rounded-full border px-3 py-1 text-xs"
                >
                  {t}
                </li>
              ))}
            </ul>
            {!full && (
              <Link
                href="/story"
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {m['fw.story.full_link']()}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <Thread />
          </Reveal>
        </div>

        {full && <StoryDetails />}
      </div>
    </section>
  );
}

function StoryDetails() {
  return (
    <>
      {/* Setting + island: image/text zigzag (two rows only) */}
      <div className="mt-32 space-y-24">
        <Reveal className="grid items-center gap-10 lg:grid-cols-12">
          <figure className="overflow-hidden rounded-xl lg:col-span-5">
            <img
              src="/imgs/firefly/satoko-teaser.webp"
              alt=""
              width={1000}
              height={563}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <RevealHeading className="fw-display text-[clamp(2.5rem,5vw,4rem)]">
              {m['fw.storypage.setting.title']()}
            </RevealHeading>
            <p className="text-foreground/80 mt-6 text-lg leading-[1.8]">
              {m['fw.storypage.setting.body']()}
            </p>
          </div>
        </Reveal>
        <Reveal className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--night)]">
              <img
                src="/imgs/firefly/anime-key-visual.webp"
                srcSet={srcSet(
                  '/imgs/firefly/anime-key-visual.webp',
                  [960, 1440],
                  2237
                )}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt=""
                width={1024}
                height={518}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-85"
              />
              <FireflyField count={20} seed={52} />
            </figure>
          </div>
          <div className="lg:order-1 lg:col-span-6">
            <RevealHeading className="fw-display text-[clamp(2.5rem,5vw,4rem)]">
              {m['fw.storypage.island.title']()}
            </RevealHeading>
            <p className="text-foreground/80 mt-6 text-lg leading-[1.8]">
              {m['fw.storypage.island.body']()}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Themes: a single wide statement */}
      <Reveal className="mx-auto mt-32 max-w-4xl text-center">
        <h2 className="fw-label text-muted-foreground">
          {m['fw.storypage.themes.title']()}
        </h2>
        <p className="fw-display mt-8 text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.15]">
          {m['fw.storypage.themes.body']()}
        </p>
      </Reveal>

      {/* Manga + credits */}
      <div className="fw-canvas mt-32 grid gap-12 rounded-xl p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <RevealHeading className="fw-display text-4xl sm:text-5xl">
            {m['fw.storypage.manga.title']()}
          </RevealHeading>
          <p className="text-foreground/80 mt-6 text-base leading-[1.8]">
            {m['fw.storypage.manga.body']()}
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <RevealHeading className="fw-display text-4xl sm:text-5xl">
            {m['fw.story.staff_title']()}
          </RevealHeading>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-sm sm:text-base">
            {STAFF.map((s) => (
              <div key={s.key} className="contents">
                <dt className="text-muted-foreground">
                  {STAFF_LABEL[s.key]?.()}
                </dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
