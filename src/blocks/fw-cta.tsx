import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { srcSet } from '@/lib/img';
import { m } from '@/paraglide/messages.js';
import { FireflyField } from '@/components/firefly-field';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

export function FwCta() {
  return (
    <section className="bg-background px-4 pb-12 sm:px-6 lg:px-10">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-xl bg-[var(--night)] text-white dark:ring-1 dark:ring-white/10">
        <img
          src="/imgs/generated/fw-cta-firefly-path.webp"
          srcSet={srcSet(
            '/imgs/generated/fw-cta-firefly-path.webp',
            [960, 1440],
            1891
          )}
          sizes="100vw"
          alt=""
          width={1891}
          height={831}
          loading="lazy"
          className="fw-parallax absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)] via-[var(--night)]/70 to-transparent" />
        <FireflyField count={30} seed={44} />
        <Reveal className="relative max-w-3xl px-6 py-20 sm:px-12 sm:py-28">
          <RevealHeading className="fw-display text-[clamp(2.75rem,6.5vw,5.5rem)]">
            {m['fw.cta.title']()}
          </RevealHeading>
          <p className="mt-8 max-w-lg text-base text-white/80 sm:text-lg">
            {m['fw.cta.body']()}
          </p>
          <Link
            href="/watch#episodes"
            className="bg-primary text-primary-foreground mt-10 inline-flex items-center gap-3 rounded-lg px-6 py-3.5 text-base font-medium whitespace-nowrap transition-[filter] hover:brightness-95"
          >
            {m['fw.cta.button']()}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
