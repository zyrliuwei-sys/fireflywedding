import type { ComponentType, ReactNode, SVGProps } from 'react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { cn } from '@/lib/utils';

export interface FooterColumn {
  title: string;
  /** external: open in a new tab. Off-site (http) hrefs always open in a new tab. */
  links: { label: string; href: string; external?: boolean }[];
}

/** Off-site URLs render as plain <a>; internal paths use the locale-aware Link. */
const isExternalHref = (href: string) => /^(https?:\/\/|mailto:)/.test(href);

export interface FooterSocial {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

export function SiteFooter({
  tagline,
  columns,
  socials,
  copyright,
  badges,
  disclaimer,
  wordmark,
}: {
  tagline?: string;
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  copyright?: string;
  /** Rendered above the socials row, e.g. admin-managed footer badges. */
  badges?: ReactNode;
  /** Small print under the bottom bar (e.g. a fan-site / trademark notice). */
  disclaimer?: string;
  /** Oversized brand wordmark set across the full width at the very bottom. */
  wordmark?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-border overflow-hidden border-t">
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-6 sm:px-10 sm:pt-16 lg:px-16">
        {tagline && (
          <p className="fw-display mb-12 max-w-3xl text-5xl sm:text-7xl">
            {tagline}
          </p>
        )}

        {columns && columns.length > 0 && (
          <div
            className={cn(
              'grid gap-x-8 gap-y-10 sm:gap-x-12',
              columns.length <= 3
                ? 'grid-cols-2 sm:grid-cols-3'
                : columns.length === 4
                  ? 'grid-cols-2 sm:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
            )}
          >
            {columns.map((col) => (
              <div key={col.title} className="space-y-5">
                <p className="text-foreground text-[13px] font-semibold tracking-wide">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {isExternalHref(link.href) ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith('mailto:')
                              ? undefined
                              : '_blank'
                          }
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {badges}

        {/* Socials row */}
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {socials && socials.length > 0 ? (
            <div className="flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon className="size-[18px]" />
                </a>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground text-sm">
            {copyright ||
              `© ${year} ${envConfigs.app_name}. All rights reserved.`}
          </span>
        </div>
        {disclaimer && (
          <p className="text-muted-foreground mt-5 max-w-3xl text-xs leading-relaxed">
            {disclaimer}
          </p>
        )}
      </div>
      {wordmark && (
        <p
          aria-hidden
          className="fw-display text-foreground/90 overflow-hidden px-4 pt-6 text-center text-[12.4vw] leading-[0.78] whitespace-nowrap select-none sm:px-6"
        >
          {wordmark}
        </p>
      )}
    </footer>
  );
}
