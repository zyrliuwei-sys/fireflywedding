import { envConfigs } from '@/config';
import { isEnglishGuide } from '@/config/guide-pages';
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
  image,
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
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      ...(image
        ? [{ property: 'og:image', content: `${envConfigs.app_url}${image}` }]
        : []),
      { property: 'og:site_name', content: envConfigs.app_name },
      {
        name: 'twitter:card',
        content: image ? 'summary_large_image' : 'summary',
      },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...(isEnglishGuide(path) ? (['en'] as const) : locales).map((loc) => ({
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
