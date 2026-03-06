import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createNameAvatar(text: string | null | undefined) {
  if (!text) return "NA";
  if (text.length < 3) return text.toUpperCase();
  const result = text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const firstTwoLetters = result.slice(0, 2);
  return firstTwoLetters;
}
