import Navbar from "@/components/navbar";
import { requireAuth } from "@/lib/auth-server";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { user, session } = await requireAuth();

  return (
    <div className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <div className="from-primary/5 pointer-events-none absolute inset-x-0 top-0 h-125 bg-linear-to-b to-transparent" />
      <Navbar />
      {children}
    </div>
  );
}
