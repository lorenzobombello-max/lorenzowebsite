import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-900',
  secondary: 'bg-white text-ink ring-1 ring-slate-200 hover:-translate-y-0.5 hover:ring-indigo-200',
  ghost: 'bg-transparent text-ink hover:bg-white/60',
};

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-200',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
