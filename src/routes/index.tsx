import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import {
  CHARACTERS,
  EPISODE_COUNT,
  OFFICIAL_ANIME_URL,
  PREMIERE_JST,
} from '@/config/firefly';
import { srcSet } from '@/lib/img';
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
          '@type': 'TVSeries',
          name: 'Firefly Wedding',
          alternateName: ['ホタルの嫁入り', 'Hotaru no Yomeiri', '萤火之嫁'],
          startDate: PREMIERE_JST.slice(0, 10),
          numberOfEpisodes: EPISODE_COUNT,
          genre: ['Historical', 'Romance'],
          productionCompany: {
            '@type': 'Organization',
            name: 'david production',
          },
          director: { '@type': 'Person', name: 'Takahiro Kamei' },
          actor: CHARACTERS.filter((c) => c.cv).map((c) => ({
            '@type': 'Person',
            name: c.cv!.en,
          })),
          sameAs: [OFFICIAL_ANIME_URL],
          image: `${envConfigs.app_url}/imgs/firefly/anime-key-visual.webp`,
        },
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
    return {
      ...head,
      links: [
        {
          rel: 'preload',
          as: 'image',
          // Must mirror the hero <img> srcSet/sizes or the preload is wasted.
          imageSrcSet: srcSet(
            '/imgs/firefly/anime-poster.webp',
            [480, 840],
            990
          ),
          imageSizes:
            '(min-width: 1280px) 420px, (min-width: 640px) 60vw, 100vw',
          fetchPriority: 'high',
        },
        ...head.links,
      ],
    };
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
