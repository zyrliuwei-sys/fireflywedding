import { lazy, Suspense, type ComponentType } from 'react';
import { notFound, useLoaderData } from '@tanstack/react-router';

import { isEnglishGuide } from '@/config/guide-pages';
import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { baseLocale, getLocale } from '@/paraglide/runtime.js';

type PageMeta = {
  title: string;
  description: string;
  updated_at: string;
};

// Page metadata is bundled eagerly (loader/head need it synchronously); the
// MDX bodies are split into their own chunks and loaded on demand, so the
// legal text isn't part of every page's entry JS. Keys are absolute from the
// project root.
const metas = import.meta.glob<PageMeta>('/src/content/pages/*.mdx', {
  eager: true,
  import: 'meta',
});
const bodies = import.meta.glob<ComponentType>('/src/content/pages/*.mdx', {
  import: 'default',
});

function pageKey(slug: string, locale: string): string | null {
  const own = `/src/content/pages/${slug}.${locale}.mdx`;
  if (metas[own]) return own;
  const base = `/src/content/pages/${slug}.${baseLocale}.mdx`;
  return metas[base] ? base : null;
}

const lazyBodies = new Map<string, ComponentType>();
function pageBody(key: string): ComponentType {
  let Body = lazyBodies.get(key);
  if (!Body) {
    Body = lazy(async () => ({ default: await bodies[key]() }));
    lazyBodies.set(key, Body);
  }
  return Body;
}

type LoaderData = { meta: PageMeta; slug: string; locale: string };

// Shared route options for static MDX pages. Each page gets its own
// explicit route file (e.g. privacy-policy.tsx) so static segments
// always outrank dynamic ones — add a new page by creating the MDX
// content plus a thin route file using this factory.
export function staticPageRouteOptions(slug: string, path = `/${slug}`) {
  return {
    loader: (): LoaderData => {
      const locale = isEnglishGuide(path) ? 'en' : getLocale();
      const key = pageKey(slug, locale);
      if (!key) throw notFound();
      return { meta: metas[key], slug, locale };
    },
    head: ({ loaderData }: { loaderData?: LoaderData }) => {
      if (!loaderData) return {};
      const { meta, locale } = loaderData;
      return pageHead({
        path,
        locale,
        title: meta.title,
        description: meta.description,
      });
    },
    component: StaticPage,
  };
}

export function StaticPage() {
  const { meta, slug, locale } = useLoaderData({
    strict: false,
  }) as LoaderData;

  const Content = pageBody(pageKey(slug, locale)!);

  return (
    <article>
      <header className="border-border mb-6 border-b pb-5">
        <h1 className="fw-display text-foreground text-4xl tracking-tight md:text-5xl">
          {/* The "| Site" suffix belongs in <title>, not the heading. */}
          {meta.title.split(' | ')[0]}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">{meta.description}</p>
        <p className="text-muted-foreground mt-2 text-xs">
          {m['common.pages.last_updated']()}: {meta.updated_at}
        </p>
      </header>
      <div className="fw-information text-foreground/90 text-[15px] leading-7">
        <Suspense fallback={null}>
          <Content />
        </Suspense>
      </div>
    </article>
  );
}
