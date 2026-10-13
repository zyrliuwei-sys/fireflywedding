import { envConfigs } from '@/config';
import { locales, localizeUrl } from '@/paraglide/runtime.js';

type Locale = (typeof locales)[number];

/** Absolute, locale-prefixed URL for a locale-free path ('/watch'). */
export function localizedUrl(path: string, locale: string): string {
  return localizeUrl(`${envConfigs.app_url}${path || '/'}`, {
    locale: locale as Locale,
  }).href;
}

/**
 * Standard head for a public page: title, description, Open Graph,
 * canonical + hreflang alternates, and optional JSON-LD.
 */
export function pageHead({
  path,
  locale,
  title,
  description,
  image = '/imgs/firefly/anime-key-visual.webp',
  jsonLd,
}: {
  path: string;
  locale: string;
  title: string;
  description: string;
  image?: string;
  jsonLd?: unknown;
}) {
  const url = localizedUrl(path, locale);
  const ogImage = `${envConfigs.app_url}${image}`;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: envConfigs.app_name },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...locales.map((loc) => ({
        rel: 'alternate',
        hrefLang: loc,
        href: localizedUrl(path, loc),
      })),
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: localizedUrl(path, 'en'),
      },
    ],
    scripts: jsonLd
      ? [{ type: 'application/ld+json', children: JSON.stringify(jsonLd) }]
      : [],
  };
}

/** BreadcrumbList JSON-LD for an inner page. */
export function breadcrumbLd(
  locale: string,
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: localizedUrl(it.path, locale),
    })),
  };
}
