import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFullImageUrl = (url: string) => {
  return `${import.meta.env.VITE_IMAGE_BASE_URL}${url}`;
};
