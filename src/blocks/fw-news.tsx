import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { NEWS, type NewsItem } from '@/config/firefly';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { FireflyField } from '@/components/firefly-field';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

const NEWS_TEXT: Record<
  string,
  { title: () => string; summary: () => string }
> = {
  vol13: {
    title: () => m['fw.news.vol13.title'](),
    summary: () => m['fw.news.vol13.summary'](),
  },
  viz8: {
    title: () => m['fw.news.viz8.title'](),
    summary: () => m['fw.news.viz8.summary'](),
  },
  choitashi: {
    title: () => m['fw.news.choitashi.title'](),
    summary: () => m['fw.news.choitashi.summary'](),
  },
  drama: {
    title: () => m['fw.news.drama.title'](),
    summary: () => m['fw.news.drama.summary'](),
  },
  ep1: {
    title: () => m['fw.news.ep1.title'](),
    summary: () => m['fw.news.ep1.summary'](),
  },
  op: {
    title: () => m['fw.news.op.title'](),
    summary: () => m['fw.news.op.summary'](),
  },
  cast2: {
    title: () => m['fw.news.cast2.title'](),
    summary: () => m['fw.news.cast2.summary'](),
  },
  cast1: {
    title: () => m['fw.news.cast1.title'](),
    summary: () => m['fw.news.cast1.summary'](),
  },
  announce: {
    title: () => m['fw.news.announce.title'](),
    summary: () => m['fw.news.announce.summary'](),
  },
};

function formatNewsDate(item: NewsItem) {
  return new Intl.DateTimeFormat(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    ...(item.monthOnly ? {} : { day: 'numeric' }),
  }).format(new Date(`${item.date}T00:00:00Z`));
}

function Meta({ n }: { n: NewsItem }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <time dateTime={n.date} className="text-muted-foreground">
        {formatNewsDate(n)}
      </time>
      {n.upcoming && (
        <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 font-medium">
          {m['fw.news.upcoming']()}
        </span>
      )}
    </div>
  );
}

function SourceLink({ n }: { n: NewsItem }) {
  return (
    <span className="text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors">
      {m['fw.news.read']()}: {n.source}
      <ArrowUpRight className="size-3.5" />
    </span>
  );
}

/** Home: one featured item + compact list. Full: the whole timeline. */
export function FwNews({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section id="news" className="scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        {showHeading && (
          <Reveal className="max-w-3xl">
            <RevealHeading className="fw-display text-[clamp(2.75rem,5.5vw,4.75rem)]">
              {m['fw.news.title']()}
            </RevealHeading>
            <p className="text-foreground/75 mt-5 text-lg">
              {m['fw.news.subtitle']()}
            </p>
          </Reveal>
        )}
        {full ? <Timeline /> : <Digest />}
      </div>
    </section>
  );
}

function Digest() {
  const [lead, ...rest] = NEWS.filter((n) => !n.upcoming);
  const upcoming = NEWS.find((n) => n.upcoming);
  const compact = [upcoming, ...rest].filter(Boolean).slice(0, 4) as NewsItem[];

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <a
          href={lead.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card hover:border-foreground/25 flex h-full flex-col overflow-hidden rounded-xl border transition-colors"
        >
          {/* Cover shown at its own proportions on a night ground, never stretched */}
          <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden bg-[var(--night)]">
            <FireflyField count={14} seed={77} />
            <img
              src="/imgs/firefly/manga-vol8.webp"
              alt=""
              width={267}
              height={400}
              loading="lazy"
              className="relative h-[82%] w-auto rounded-sm shadow-[0_20px_50px_-12px_rgb(0_0_0/0.7)] transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
            <Meta n={lead} />
            <h3 className="fw-display text-4xl sm:text-5xl">
              {NEWS_TEXT[lead.id]?.title()}
            </h3>
            <p className="text-foreground/75 text-base leading-relaxed">
              {NEWS_TEXT[lead.id]?.summary()}
            </p>
            <div className="mt-auto pt-2">
              <SourceLink n={lead} />
            </div>
          </div>
        </a>
      </Reveal>

      <div className="flex flex-col gap-8 lg:col-span-5">
        {compact.map((n) => (
          <Reveal key={n.id}>
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Meta n={n} />
              <h3 className="mt-2 text-xl font-semibold tracking-tight underline-offset-4 group-hover:underline">
                {NEWS_TEXT[n.id]?.title()}
              </h3>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {NEWS_TEXT[n.id]?.summary()}
              </p>
            </a>
          </Reveal>
        ))}
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          {m['fw.news.full_link']()}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <ol className="relative mt-14 max-w-4xl">
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-[var(--wire)] sm:left-[167px]"
      >
        <span className="fw-thread-fill absolute inset-0 bg-[var(--pulse)] shadow-[0_0_8px_var(--pulse)]" />
      </span>
      {NEWS.map((n) => (
        <li
          key={n.id}
          className="relative grid gap-2 pb-12 pl-10 last:pb-0 sm:grid-cols-[136px_1fr] sm:gap-14 sm:pl-0"
        >
          <span
            aria-hidden
            className={cn(
              'absolute top-1.5 left-0 size-[15px] rounded-full border sm:left-[160px]',
              n.upcoming
                ? 'border-transparent bg-[var(--pulse)]'
                : 'fw-thread-dot bg-background border-[var(--wire)]'
            )}
          />
          <div className="sm:pt-0.5 sm:text-right">
            <Meta n={n} />
          </div>
          <Reveal>
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h2 className="fw-display text-3xl sm:text-4xl">
                {NEWS_TEXT[n.id]?.title()}
              </h2>
              <p className="text-foreground/75 mt-3 text-base leading-relaxed">
                {NEWS_TEXT[n.id]?.summary()}
              </p>
              <p className="mt-3">
                <SourceLink n={n} />
              </p>
            </a>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
