"use client";

import { SessionCardsUser } from "@/components/admin/session-cards-user";
import { Shield } from "lucide-react";

export default function SessionsPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className="border-border bg-card border-b">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Shield className="text-accent h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-2xl font-semibold">
                Active Sessions
              </h1>
              <p className="text-muted-foreground">
                Manage devices where you&apos;re currently logged in
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <SessionCardsUser />
      </main>
    </div>
  );
}
