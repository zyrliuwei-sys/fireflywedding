import { useEffect, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { nextEpisode } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { PointerParallax } from '@/components/pointer-parallax';
import { SiteHeader } from '@/components/site-header';

/** "Fri, Oct 16, 23:30 JST" in the active locale — always Tokyo time. */
export function formatJst(date: Date) {
  const text = new Intl.DateTimeFormat(
    getLocale() === 'zh' ? 'zh-CN' : 'en-US',
    {
      timeZone: 'Asia/Tokyo',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
  ).format(date);
  return `${text} JST`;
}

function EpisodeBanner() {
  // The schedule depends on "now", so resolve it after hydration only.
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const next = nextEpisode();
    setLabel(
      next
        ? m['fw.bar.next']({
            number: String(next.number).padStart(2, '0'),
            when: formatJst(next.at),
          })
        : m['fw.bar.ended']()
    );
  }, []);

  return (
    <div className="bg-foreground text-background dark:text-foreground flex h-9 items-center justify-center gap-3 px-4 text-[13px] dark:bg-[var(--night)]">
      <span className="truncate">{label ?? m['fw.bar.slot']()}</span>
      <Link
        href="/watch"
        className="text-primary-foreground bg-primary shrink-0 rounded-md px-1.5 py-px"
      >
        {m['fw.bar.link']()}
      </Link>
    </div>
  );
}

export function Header() {
  const navLinks = [
    { href: '/watch', label: m['fw.nav.watch']() },
    { href: '/story', label: m['fw.nav.story']() },
    { href: '/characters', label: m['fw.nav.characters']() },
    { href: '/news', label: m['fw.nav.news']() },
  ];

  return (
    <>
      <PointerParallax />
      <SiteHeader
        navLinks={navLinks}
        logoAlt={m['fw.logo_alt']()}
        cta={{ href: '/watch', label: m['fw.nav.cta']() }}
        banner={<EpisodeBanner />}
      />
    </>
  );
}
