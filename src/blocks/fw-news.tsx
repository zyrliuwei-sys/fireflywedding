import { Link } from '@/core/i18n/navigation';
import { NEWS } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';

const TEXT = {
  viz8: {
    title: () => m['fw.news.viz8.title'](),
    summary: () => m['fw.news.viz8.summary'](),
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
};
export function FwNews({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section
      id="news"
      className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24"
    >
      {showHeading && (
        <h2 className="fw-display text-5xl">{m['fw.news.title']()}</h2>
      )}
      <p className="text-muted-foreground mt-5 max-w-3xl leading-8">
        {m['fw.news.policy']()}
      </p>
      <ol className="mt-10 max-w-4xl divide-y border-y">
        {(full ? NEWS : NEWS.slice(0, 3)).map((n) => (
          <li key={n.id} className="grid gap-3 py-8 md:grid-cols-[140px_1fr]">
            <time dateTime={n.date} className="text-muted-foreground text-sm">
              {n.date}
            </time>
            <div>
              <h2 className="fw-display text-3xl">{TEXT[n.id].title()}</h2>
              <p className="text-foreground/75 mt-3 leading-8">
                {TEXT[n.id].summary()}
              </p>
              <a
                href={n.url}
                className="mt-4 inline-block text-sm underline underline-offset-4"
              >
                {n.source} ↗
              </a>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href={full ? '/schedule' : '/news'}
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        {full ? m['fw.nav.schedule']() : m['fw.news.full_link']()} ↗
      </Link>
    </section>
  );
}
