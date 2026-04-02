"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserIcon from "../dashboard/user-icon";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const session = useSession();
  let isLoggedIn = false;

  if (session.data?.user.id) {
    isLoggedIn = true;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            {/** biome-ignore lint/a11y/noSvgWithoutTitle: <Why reinvent the wheel when you can use what is working> */}
            <svg
              className="h-5 w-5 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {process.env.APP_NAME || "DevMGMT.msc"}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="hidden items-center gap-2 md:flex">
            <Button size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            {session.data?.user && <UserIcon user={session.data.user} />}
          </div>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        )}

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            {isLoggedIn ? (
              <div className="hidden items-center gap-8 md:flex">
                <Button size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" size="sm" className="justify-start">
                  <Link href="/sign-in">Log in</Link>
                </Button>
                <Button size="sm">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
