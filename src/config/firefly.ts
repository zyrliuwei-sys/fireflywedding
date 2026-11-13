/** Facts checked against linked primary sources on 2026-11-13. No inferred episode dates. */
export const CHECKED_AT = '2026-11-13';
export const OFFICIAL_ANIME_URL = 'https://hotaru-anime.com/';
export const OFFICIAL_MANGA_URL = 'https://urasunday.com/title/2169';
export const OFFICIAL_CHARACTER_URL = 'https://hotaru-anime.com/character/';
export const OFFICIAL_ONAIR_URL = 'https://hotaru-anime.com/onair/';
export const OFFICIAL_STAFF_URL = 'https://hotaru-anime.com/#castStaff';
export const OFFICIAL_EPISODES_URL = 'https://hotaru-anime.com/episodes/';
export const OFFICIAL_BROADCASTER_URL =
  'https://www.fujitv.co.jp/b_hp/hotaru-anime/';
export const VIZ_URL = 'https://www.viz.com/firefly-wedding';
export const VIZ_VOL8_URL =
  'https://www.viz.com/manga-books/manga/firefly-wedding-volume-8-0/product/9040';
export const STUDIO_NEWS_URL = 'https://davidproduction.jp/news/detail/?id=13';
export const PREMIERE_JST = '2026-10-09T23:30:00+09:00';
export type Character = {
  id: string;
  slug: string;
  name: string;
  ja: string;
  glyph: string;
  cv?: { en: string; ja: string };
  lead?: boolean;
};
export const CHARACTERS: Character[] = [
  {
    id: 'satoko',
    slug: 'satoko-kirigaya',
    name: 'Satoko Kirigaya',
    ja: '桐ヶ谷紗都子',
    glyph: '紗',
    cv: { en: 'Lynn', ja: 'Lynn' },
    lead: true,
  },
  {
    id: 'shinpei',
    slug: 'shinpei-goto',
    name: 'Shinpei Gotō',
    ja: '後藤進平',
    glyph: '進',
    cv: { en: 'Kōki Uchiyama', ja: '内山昂輝' },
    lead: true,
  },
  {
    id: 'kotaro',
    slug: 'kotaro-ogawa',
    name: 'Kōtarō Ogawa',
    ja: '小川康太郎',
    glyph: '康',
    cv: { en: 'Kento Itō', ja: '伊東健人' },
  },
  {
    id: 'mitsueda',
    slug: 'mitsueda',
    name: 'Mitsueda',
    ja: '三枝',
    glyph: '三',
    cv: { en: 'Kenjirō Tsuda', ja: '津田健次郎' },
  },
  {
    id: 'okumura',
    slug: 'mitsuharu-okumura',
    name: 'Mitsuharu Okumura',
    ja: '',
    glyph: '奥',
  },
  {
    id: 'jubei',
    slug: 'jubei-kirigaya',
    name: 'Jūbei Kirigaya',
    ja: '桐ヶ谷十兵衛',
    glyph: '桐',
    cv: { en: 'Kazuhiro Yamaji', ja: '山路和弘' },
  },
];
export const READ_LINKS = [
  { id: 'urasunday', name: 'Ura Sunday', url: OFFICIAL_MANGA_URL },
  { id: 'viz', name: 'VIZ Media', url: VIZ_URL },
] as const;
export const NEWS = [
  { id: 'viz8', date: '2026-10-13', source: 'VIZ Media', url: VIZ_VOL8_URL },
  {
    id: 'ep1',
    date: '2026-10-09',
    source: 'Official broadcast information',
    url: OFFICIAL_ONAIR_URL,
  },
  {
    id: 'op',
    date: '2026-09-18',
    source: 'Official anime announcement',
    url: 'https://hotaru-anime.com/news/91/',
  },
  {
    id: 'cast2',
    date: '2026-08-02',
    source: 'david production',
    url: STUDIO_NEWS_URL,
  },
] as const;
export const STAFF = [
  { key: 'original', value: 'Oreco Tachibana · 橘オレコ' },
  { key: 'studio', value: 'david production' },
  { key: 'director', value: 'Takahiro Kamei · 亀井隆広' },
  { key: 'composition', value: 'Yūko Kakihara · 柿原優子' },
  { key: 'design', value: 'Yukiko Aikei · 愛敬由紀子' },
] as const;
