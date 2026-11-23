import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { ENGLISH_GUIDE_PATHS, isEnglishGuide } from '@/config/guide-pages';
import { baseLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { getLocalPosts } from '@/content/posts';

const STATIC_PATHS = [
  '',
  '/watch',
  '/story',
  '/characters',
  '/news',
  '/privacy-policy',
  '/terms-of-service',
  ...ENGLISH_GUIDE_PATHS,
];

type Entry = {
  path: string;
  lastModified?: string;
  changeFrequency: string;
  priority: number;
};

function urlFor(path: string, locale: string): string {
  return localizeUrl(`${envConfigs.app_url}${path || '/'}`, {
    locale: locale as (typeof locales)[number],
  }).href;
}

// One <url> per language version, each listing every alternate (Google's
// recommended hreflang form) — so /zh pages are real <loc>s that crawlers and
// the IndexNow sitemap submit pick up, not just alternates of the en page.
function entryXml(e: Entry): string {
  const entryLocales = isEnglishGuide(e.path) ? (['en'] as const) : locales;
  const alternates = [
    ...entryLocales.map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc}" href="${urlFor(e.path, loc)}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(e.path, baseLocale)}"/>`,
  ].join('\n');
  return entryLocales
    .map((loc) =>
      [
        '  <url>',
        `    <loc>${urlFor(e.path, loc)}</loc>`,
        alternates,
        e.lastModified ? `    <lastmod>${e.lastModified}</lastmod>` : null,
        `    <changefreq>${e.changeFrequency}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = STATIC_PATHS.map((path) => ({
          path,
          changeFrequency: 'weekly',
          priority: path === '' ? 1 : 0.8,
        }));

        const postDates = new Map(
          getLocalPosts(baseLocale).map((post) => [post.slug, post.createdAt])
        );
        try {
          const { listPublishedArticles } =
            await import('@/modules/posts/service');
          for (const post of await listPublishedArticles()) {
            postDates.set(post.slug, new Date(post.createdAt).toISOString());
          }
        } catch {
          // Bundled editorial posts remain available without the database.
        }
        if (postDates.size > 0) {
          entries.push({
            path: '/blog',
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
        for (const [slug, lastModified] of postDates) {
          entries.push({
            path: `/blog/${slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...entries.map(entryXml),
          '</urlset>',
          '',
        ].join('\n');

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
