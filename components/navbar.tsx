"use client";

import { useSession } from "@/lib/auth-client";
import { Package } from "lucide-react";
import Link from "next/link";
import RegisterEquipmentModal from "./dashboard/RegisterEquipmentModal";
import UserIcon from "./dashboard/user-icon";

export function Navbar() {
  const { data } = useSession();

  const impersonator = data?.session.impersonatedBy;
  const user = data?.user;

  return (
    <header className="glass sticky top-0 z-50 w-full border-b">
      {impersonator && (
        <div className="bg-yellow-400 opacity-85 dark:bg-yellow-400/50">
          <div className="container mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
            <p>&nbsp;</p>
          </div>
        </div>
      )}
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="bg-primary/10 text-primary rounded-xl p-2">
            <Package className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            {process.env.APP_NAME || "DevMGMT.msc"}
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <RegisterEquipmentModal />
          <UserIcon user={user} />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
