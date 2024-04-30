import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export const getPercentage = (x: number, y: number) =>
  Math.round((x / y) * 100);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
