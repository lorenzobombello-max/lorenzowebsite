import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Language } from './language';
import { translations } from './translations';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStatus(status: string, language: Language = 'nl') {
  const labels = translations.statusLabels[language] as Record<string, string>;
  return labels[status] ?? status;
}
