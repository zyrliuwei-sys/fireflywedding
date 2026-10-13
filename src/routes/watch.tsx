import { createFileRoute } from '@tanstack/react-router';

import { breadcrumbLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { FW_FAQ, FwFaq } from '@/blocks/fw-faq';
import { FwPageHero } from '@/blocks/fw-page-hero';
import { FwWatch } from '@/blocks/fw-watch';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/watch')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en';
    return pageHead({
      path: '/watch',
      locale,
      title: m['fw.watchpage.meta_title']({}, { locale }),
      description: m['fw.watchpage.meta_desc']({}, { locale }),
      jsonLd: breadcrumbLd(locale, [
        { name: m['fw.breadcrumb.home']({}, { locale }), path: '/' },
        { name: m['fw.nav.watch']({}, { locale }), path: '/watch' },
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
          crumb={m['fw.nav.watch']()}
          title={m['fw.watchpage.title']()}
          intro={m['fw.watchpage.intro']()}
          jp="ホタルの嫁入り"
          image="/imgs/generated/fw-watch-masthead.webp"
        />
        <FwWatch full showHeading={false} />
        <FwFaq items={[FW_FAQ[0], FW_FAQ[1], FW_FAQ[5]]} />
      </main>
      <Footer />
    </div>
  );
}
