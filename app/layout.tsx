import { ThemeButton } from "@/components/theme-button";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: process.env.APP_NAME || "DevMGMT.msc",
    template: "%s | DevMGMT.msc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} selection:bg-primary selection:text-primary-foreground scroll-smooth! antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster richColors />
          <ThemeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
