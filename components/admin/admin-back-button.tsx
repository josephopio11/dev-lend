"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { IconDashboard, IconUserCog } from "@tabler/icons-react";
import { ArrowLeft, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();

  const role = data?.user.role;

  return (
    <div className="mb-6 flex items-center gap-4">
      {pathname !== "/dashboard" && (
        <Button
          variant="outline"
          className="rounded-lg shadow-sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      <Button
        variant={pathname === "/dashboard" ? "default" : "outline"}
        className={cn(
          "rounded-lg shadow-sm",
          pathname === "/dashboard" && "bg-primary text-white",
        )}
        asChild
      >
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          <IconDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button
        variant={pathname === "/dashboard/borrowers" ? "default" : "outline"}
        className={cn(
          "rounded-lg shadow-sm",
          pathname === "/dashboard/borrowers" && "bg-primary text-white",
        )}
        asChild
      >
        <Link
          href="/dashboard/borrowers"
          className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
        >
          <UserCircle2Icon className="mr-2 h-4 w-4" />
          Borrowers
        </Link>
      </Button>
      {role === "admin" && (
        <Button
          variant={pathname === "/admin" ? "default" : "outline"}
          className={cn(
            "rounded-lg shadow-sm",
            (pathname.includes("/admin") || pathname === "/admin") &&
              "bg-primary text-white",
          )}
          asChild
        >
          <Link
            href="/admin"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            <IconUserCog className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AdminBackButton;
