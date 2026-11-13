import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { FwCharacters } from '@/blocks/fw-characters';
import { FwCta } from '@/blocks/fw-cta';
import { FW_FAQ, FwFaq } from '@/blocks/fw-faq';
import { FwGuide } from '@/blocks/fw-guide';
import { FwHero } from '@/blocks/fw-hero';
import { FwNews } from '@/blocks/fw-news';
import { FwStory } from '@/blocks/fw-story';
import { FwWatch } from '@/blocks/fw-watch';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/')({
  loader: () => ({ locale: getLocale() }),
  head: ({ loaderData }) => {
    const locale = (loaderData?.locale ?? 'en') as 'en';
    const head = pageHead({
      path: '/',
      locale,
      title: m['common.metadata.title']({}, { locale }),
      description: m['common.metadata.description']({}, { locale }),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: locale,
          mainEntity: FW_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q(),
            acceptedAnswer: { '@type': 'Answer', text: f.a() },
          })),
        },
      ],
    });
    return head;
  },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FwHero />
        <FwWatch />
        <FwGuide />
        <FwStory />
        <FwCharacters />
        <FwNews />
        <FwFaq />
        <FwCta />
      </main>
      <Footer />
    </div>
  );
}
