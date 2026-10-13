import { ChevronRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { srcSet } from '@/lib/img';
import { m } from '@/paraglide/messages.js';
import { FireflyField } from '@/components/firefly-field';

/**
 * Inner-page masthead: breadcrumb, a rising H1 and intro on the left; on the
 * right an arched "Meiji window" still with live fireflies, captioned by the
 * series title set vertically in Mincho, the way Japanese titles are printed.
 */
export function FwPageHero({
  title,
  intro,
  crumb,
  image = '/imgs/generated/fw-news-masthead.webp',
  jp,
}: {
  title: string;
  intro: string;
  crumb: string;
  image?: string;
  /** Optional Japanese line set in Mincho under the title. */
  jp?: string;
}) {
  return (
    <section className="fw-canvas overflow-hidden">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-10 lg:pt-14 lg:pb-24">
        <div className="lg:col-span-7 lg:pb-6">
          <nav
            aria-label="Breadcrumb"
            className="text-muted-foreground fw-intro text-sm"
          >
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {m['fw.breadcrumb.home']()}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-foreground">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 className="fw-display mt-8 text-[clamp(3.25rem,7.5vw,6.75rem)]">
            <span className="fw-mask">
              <span className="fw-rise" style={{ animationDelay: '0.08s' }}>
                {title}
              </span>
            </span>
          </h1>
          {jp && (
            <p
              lang="ja"
              className="fw-mincho text-foreground/70 fw-intro mt-4 text-2xl"
              style={{ animationDelay: '0.3s' }}
            >
              {jp}
            </p>
          )}
          <p
            className="text-foreground/80 fw-intro mt-8 max-w-xl text-lg leading-relaxed"
            style={{ animationDelay: '0.4s' }}
          >
            {intro}
          </p>
        </div>

        <div
          className="fw-intro relative flex items-end gap-5 lg:col-span-5 lg:justify-end"
          style={{ animationDelay: '0.25s' }}
        >
          <p
            aria-hidden
            lang="ja"
            className="fw-mincho text-foreground/35 hidden text-3xl tracking-[0.3em] [writing-mode:vertical-rl] lg:block"
          >
            ホタルの嫁入り
          </p>
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[var(--night)] shadow-[0_30px_70px_-35px_oklch(0.21_0.03_265/0.7)] lg:aspect-[4/5] lg:max-w-[400px] lg:rounded-t-[999px]">
            <img
              src={image}
              srcSet={srcSet(image, [640, 960], 1402)}
              sizes="(min-width: 1024px) 400px, 100vw"
              alt=""
              width={1402}
              height={1122}
              fetchPriority="high"
              className="fw-parallax absolute inset-0 h-full w-full object-cover object-center"
            />
            <FireflyField count={20} seed={9} />
          </figure>
        </div>
      </div>
    </section>
  );
}
