/**
 * Firefly Wedding (ホタルの嫁入り) fan-hub data.
 *
 * Facts only: names, dates, links. Every user-facing sentence lives in
 * messages/{en,zh}.json under `fw.*` and is looked up by the blocks.
 * Sources: hotaru-anime.com, Anime News Network, Wikipedia, Real Sound,
 * Screen Rant, LiveChart (checked 2026-10-14).
 */

export const OFFICIAL_ANIME_URL = 'https://hotaru-anime.com/';
export const OFFICIAL_MANGA_URL = 'https://urasunday.com/title/2169';

/** First broadcast: Fri 2026-10-09 23:30 JST (Fuji TV "Noitamina"). */
export const PREMIERE_JST = '2026-10-09T23:30:00+09:00';
export const EPISODE_COUNT = 12; // listed by AnimeSchedule/LiveChart, provisional
export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Air time of episode `n` (1-based), weekly from the premiere. */
export function episodeAirDate(n: number): Date {
  return new Date(new Date(PREMIERE_JST).getTime() + (n - 1) * WEEK_MS);
}

/** Next episode that has not aired yet, or null once the season is over. */
export function nextEpisode(now: Date = new Date()) {
  for (let n = 1; n <= EPISODE_COUNT; n++) {
    const at = episodeAirDate(n);
    if (at.getTime() > now.getTime()) return { number: n, at };
  }
  return null;
}

/** Episode titles announced so far (others are TBA). */
export const EPISODE_TITLES: Record<number, { en: string; ja: string }> = {
  1: { en: 'An Unwanted Repayment', ja: '望まない恩返し' },
};

export type WatchPlatform = {
  id: string;
  name: string;
  /** i18n key suffix under `fw.watch.platform.<id>` */
  url: string;
  region: 'global' | 'jp' | 'asia';
  featured?: boolean;
};

/**
 * Where to watch. Japanese streaming lineups came from pre-air reports and
 * vary by source; the UI tells viewers to confirm on each platform. Search
 * URLs are used where we have no verified series page.
 */
export const WATCH_PLATFORMS: WatchPlatform[] = [
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    url: 'https://www.crunchyroll.com/search?q=Firefly%20Wedding',
    region: 'global',
    featured: true,
  },
  {
    id: 'noitamina',
    name: 'Fuji TV · Noitamina',
    url: OFFICIAL_ANIME_URL,
    region: 'jp',
  },
  { id: 'atx', name: 'AT-X', url: 'https://www.at-x.com/', region: 'jp' },
  {
    id: 'abema',
    name: 'ABEMA',
    url: 'https://abema.tv/search?q=%E3%83%9B%E3%82%BF%E3%83%AB%E3%81%AE%E5%AB%81%E5%85%A5%E3%82%8A',
    region: 'jp',
  },
  { id: 'tver', name: 'TVer', url: 'https://tver.jp/', region: 'jp' },
  {
    id: 'netflix',
    name: 'Netflix',
    url: 'https://www.netflix.com/search?q=%E3%83%9B%E3%82%BF%E3%83%AB%E3%81%AE%E5%AB%81%E5%85%A5%E3%82%8A',
    region: 'jp',
  },
  {
    id: 'prime',
    name: 'Prime Video',
    url: 'https://www.amazon.co.jp/s?k=%E3%83%9B%E3%82%BF%E3%83%AB%E3%81%AE%E5%AB%81%E5%85%A5%E3%82%8A&i=instant-video',
    region: 'jp',
  },
  {
    id: 'unext',
    name: 'U-NEXT',
    url: 'https://video.unext.jp/freeword?query=%E3%83%9B%E3%82%BF%E3%83%AB%E3%81%AE%E5%AB%81%E5%85%A5%E3%82%8A',
    region: 'jp',
  },
  {
    id: 'muse',
    name: 'Muse Asia',
    url: 'https://www.youtube.com/@MuseAsia',
    region: 'asia',
  },
];

export const READ_LINKS = [
  { id: 'urasunday', name: 'Ura Sunday', url: OFFICIAL_MANGA_URL },
  {
    id: 'viz',
    name: 'VIZ Media',
    url: 'https://www.viz.com/search?search=firefly%20wedding',
  },
  { id: 'comikey', name: 'Comikey', url: 'https://comikey.com/' },
] as const;

export type Character = {
  id: string;
  name: string;
  /** Japanese name; empty when not confirmed by a source. */
  ja: string;
  /** Glyph used as the typographic portrait. */
  glyph: string;
  /** Verified official anime character portrait. */
  portrait?: string;
  cv?: { en: string; ja: string };
  lead?: boolean;
};

export const CHARACTERS: Character[] = [
  {
    id: 'satoko',
    portrait: '/imgs/firefly/satoko-portrait.webp',
    name: 'Satoko Kirigaya',
    ja: '桐ヶ谷 紗都子',
    glyph: '紗',
    cv: { en: 'Lynn', ja: 'Lynn' },
    lead: true,
  },
  {
    id: 'shinpei',
    portrait: '/imgs/firefly/shinpei-portrait.webp',
    name: 'Shinpei Gotō',
    ja: '後藤 進平',
    glyph: '進',
    cv: { en: 'Kōki Uchiyama', ja: '内山昂輝' },
    lead: true,
  },
  {
    id: 'kotaro',
    name: 'Kōtarō Ogawa',
    ja: '小川 康太郎',
    glyph: '康',
    cv: { en: 'Kento Itō', ja: '伊東健人' },
  },
  {
    id: 'mitsueda',
    name: 'Mitsueda',
    ja: '三枝',
    glyph: '三',
    cv: { en: 'Kenjirō Tsuda', ja: '津田健次郎' },
  },
  { id: 'okumura', name: 'Mitsuharu Okumura', ja: '', glyph: '奥' },
  { id: 'jubei', name: 'Jūbei Kirigaya', ja: '', glyph: '桐' },
];

export type NewsItem = {
  id: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  source: string;
  url: string;
  upcoming?: boolean;
  /** Only the month is known: render as "Sep 2026". */
  monthOnly?: boolean;
};

/** Newest first. Titles/summaries: `fw.news.<id>.title|summary`. */
export const NEWS: NewsItem[] = [
  {
    id: 'vol13',
    date: '2026-10-19',
    source: 'Shogakukan',
    url: OFFICIAL_MANGA_URL,
    upcoming: true,
  },
  {
    id: 'viz8',
    date: '2026-10-13',
    source: 'VIZ Media',
    url: 'https://www.viz.com/search?search=firefly%20wedding',
  },
  {
    id: 'choitashi',
    date: '2026-10-12',
    source: 'LiveChart',
    url: 'https://www.livechart.me/anime/13863',
  },
  {
    id: 'drama',
    date: '2026-10-10',
    source: 'Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Firefly_Wedding',
  },
  {
    id: 'ep1',
    date: '2026-10-09',
    source: 'Screen Rant',
    url: 'https://screenrant.com/firefly-wedding-episode-1-review-crunchyroll/',
  },
  {
    id: 'op',
    date: '2026-09-01',
    monthOnly: true,
    source: 'Real Sound',
    url: 'https://realsound.jp/2026/09/post-2528359.html',
  },
  {
    id: 'cast2',
    date: '2026-08-02',
    source: 'Anime News Network',
    url: 'https://www.animenewsnetwork.com/news/2026-08-02/firefly-wedding-tv-anime-reveals-more-cast-october-9-debut-ending-theme-in-new-teaser-video/.240192',
  },
  {
    id: 'cast1',
    date: '2026-03-25',
    source: 'Anime News Network',
    url: 'https://www.animenewsnetwork.com/news/2026-03-25/firefly-wedding-anime-teaser-unveils-main-cast-more-staff/.235719',
  },
  {
    id: 'announce',
    date: '2026-01-12',
    source: 'eeo Media',
    url: 'https://eeo.today/media/2026/01/15/303077/',
  },
];

/** Production credits: proper nouns, shown untranslated. */
export const STAFF: { key: string; value: string }[] = [
  { key: 'original', value: 'Oreco Tachibana · 橘オレコ' },
  { key: 'studio', value: 'david production' },
  { key: 'director', value: 'Takahiro Kamei · 亀井隆広' },
  { key: 'composition', value: 'Yūko Kakihara · 柿原優子' },
  { key: 'design', value: 'Yukiko Aikei · 愛敬由紀子' },
  { key: 'music', value: 'Nogrid' },
  { key: 'op', value: 'iri, “Period”' },
  { key: 'ed', value: 'TOOBOE, “夢心地 (Yumegokochi)”' },
];
