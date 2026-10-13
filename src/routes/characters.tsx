import { createFileRoute } from '@tanstack/react-router';

import { breadcrumbLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { FwCharacters } from '@/blocks/fw-characters';
import { FwPageHero } from '@/blocks/fw-page-hero';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/characters')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en';
    return pageHead({
      path: '/characters',
      locale,
      title: m['fw.charspage.meta_title']({}, { locale }),
      description: m['fw.charspage.meta_desc']({}, { locale }),
      jsonLd: breadcrumbLd(locale, [
        { name: m['fw.breadcrumb.home']({}, { locale }), path: '/' },
        { name: m['fw.nav.characters']({}, { locale }), path: '/characters' },
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
          crumb={m['fw.nav.characters']()}
          title={m['fw.charspage.title']()}
          intro={m['fw.charspage.intro']()}
          image="/imgs/generated/fw-character-masthead.webp"
        />
        <FwCharacters full showHeading={false} />
      </main>
      <Footer />
    </div>
  );
}
