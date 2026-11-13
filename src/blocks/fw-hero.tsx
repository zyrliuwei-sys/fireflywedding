import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { OFFICIAL_ONAIR_URL, OFFICIAL_STAFF_URL } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';
import { FireflyField } from '@/components/firefly-field';

export function FwHero() {
  return (
    <section className="fw-canvas overflow-hidden border-b">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-16 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:px-10 lg:py-24">
        <div>
          <p className="fw-label text-muted-foreground">
            {m['fw.hero.eyebrow']()}
          </p>
          <h1 className="fw-display mt-8 text-[clamp(4rem,9vw,8rem)]">
            {envConfigs.app_name}
          </h1>
          <p className="text-foreground/75 mt-8 max-w-xl text-lg leading-8">
            {m['fw.hero.subtitle']()}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/where-to-watch"
              className="bg-primary text-primary-foreground rounded-lg px-5 py-3 font-medium"
            >
              {m['fw.hero.cta_watch']()}
            </Link>
            <Link href="/story" className="rounded-lg border px-5 py-3">
              {m['fw.hero.cta_story']()}
            </Link>
          </div>
        </div>
        <aside className="relative overflow-hidden rounded-t-[160px] border bg-[var(--night)] px-8 pt-20 pb-10 text-white">
          <FireflyField count={18} seed={3} />
          <div className="relative">
            <p className="fw-label text-white/60">{m['fw.node.onair']()}</p>
            <p className="fw-display mt-5 text-6xl">23:30 JST</p>
            <p className="mt-3 text-sm text-white/80">{m['fw.bar.slot']()}</p>
            <a
              href={OFFICIAL_ONAIR_URL}
              className="mt-4 inline-block text-sm underline underline-offset-4"
            >
              {m['fw.source']()} ↗
            </a>
            <p className="mt-8 border-t border-white/20 pt-6 text-sm">
              david production · Lynn · Kōki Uchiyama
            </p>
            <a
              href={OFFICIAL_STAFF_URL}
              className="mt-3 inline-block text-xs underline underline-offset-4"
            >
              {m['fw.staff.source']()} ↗
            </a>
            <p className="mt-10 text-xs leading-6 text-white/60">
              {m['fw.artwork.notice']()}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
