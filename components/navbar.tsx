import { Package } from "lucide-react";
import Link from "next/link";
import RegisterEquipmentModal from "./RegisterEquipmentModal";

const Navbar = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full glass border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <Package className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              EquipSync
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <RegisterEquipmentModal />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
