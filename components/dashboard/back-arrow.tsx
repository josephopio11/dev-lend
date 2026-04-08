"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconDashboard } from "@tabler/icons-react";
import { ArrowLeft, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MenuWithBackArrow = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="mb-6 flex items-center gap-4">
      {pathname !== "/dashboard" && (
        <Button
          variant="outline"
          className="rounded-lg shadow-sm"
          onClick={() => router.back()}
          title="Back"
        >
          <ArrowLeft className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Back</span>
        </Button>
      )}
      <Button
        variant={pathname === "/dashboard" ? "default" : "outline"}
        className={cn(
          "rounded-lg shadow-sm",
          pathname === "/dashboard" && "bg-primary text-white",
        )}
        asChild
        title="Dashboard"
      >
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          <IconDashboard className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/borrowers" ? "default" : "outline"}
        className={cn(
          "rounded-lg shadow-sm",
          pathname === "/dashboard/borrowers" && "bg-primary text-white",
        )}
        asChild
        title="Borrowers"
      >
        <Link
          href="/dashboard/borrowers"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          <UserCircle2Icon className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Borrowers</span>
        </Link>
      </Button>{" "}
    </div>
  );
};

export default MenuWithBackArrow;
