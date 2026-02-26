import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <Navbar />
      {children}
    </div>
  );
}
