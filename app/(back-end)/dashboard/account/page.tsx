import { requireAuth } from "@/lib/auth-server";

export default async function AccountPage() {
  const session = await requireAuth();

  if (!session.user) return null;

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {session.user.name}&apos;s Account
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Manage checkouts, track availability, and maintain your hardware
            catalog seamlessly.
          </p>
        </div>

        {/* Stats quick view */}
        <div className="flex gap-4 p-4 bg-card rounded-2xl border shadow-sm">
          <div className="text-center px-4 border-r border-border">
            <div className="text-3xl font-display font-bold text-primary">
              {/* {stats.total} */}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Total
            </div>
          </div>
          <div className="text-center px-4 border-r border-border">
            <div className="text-3xl font-display font-bold text-emerald-500">
              {/* {stats.available} */}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Ready
            </div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-amber-500">
              {/* {stats.borrowed} */}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Out
            </div>
          </div>
        </div>
      </div>
      <pre>What do you want to see?</pre>
    </main>
  );
}
