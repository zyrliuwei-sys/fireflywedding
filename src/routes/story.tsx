import { createFileRoute } from '@tanstack/react-router';

import { breadcrumbLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { FwPageHero } from '@/blocks/fw-page-hero';
import { FwStory } from '@/blocks/fw-story';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/story')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en';
    return pageHead({
      path: '/story',
      locale,
      title: m['fw.storypage.meta_title']({}, { locale }),
      description: m['fw.storypage.meta_desc']({}, { locale }),
      jsonLd: breadcrumbLd(locale, [
        { name: m['fw.breadcrumb.home']({}, { locale }), path: '/' },
        { name: m['fw.nav.story']({}, { locale }), path: '/story' },
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
          crumb={m['fw.nav.story']()}
          title={m['fw.storypage.title']()}
          intro={m['fw.storypage.intro']()}
          image="/imgs/generated/fw-story-masthead.webp"
        />
        <FwStory full showHeading={false} />
      </main>
      <Footer />
    </div>
  );
}
