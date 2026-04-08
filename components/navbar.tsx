import { requireAuth } from "@/lib/auth-server";
import { Package } from "lucide-react";
import Link from "next/link";
import StopImpersonating from "./admin/stop-impersonating";
import RegisterEquipmentModal from "./dashboard/RegisterEquipmentModal";
import UserIcon from "./dashboard/user-icon";

const Navbar = async () => {
  const { user, session } = await requireAuth();

  return (
    <header className="glass sticky top-0 z-50 w-full border-b">
      {session.impersonatedBy && (
        <div className="bg-yellow-400 opacity-85">
          <div className="container mx-auto flex max-w-7xl items-center justify-center gap-2 px-4">
            <p>
              This account is currently being impersonated by user with id:{" "}
              <span className="font-bold italic underline">
                {session.userId}
              </span>{" "}
            </p>
            <StopImpersonating />
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
};

export default Navbar;
