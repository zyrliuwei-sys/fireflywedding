import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';

export function FwGuide() {
  return (
    <section className="fw-canvas border-y">
      <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
        <h2 className="fw-display max-w-4xl text-5xl">
          {m['fw.guide.title']()}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[
            {
              title: m['fw.guide.start.title'](),
              body: m['fw.guide.start.body'](),
              href: '/manga-vs-anime',
            },
            {
              title: m['fw.guide.who.title'](),
              body: m['fw.guide.who.body'](),
              href: '/staff',
            },
            {
              title: m['fw.nav.about'](),
              body: m['fw.guide.policy'](),
              href: '/about',
            },
          ].map((x) => (
            <div key={x.href}>
              <h3 className="fw-display text-3xl">{x.title}</h3>
              <p className="text-muted-foreground mt-4 leading-8">{x.body}</p>
              <Link
                href={x.href}
                className="mt-4 inline-block text-sm underline underline-offset-4"
              >
                {m['fw.guide.read']()} ↗
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
