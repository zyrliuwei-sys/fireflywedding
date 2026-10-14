'use client';

import { lazy, Suspense, useState } from 'react';
import type React from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import { useSession } from '@/core/auth/client';
import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { LocaleToggle } from '@/components/locale-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';

export interface NavLink {
  href: string;
  label: string;
  /** Open in a new tab. Off-site (http) hrefs always open in a new tab. */
  external?: boolean;
}

/** Off-site URLs render as plain <a>; internal paths use the locale-aware Link. */
const isExternalHref = (href: string) => /^https?:\/\//.test(href);

// The account menu (Base UI dropdown, ~130 KB) only matters once signed in,
// so it is split out of the public pages' initial bundle.
const SiteUserMenu = lazy(() =>
  import('@/components/site-user-menu').then((mod) => ({
    default: mod.SiteUserMenu,
  }))
);

export function SiteHeader({
  navLinks,
  logoAlt,
  cta,
  banner,
}: {
  navLinks?: NavLink[];
  logoAlt: string;
  /** Primary call to action — replaces the default "Get started" button. */
  cta?: { href: string; label: string };
  /** Thin announcement strip rendered above the nav bar. */
  banner?: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full">
      {banner}
      <div className="bg-background/80 border-border/60 relative flex h-14 items-center justify-between border-b pl-4 backdrop-blur-md sm:pl-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src={envConfigs.app_logo}
            alt={logoAlt}
            width={512}
            height={512}
            className="size-7 rounded-[7px] dark:ring-1 dark:ring-white/15"
          />
          <span className="text-[15px] font-semibold tracking-tight">
            {envConfigs.app_name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks?.map((link) =>
            isExternalHref(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-foreground/5 rounded px-2.5 py-1.5 text-xs tracking-[0.04em] uppercase transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                className="hover:bg-foreground/5 rounded px-2.5 py-1.5 text-xs tracking-[0.04em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden h-full items-center gap-2 pl-3 md:flex">
          <LocaleToggle />
          <ThemeToggle label={m['common.nav.toggle_theme']()} />
          {user ? (
            <Suspense fallback={<span className="size-8" />}>
              <SiteUserMenu
                name={user.name || 'User'}
                email={user.email}
                image={user.image}
              />
            </Suspense>
          ) : (
            cta && (
              <Link
                href="/sign-in"
                className="border-foreground/20 hover:bg-foreground/5 mr-2 rounded-md border px-3 py-1.5 text-xs tracking-[0.04em] uppercase transition-colors"
              >
                {m['common.nav.sign_in']()}
              </Link>
            )
          )}
          {cta ? (
            <Link
              href={cta.href}
              className="text-primary-foreground bg-primary flex h-full items-center gap-2 rounded-bl-lg px-6 text-sm tracking-[0.04em] uppercase transition-[filter] hover:brightness-95"
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            !user && (
              <Link
                href="/settings"
                className={cn(buttonVariants(), 'mr-4 gap-1.5')}
              >
                {m['common.nav.get_started']()}
                <ArrowRight className="size-4" />
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="mr-2 p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen
              ? m['common.nav.close_menu']()
              : m['common.nav.open_menu']()
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-background border-border border-b px-4 pt-2 pb-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks?.map((link) =>
              isExternalHref(link.href) ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <div className="border-border mt-3 flex items-center gap-2 border-t pt-3">
            <LocaleToggle />
            <ThemeToggle label={m['common.nav.toggle_theme']()} />
            <div className="flex-1" />
            {user ? (
              <Suspense fallback={<span className="size-8" />}>
                <SiteUserMenu
                  name={user.name || 'User'}
                  email={user.email}
                  image={user.image}
                />
              </Suspense>
            ) : (
              cta && (
                <Link
                  href="/sign-in"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                  onClick={() => setMobileOpen(false)}
                >
                  {m['common.nav.sign_in']()}
                </Link>
              )
            )}
            {cta ? (
              <Link
                href={cta.href}
                className={cn(buttonVariants(), 'gap-1.5')}
                onClick={() => setMobileOpen(false)}
              >
                {cta.label}
              </Link>
            ) : (
              !user && (
                <Link
                  href="/settings"
                  className={cn(buttonVariants(), 'gap-1.5')}
                  onClick={() => setMobileOpen(false)}
                >
                  {m['common.nav.get_started']()}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
