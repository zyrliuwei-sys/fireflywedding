import { localeNames } from '@/config/locale';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { getLocale, locales, setLocale } from '@/paraglide/runtime.js';

/** Two-locale switch as a plain button — no dropdown in the public bundle. */
export function LocaleToggle({ className }: { className?: string }) {
  const current = getLocale();
  const next = locales.find((l) => l !== current) ?? current;

  return (
    <button
      type="button"
      lang={next}
      onClick={() => setLocale(next)}
      title={m['common.nav.switch_language']()}
      className={cn(
        'hover:bg-foreground/5 rounded px-2.5 py-1.5 text-xs transition-colors',
        className
      )}
    >
      {localeNames[next] ?? next}
    </button>
  );
}
