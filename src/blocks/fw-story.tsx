import { Link } from '@/core/i18n/navigation';
import {
  OFFICIAL_ANIME_URL,
  OFFICIAL_STAFF_URL,
  STAFF,
} from '@/config/firefly';
import { m } from '@/paraglide/messages.js';

const LABEL = {
  original: () => m['fw.staff.original'](),
  studio: () => m['fw.staff.studio'](),
  director: () => m['fw.staff.director'](),
  composition: () => m['fw.staff.composition'](),
  design: () => m['fw.staff.design'](),
};
export function FwStory({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  return (
    <section
      id="story"
      className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24"
    >
      {showHeading && (
        <h2 className="fw-display text-5xl">{m['fw.story.title']()}</h2>
      )}
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-foreground/85 text-xl leading-9">
            {m['fw.story.premise']()}
          </p>
          <a
            href={OFFICIAL_ANIME_URL + 'story/'}
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            {m['fw.source']()} ↗
          </a>
        </div>
        <div>
          <h2 className="fw-display text-3xl">
            {m['fw.story.reading_title']()}
          </h2>
          <p className="text-muted-foreground mt-4 leading-8">
            {m['fw.story.reading_body']()}
          </p>
          <Link
            href="/manga-vs-anime"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            {m['fw.nav.comparison']()} ↗
          </Link>
        </div>
      </div>
      {full && (
        <div className="mt-14 border-t pt-8">
          <h2 className="fw-display text-4xl">{m['fw.staff.title']()}</h2>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {STAFF.map((s) => (
              <div key={s.key}>
                <dt className="text-muted-foreground text-sm">
                  {LABEL[s.key]()}
                </dt>
                <dd className="mt-1">{s.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={OFFICIAL_STAFF_URL}
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            {m['fw.staff.source']()} ↗
          </a>
          <Link
            href="/staff"
            className="ml-6 text-sm underline underline-offset-4"
          >
            {m['fw.nav.staff']()}
          </Link>
        </div>
      )}
      {!full && (
        <Link
          href="/story"
          className="mt-8 inline-block text-sm underline underline-offset-4"
        >
          {m['fw.story.full_link']()} ↗
        </Link>
      )}
    </section>
  );
}
