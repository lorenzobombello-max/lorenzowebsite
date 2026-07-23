import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

interface SectionProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function Section({ eyebrow, title, description, className, children, ...props }: SectionProps) {
  return (
    <section className={cn('mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8', className)} {...props}>
      {(eyebrow || title || description) && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-500">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{title}</h2>}
          {description && <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
