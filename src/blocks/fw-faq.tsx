import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { RevealHeading } from '@/components/reveal-heading';

export const FW_FAQ = [
  { q: () => m['fw.faq.q1'](), a: () => m['fw.faq.a1']() },
  { q: () => m['fw.faq.q2'](), a: () => m['fw.faq.a2']() },
  { q: () => m['fw.faq.q3'](), a: () => m['fw.faq.a3']() },
  { q: () => m['fw.faq.q4'](), a: () => m['fw.faq.a4']() },
  { q: () => m['fw.faq.q5'](), a: () => m['fw.faq.a5']() },
  { q: () => m['fw.faq.q6'](), a: () => m['fw.faq.a6']() },
];

/** FAQ rendered open (not an accordion) so every answer is readable and indexable. */
export function FwFaq({ items = FW_FAQ }: { items?: typeof FW_FAQ }) {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <RevealHeading className="fw-display text-[clamp(2.75rem,5.5vw,4.75rem)]">
          {m['fw.faq.title']()}
        </RevealHeading>
        <dl className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <dt className="text-xl font-semibold tracking-tight">
                {item.q()}
              </dt>
              <dd className="text-foreground/75 mt-3 text-base leading-relaxed">
                {item.a()}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
