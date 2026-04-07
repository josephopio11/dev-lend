"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const sliderImages = [
  "/images/slider-1.jpg",
  "/images/slider-2.jpg",
  "/images/slider-3.jpg",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {sliderImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-accent"
                : "w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
            Simple device tracking
          </p>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Know who has what,
            <br />
            <span className="text-muted-foreground">at any moment</span>
          </h1>

          <blockquote className="mx-auto mt-8 max-w-2xl rounded-lg border-l-2 border-accent bg-card/60 py-4 pl-6 pr-4 text-left backdrop-blur-sm">
            <p className="text-lg italic text-muted-foreground md:text-xl">
              &quot;I just needed to remember who took what. That is why I
              created this system.&quot;
            </p>
          </blockquote>

          <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            A straightforward way to track devices, equipment, and who has them.
            No complicated features. Just the essentials.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/sign-up">
                Start Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-card/60 backdrop-blur-sm sm:w-auto"
              asChild
            >
              <Link href="/#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        {/* Device Preview */}
        <div className="mx-auto mt-16 max-w-3xl px-4 md:mt-20">
          <div className="overflow-hidden rounded-xl border border-border bg-card/90 shadow-lg backdrop-blur-sm">
            <div className="border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/50"></div>
                <div className="h-3 w-3 rounded-full bg-chart-4/50"></div>
                <div className="h-3 w-3 rounded-full bg-accent/50"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border bg-background/80 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <svg
                        className="h-5 w-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        MacBook Pro 14&quot;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Serial: MBP-2024-001
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      Sarah Chen
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Since Mar 15
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background/80 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      <svg
                        className="h-5 w-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Sony A7 IV Camera
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Serial: CAM-2023-042
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      Mike Johnson
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Since Mar 28
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/5 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                      <svg
                        className="h-5 w-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        iPad Pro 12.9&quot;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Serial: IPD-2024-007
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
