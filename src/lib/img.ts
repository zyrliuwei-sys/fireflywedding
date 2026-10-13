/**
 * Build a srcSet from pre-generated width variants: `foo.webp` plus
 * `foo-<w>.webp` siblings (made with cwebp, see public/imgs).
 */
export function srcSet(src: string, widths: number[], fullWidth: number) {
  const base = src.replace(/\.webp$/, '');
  return [
    ...widths.map((w) => `${base}-${w}.webp ${w}w`),
    `${src} ${fullWidth}w`,
  ].join(', ');
}
