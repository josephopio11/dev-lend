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

export function formatMyDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function parseUserAgent(userAgent: string): {
  device: string;
  browser: string;
  os: string;
  isMobile: boolean;
} {
  let device = "Unknown Device";
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let isMobile = false;

  // Detect OS and Device
  if (userAgent.includes("Windows NT 10.0")) {
    os = "Windows 10/11";
    device = "Windows PC";
  } else if (userAgent.includes("Windows NT")) {
    os = "Windows";
    device = "Windows PC";
  } else if (
    userAgent.includes("Macintosh") ||
    userAgent.includes("Mac OS X")
  ) {
    os = "macOS";
    device = "Mac";
  } else if (userAgent.includes("iPhone")) {
    os = "iOS";
    device = "iPhone";
    isMobile = true;
  } else if (userAgent.includes("iPad")) {
    os = "iPadOS";
    device = "iPad";
    isMobile = true;
  } else if (userAgent.includes("Android")) {
    os = "Android";
    device = "Android Device";
    isMobile = true;
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
    device = "Linux PC";
  }

  // Detect Browser
  if (userAgent.includes("Chrome/")) {
    const match = userAgent.match(/Chrome\/(\d+)/);
    browser = match ? `Chrome ${match[1]}` : "Chrome";
  } else if (userAgent.includes("Firefox/")) {
    const match = userAgent.match(/Firefox\/(\d+)/);
    browser = match ? `Firefox ${match[1]}` : "Firefox";
  } else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome")) {
    const match = userAgent.match(/Version\/(\d+)/);
    browser = match ? `Safari ${match[1]}` : "Safari";
  } else if (userAgent.includes("Edge/")) {
    const match = userAgent.match(/Edge\/(\d+)/);
    browser = match ? `Edge ${match[1]}` : "Edge";
  }

  return { device, browser, os, isMobile };
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isSessionExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

export function formatIPAddress(ip: string): string {
  if (ip === "0000:0000:0000:0000:0000:0000:0000:0000" || ip === "::") {
    return "localhost";
  }
  return ip;
}
