import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background relative flex min-h-screen flex-col overflow-hidden">
      <div className="from-primary/5 pointer-events-none absolute inset-x-0 top-0 h-125 bg-linear-to-b to-transparent" />
      <Navbar />
      {children}
    </div>
  );
}
