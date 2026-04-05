import AdminBackButton from "@/components/admin/admin-back-button";
import { AdminLinks } from "@/components/admin/admin-links";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth-server";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: LayoutProps) {
  // const user =
  await requireAdmin();

  // console.log(user);
  return (
    <div>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <AdminBackButton />

        {/* Hero / Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              User Admin Page
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
              Manage users on this system.
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <AdminLinks />

          <Card className=" shadow-xl">
            <div className="relative  mx-3  space-y-8">{children}</div>
          </Card>
        </div>
      </main>
    </div>
  );
}
