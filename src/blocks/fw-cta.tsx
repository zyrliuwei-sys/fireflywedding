import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';

export function FwCta() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-[1240px] rounded-xl bg-[var(--night)] p-8 text-white sm:p-14">
        <h2 className="fw-display text-5xl">{m['fw.cta.title']()}</h2>
        <p className="mt-6 max-w-2xl leading-8 text-white/75">
          {m['fw.cta.body']()}
        </p>
        <Link
          href="/episodes"
          className="bg-primary text-primary-foreground mt-8 inline-block rounded-lg px-5 py-3"
        >
          {m['fw.cta.button']()}
        </Link>
      </div>
    </section>
  );
}
