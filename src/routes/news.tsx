import { createFileRoute } from '@tanstack/react-router';

import { breadcrumbLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { FwNews } from '@/blocks/fw-news';
import { FwPageHero } from '@/blocks/fw-page-hero';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/news')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en';
    return pageHead({
      path: '/news',
      locale,
      title: m['fw.newspage.meta_title']({}, { locale }),
      description: m['fw.newspage.meta_desc']({}, { locale }),
      jsonLd: breadcrumbLd(locale, [
        { name: m['fw.breadcrumb.home']({}, { locale }), path: '/' },
        { name: m['fw.nav.news']({}, { locale }), path: '/news' },
      ]),
    });
  },
  component: Page,
});

function Page() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FwPageHero
          crumb={m['fw.nav.news']()}
          title={m['fw.newspage.title']()}
          intro={m['fw.newspage.intro']()}
        />
        <FwNews full showHeading={false} />
      </main>
      <Footer />
    </div>
  );
}
