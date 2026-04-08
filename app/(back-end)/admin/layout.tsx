import AdminBackButton from "@/components/admin/admin-back-button";
import { AdminLinks } from "@/components/admin/admin-links";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth-server";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: LayoutProps) {
  await requireAdmin();

  return (
    <main className="relative z-10 container mx-auto max-w-7xl flex-1 px-4 py-8">
      <AdminBackButton />

      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight text-balance md:text-5xl">
            User Admin Page
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Manage users on this system.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <AdminLinks />

        <Card className="shadow-xl">
          <div className="relative mx-3 space-y-8">{children}</div>
        </Card>
      </div>
    </main>
  );
}
