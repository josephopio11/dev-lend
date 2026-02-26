"use client";

import { Button } from "@/components/ui/button";
import { LogIn, Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 },
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 w-screen h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/mainbg.jpg"
            alt="Black hole animation"
            className="w-screen h-screen object-cover"
            width={3000}
            height={3000}
          />
        </div>
        <div className="absolute inset-0 bg-background/70" />

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-foreground/80 uppercase">
                  Joseph Opio&#39;s Asset management system
                </span>
              </div>
              <h1 className="text-7xl lg:text-8xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-linear-to-br from-foreground via-foreground to-background/40 bg-clip-text text-transparent">
                  Device Loan
                </span>
                <br />
                <span className="text-foreground/70">Management System.</span>
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed mb-10 max-w-xl font-light">
                Omnius orchestrates your entire cloud and on-prem infrastructure
                through a single intelligent agent. Deploy, monitor,
                optimize—automatically.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <Button className="text-white" asChild>
                  <Link href="/sign-in">
                    Log In
                    <LogIn className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </Link>
                </Button>
                <Button variant={"outline"} asChild>
                  <Link href="/sign-up">
                    Sign Up
                    <Pen className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-137.5 transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <Image
                src="/logos.png"
                alt="Omnius Agent"
                width={1000}
                height={1000}
                className="w-full max-w-sm lg:max-w-md drop-shadow-2xl animate-float relative z-10"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
