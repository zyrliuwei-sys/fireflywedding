import { srcSet } from '@/lib/img';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

function Entry({
  title,
  body,
  dropCap = false,
}: {
  title: string;
  body: string;
  dropCap?: boolean;
}) {
  return (
    <Reveal>
      <h3 className="fw-display text-3xl sm:text-4xl">{title}</h3>
      <p
        className={
          dropCap
            ? 'text-foreground/80 mt-5 text-lg leading-[1.8] first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-[family-name:var(--font-serif-display)] first-letter:text-7xl first-letter:leading-[0.8]'
            : 'text-foreground/80 mt-5 text-base leading-[1.8] sm:text-lg'
        }
      >
        {body}
      </p>
    </Reveal>
  );
}

const STATS = [
  {
    value: () => m['fw.guide.stat.copies_value'](),
    label: () => m['fw.guide.stat.copies'](),
  },
  { value: () => '12', label: () => m['fw.guide.stat.episodes']() },
  {
    value: () => m['fw.guide.stat.premiere_value'](),
    label: () => m['fw.guide.stat.premiere'](),
  },
  {
    value: () => m['fw.guide.stat.award_value'](),
    label: () => m['fw.guide.stat.award'](),
  },
];

/** Long-form explainer: the homepage's main body copy. */
export function FwGuide() {
  return (
    <section id="guide" className="fw-canvas scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <Reveal>
          <RevealHeading className="fw-display max-w-4xl text-[clamp(2.75rem,5.5vw,4.75rem)]">
            {m['fw.guide.title']()}
          </RevealHeading>
        </Reveal>

        {/* Real figures from the sources, set as a typographic strip */}
        <dl className="border-foreground/15 mt-14 grid grid-cols-2 gap-y-8 border-t pt-8 lg:grid-cols-4">
          {STATS.map((st) => (
            <Reveal key={st.label()} className="flex flex-col pr-6">
              <dt className="text-muted-foreground order-2 mt-2 text-sm">
                {st.label()}
              </dt>
              <dd className="fw-display order-1 text-[clamp(2.75rem,5vw,4.25rem)] leading-none">
                {st.value()}
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <article className="space-y-14 lg:col-span-7">
            <Entry
              title={m['fw.guide.what.title']()}
              body={m['fw.guide.what.body']()}
              dropCap
            />
            <Entry
              title={m['fw.guide.when.title']()}
              body={m['fw.guide.when.body']()}
            />
            <Entry
              title={m['fw.guide.who.title']()}
              body={m['fw.guide.who.body']()}
            />
          </article>

          <aside className="space-y-14 lg:col-span-5">
            <Reveal>
              <figure className="overflow-hidden rounded-xl bg-[var(--night)]">
                <img
                  src="/imgs/firefly/manga-banner.webp"
                  srcSet={srcSet(
                    '/imgs/firefly/manga-banner.webp',
                    [800, 1200],
                    2000
                  )}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  alt={m['fw.guide.img_alt']()}
                  width={2000}
                  height={800}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover object-right"
                />
              </figure>
            </Reveal>
            <Entry
              title={m['fw.guide.start.title']()}
              body={m['fw.guide.start.body']()}
            />
            <Entry
              title={m['fw.guide.worth.title']()}
              body={m['fw.guide.worth.body']()}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
