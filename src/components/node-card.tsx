import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * A "node" on the canvas: a small uppercase type label + spaced meta label
 * above a rounded panel, with optional connector ports on either side.
 */
export function NodeCard({
  label,
  meta,
  ports = 'both',
  className,
  panelClassName,
  style,
  children,
}: {
  label: string;
  meta?: string;
  ports?: 'left' | 'right' | 'both' | 'none';
  className?: string;
  panelClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={cn('relative', className)} style={style}>
      <div className="mb-2.5 flex h-3.5 items-center gap-5 px-0.5">
        <span className="text-[11px] leading-none font-bold tracking-wide uppercase">
          {label}
        </span>
        {meta && (
          <span className="fw-label text-foreground/70 truncate">{meta}</span>
        )}
      </div>
      <div
        className={cn(
          'bg-card relative overflow-hidden rounded-xl shadow-[0_1px_2px_rgb(0_0_0/0.06),0_12px_32px_-12px_rgb(20_20_40/0.18)] dark:ring-1 dark:ring-white/10',
          panelClassName
        )}
      >
        {children}
      </div>
      {(ports === 'left' || ports === 'both') && <Port side="left" />}
      {(ports === 'right' || ports === 'both') && <Port side="right" />}
    </div>
  );
}

function Port({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'border-foreground/25 bg-background absolute top-[calc(50%+12px)] z-10 size-3 -translate-y-1/2 rounded-full border',
        side === 'left' ? '-left-1.5' : '-right-1.5'
      )}
    />
  );
}
