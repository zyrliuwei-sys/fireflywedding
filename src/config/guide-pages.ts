/** New information pages are English only; do not create locale mirrors. */
export const ENGLISH_GUIDE_PATHS = [
  '/about',
  '/contact',
  '/episodes',
  '/staff',
  '/manga-vs-anime',
  '/where-to-watch',
  '/schedule',
  '/characters/satoko-kirigaya',
  '/characters/shinpei-goto',
  '/characters/kotaro-ogawa',
  '/characters/mitsueda',
  '/characters/mitsuharu-okumura',
  '/characters/jubei-kirigaya',
] as const;

export function isEnglishGuide(path: string) {
  const normalized = path.replace(/^\/zh(?=\/|$)/, '').replace(/\/$/, '');
  return (
    normalized === '/blog' ||
    normalized.startsWith('/blog/') ||
    (ENGLISH_GUIDE_PATHS as readonly string[]).includes(normalized)
  );
}
