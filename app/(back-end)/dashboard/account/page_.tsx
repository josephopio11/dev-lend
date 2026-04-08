import { requireAuth } from "@/lib/auth-server";

export default async function AccountPage() {
  const session = await requireAuth();

  if (!session.user) return null;

  return (
    <main className="relative z-10 container mx-auto max-w-7xl flex-1 px-4 py-8">
      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {session.user.name}&apos;s Account
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Manage checkouts, track availability, and maintain your hardware
            catalog seamlessly.
          </p>
        </div>

        {/* Stats quick view */}
        <div className="bg-card flex gap-4 rounded-2xl border p-4 shadow-sm">
          <div className="border-border border-r px-4 text-center">
            <div className="font-display text-primary text-3xl font-bold">
              {/* {stats.total} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Total
            </div>
          </div>
          <div className="border-border border-r px-4 text-center">
            <div className="font-display text-3xl font-bold text-emerald-500">
              {/* {stats.available} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Ready
            </div>
          </div>
          <div className="px-4 text-center">
            <div className="font-display text-3xl font-bold text-amber-500">
              {/* {stats.borrowed} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Out
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
