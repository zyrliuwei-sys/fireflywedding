import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';

export function FwPageHero({
  title,
  intro,
  crumb,
  jp,
}: {
  title: string;
  intro: string;
  crumb: string;
  jp?: string;
}) {
  return (
    <section className="fw-canvas border-b">
      <div className="mx-auto max-w-[1320px] px-6 py-14 lg:px-10 lg:py-20">
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
          <Link href="/">{m['fw.breadcrumb.home']()}</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="fw-display mt-8 max-w-4xl text-[clamp(2.75rem,7vw,6rem)]">
          {title}
        </h1>
        {jp && (
          <p lang="ja" className="fw-mincho mt-4 text-xl">
            {jp}
          </p>
        )}
        <p className="text-foreground/75 mt-6 max-w-2xl text-lg leading-8">
          {intro}
        </p>
        <p className="text-muted-foreground mt-8 border-l-2 pl-4 text-xs leading-6">
          {m['fw.artwork.notice']()}
        </p>
      </div>
    </section>
  );
}
