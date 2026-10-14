import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { CHARACTERS, type Character } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { FireflyField } from '@/components/firefly-field';
import { NodeCard } from '@/components/node-card';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

const ROLE: Record<string, () => string> = {
  satoko: () => m['fw.chars.satoko.role'](),
  shinpei: () => m['fw.chars.shinpei.role'](),
  kotaro: () => m['fw.chars.kotaro.role'](),
  mitsueda: () => m['fw.chars.mitsueda.role'](),
  okumura: () => m['fw.chars.okumura.role'](),
  jubei: () => m['fw.chars.jubei.role'](),
};
const BODY: Record<string, () => string> = {
  satoko: () => m['fw.chars.satoko.body'](),
  shinpei: () => m['fw.chars.shinpei.body'](),
  kotaro: () => m['fw.chars.kotaro.body'](),
  mitsueda: () => m['fw.chars.mitsueda.body'](),
  okumura: () => m['fw.chars.okumura.body'](),
  jubei: () => m['fw.chars.jubei.body'](),
};

function cvLabel(c: Character, zh: boolean) {
  return c.cv
    ? `${m['fw.chars.cv']()} ${zh ? c.cv.ja : c.cv.en}`
    : m['fw.chars.cv_tba']();
}

function LeadCard({
  c,
  seed,
  zh,
}: {
  c: Character;
  seed: number;
  zh: boolean;
}) {
  return (
    <NodeCard label={m['fw.chars.lead']()} meta={cvLabel(c, zh)} ports="none">
      <div
        className="group/spot relative flex aspect-[16/11] items-end justify-between overflow-hidden bg-[var(--night)] px-6 pt-8 text-white sm:px-10"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
        }}
      >
        {/* Pointer-follow lantern light */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
          style={{
            background:
              'radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklab, var(--glow) 22%, transparent), transparent 70%)',
          }}
        />
        <FireflyField count={18} seed={seed} />
        <span
          aria-hidden
          lang="ja"
          className="fw-mincho relative mb-6 self-center text-[clamp(6rem,12vw,10rem)] leading-none text-white/15"
        >
          {c.glyph}
        </span>
        {c.portrait ? (
          <img
            src={c.portrait}
            alt={zh ? c.ja : c.name}
            width={360}
            height={360}
            loading="lazy"
            className="relative aspect-[4/5] w-[46%] max-w-[300px] rounded-t-full object-cover object-top shadow-[0_-10px_40px_-10px_color-mix(in_oklab,var(--glow)_35%,transparent)]"
          />
        ) : (
          <span
            aria-hidden
            lang="ja"
            className="fw-mincho relative mb-6 text-[clamp(6rem,12vw,10rem)] leading-none text-white/90"
          >
            {c.glyph}
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {zh && c.ja ? (
            <>
              <h3 lang="ja" className="fw-mincho text-4xl">
                {c.ja}
              </h3>
              <span className="text-muted-foreground">{c.name}</span>
            </>
          ) : (
            <>
              <h3 className="fw-display text-4xl">{c.name}</h3>
              <span lang="ja" className="fw-mincho text-muted-foreground">
                {c.ja}
              </span>
            </>
          )}
        </div>
        <p className="mt-2 text-sm font-medium text-[var(--ai)]">
          {ROLE[c.id]?.()}
        </p>
        <p className="text-foreground/75 mt-4 text-base leading-relaxed">
          {BODY[c.id]?.()}
        </p>
      </div>
    </NodeCard>
  );
}

function SupportCard({ c, zh }: { c: Character; zh: boolean }) {
  return (
    <div className="bg-card relative h-full overflow-hidden rounded-xl border p-5">
      <span
        aria-hidden
        lang="ja"
        className="fw-mincho text-foreground/[0.07] pointer-events-none absolute -top-3 -right-1 text-[7rem] leading-none"
      >
        {c.glyph}
      </span>
      <p className="text-muted-foreground relative text-xs">{cvLabel(c, zh)}</p>
      {zh && c.ja ? (
        <>
          <h3 lang="ja" className="fw-mincho relative mt-6 text-3xl">
            {c.ja}
          </h3>
          <p className="text-muted-foreground relative mt-1 text-sm">
            {c.name}
          </p>
        </>
      ) : (
        <>
          <h3 className="fw-display relative mt-6 text-3xl">{c.name}</h3>
          {c.ja && (
            <p
              lang="ja"
              className="fw-mincho text-muted-foreground relative mt-1 text-sm"
            >
              {c.ja}
            </p>
          )}
        </>
      )}
      <p className="relative mt-3 text-sm font-medium text-[var(--ai)]">
        {ROLE[c.id]?.()}
      </p>
      <p className="text-foreground/70 relative mt-2 text-sm leading-relaxed">
        {BODY[c.id]?.()}
      </p>
    </div>
  );
}

/** Character index. `full` adds the voice cast table. */
export function FwCharacters({
  full = false,
  showHeading = true,
}: {
  full?: boolean;
  showHeading?: boolean;
}) {
  const zh = getLocale() === 'zh';
  const leads = CHARACTERS.filter((c) => c.lead);
  const support = CHARACTERS.filter((c) => !c.lead);

  return (
    <section id="characters" className="fw-canvas scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        {showHeading && (
          <Reveal className="max-w-3xl">
            <RevealHeading className="fw-display text-[clamp(2.75rem,5.5vw,4.75rem)]">
              {m['fw.chars.title']()}
            </RevealHeading>
            <p className="text-foreground/75 mt-5 text-lg">
              {m['fw.chars.subtitle']()}
            </p>
          </Reveal>
        )}

        <div className="mt-14 grid gap-x-6 gap-y-10 lg:grid-cols-2">
          {leads.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <LeadCard c={c} seed={31 + i} zh={zh} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((c, i) => (
            <Reveal key={c.id} delay={i * 60} className="h-full">
              <SupportCard c={c} zh={zh} />
            </Reveal>
          ))}
        </div>

        {!full && (
          <Link
            href="/characters"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            {m['fw.chars.full_link']()}
            <ArrowRight className="size-4" />
          </Link>
        )}

        {full && (
          <div className="mt-28 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <RevealHeading className="fw-display text-[clamp(2.5rem,5vw,4rem)] lg:col-span-4">
              {m['fw.charspage.cast_title']()}
            </RevealHeading>
            <table className="w-full text-left text-sm sm:text-base lg:col-span-8">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="pb-4 font-normal">
                    {m['fw.charspage.character']()}
                  </th>
                  <th className="pb-4 font-normal">
                    {m['fw.charspage.actor']()}
                  </th>
                </tr>
              </thead>
              <tbody className="border-t">
                {CHARACTERS.map((c) => (
                  <tr key={c.id}>
                    <td className="pt-4 pr-6 font-medium">
                      {c.name}
                      {c.ja && (
                        <span
                          lang="ja"
                          className="fw-mincho text-muted-foreground ml-3 text-sm"
                        >
                          {c.ja}
                        </span>
                      )}
                    </td>
                    <td className="pt-4">
                      {c.cv ? (
                        <>
                          {c.cv.en}
                          {c.cv.ja !== c.cv.en && (
                            <span
                              lang="ja"
                              className="text-muted-foreground ml-2 text-sm"
                            >
                              {c.cv.ja}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-muted-foreground">
                          {m['fw.chars.cv_tba']()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
