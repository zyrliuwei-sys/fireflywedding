import { envConfigs } from '@/config';
import { OFFICIAL_ANIME_URL, OFFICIAL_MANGA_URL } from '@/config/firefly';
import { m } from '@/paraglide/messages.js';
import { SiteFooter, type FooterColumn } from '@/components/site-footer';

export function Footer() {
  const columns: FooterColumn[] = [
    {
      title: m['fw.footer.explore'](),
      links: [
        { label: m['fw.nav.watch'](), href: '/watch' },
        { label: m['fw.nav.story'](), href: '/story' },
        { label: m['fw.nav.characters'](), href: '/characters' },
        { label: m['fw.nav.news'](), href: '/news' },
        { label: m['fw.nav.episodes'](), href: '/episodes' },
        { label: m['fw.nav.schedule'](), href: '/schedule' },
        { label: m['fw.nav.platforms'](), href: '/where-to-watch' },
        { label: m['fw.nav.staff'](), href: '/staff' },
        { label: m['fw.nav.comparison'](), href: '/manga-vs-anime' },
      ],
    },
    {
      title: m['fw.footer.official'](),
      links: [
        { label: 'hotaru-anime.com', href: OFFICIAL_ANIME_URL },
        { label: 'Ura Sunday', href: OFFICIAL_MANGA_URL },
        {
          label: 'Crunchyroll',
          href: 'https://www.crunchyroll.com/search?q=Firefly%20Wedding',
        },
        { label: 'VIZ Media', href: 'https://www.viz.com/firefly-wedding' },
      ],
    },
    {
      title: m['fw.footer.legal'](),
      links: [
        { label: m['fw.nav.about'](), href: '/about' },
        { label: m['fw.nav.contact'](), href: '/contact' },
        { label: m['landing.footer.privacy'](), href: '/privacy-policy' },
        { label: m['landing.footer.terms'](), href: '/terms-of-service' },
      ],
    },
  ];

  return (
    <SiteFooter
      tagline={m['fw.footer.tagline']()}
      columns={columns}
      copyright={m['fw.footer.copyright']({
        year: String(new Date().getFullYear()),
        name: envConfigs.app_name,
      })}
      disclaimer={m['fw.footer.disclaimer']()}
      wordmark={envConfigs.app_name}
    />
  );
}
