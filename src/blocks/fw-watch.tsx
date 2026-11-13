import { Link } from '@/core/i18n/navigation';
import { OFFICIAL_ONAIR_URL, READ_LINKS } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';

export function FwWatch({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section
      id="watch"
      className="mx-auto max-w-[1320px] scroll-mt-24 px-6 py-16 lg:px-10 lg:py-24"
    >
      {showHeading && (
        <h2 className="fw-display max-w-3xl text-5xl">
          {m['fw.watch.title']()}
        </h2>
      )}
      <p className="text-foreground/75 mt-6 max-w-3xl text-lg leading-8">
        {m['fw.watch.verified']()}
      </p>
      <a
        href={OFFICIAL_ONAIR_URL}
        className="mt-5 inline-block text-sm underline underline-offset-4"
      >
        {m['fw.source']()} ↗
      </a>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            href: '/where-to-watch',
            title: m['fw.nav.platforms'](),
            body: m['fw.watch.platform_guide'](),
          },
          {
            href: '/episodes',
            title: m['fw.nav.episodes'](),
            body: m['fw.watch.episode_guide'](),
          },
          {
            href: '/schedule',
            title: m['fw.nav.schedule'](),
            body: m['fw.watch.time_guide'](),
          },
        ].map((x) => (
          <Link
            href={x.href}
            key={x.href}
            className="bg-card hover:border-foreground/40 block rounded-xl border p-6"
          >
            <h3 className="fw-display text-3xl">{x.title} ↗</h3>
            <p className="text-muted-foreground mt-4 text-sm leading-7">
              {x.body}
            </p>
          </Link>
        ))}
      </div>
      {full && (
        <div className="mt-14 border-t pt-8">
          <h2 className="fw-display text-4xl">{m['fw.watch.read_title']()}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
            {m['fw.watch.external_only']()}
          </p>
          <div className="mt-5 flex flex-wrap gap-6">
            {READ_LINKS.map((x) => (
              <a
                key={x.id}
                href={x.url}
                className="underline underline-offset-4"
              >
                {x.name} ↗
              </a>
            ))}
            <Link
              href="/manga-vs-anime"
              className="underline underline-offset-4"
            >
              {m['fw.nav.comparison']()}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
