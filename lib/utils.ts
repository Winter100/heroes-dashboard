import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysSince(date: Date | string): number {
  const target = typeof date === 'string' ? new Date(date) : date;

  return Math.floor((Date.now() - target.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date;

  return target.toISOString().slice(0, 10);
}
