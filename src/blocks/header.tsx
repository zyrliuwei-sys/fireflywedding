import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  const navLinks = [
    { href: '/watch', label: m['fw.nav.watch']() },
    { href: '/story', label: m['fw.nav.story']() },
    { href: '/characters', label: m['fw.nav.characters']() },
    { href: '/news', label: m['fw.nav.news']() },
    { href: '/about', label: m['fw.nav.about']() },
    { href: '/contact', label: m['fw.nav.contact']() },
  ];
  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['fw.logo_alt']()}
      cta={{ href: '/where-to-watch', label: m['fw.nav.cta']() }}
      banner={
        <div className="bg-foreground text-background flex min-h-9 items-center justify-center gap-3 px-4 py-2 text-xs dark:bg-[var(--night)] dark:text-white">
          <span>{m['fw.bar.slot']()}</span>
          <Link
            href="/schedule"
            className="shrink-0 underline underline-offset-4"
          >
            {m['fw.nav.schedule']()}
          </Link>
        </div>
      }
    />
  );
}
