"use client";

import EquipmentCard from "@/components/equipment-card";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "@/lib/auth-client";
import { Equipment } from "@/lib/generated/prisma/client";
import { Boxes, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  equipment: Equipment[];
};

const DashboardPageContent = ({ equipment }: Props) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "AVAILABLE" | "BORROWED">("ALL");

  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  const filteredEquipment =
    equipment?.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        (item.borrowerName &&
          item.borrowerName.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus = filter === "ALL" || item.status === filter;

      return matchesSearch && matchesStatus;
    }) || [];

  const stats = {
    total: equipment?.length || 0,
    available: equipment?.filter((e) => e.status === "AVAILABLE").length || 0,
    borrowed: equipment?.filter((e) => e.status === "BORROWED").length || 0,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero / Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              Equipment Inventory
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
              Manage checkouts, track availability, and maintain your hardware
              catalog seamlessly.
            </p>
          </div>

          {/* Stats quick view */}
          <div className="flex gap-4 p-4 bg-card rounded-2xl border shadow-sm">
            <div className="text-center px-4 border-r border-border">
              <div className="text-3xl font-display font-bold text-primary">
                {stats.total}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total
              </div>
            </div>
            <div className="text-center px-4 border-r border-border">
              <div className="text-3xl font-display font-bold text-emerald-500">
                {stats.available}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Ready
              </div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-display font-bold text-amber-500">
                {stats.borrowed}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Out
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center bg-card p-2 rounded-2xl border shadow-sm">
          <div className="relative flex-1 w-full">
            <PackageSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, serial, or borrower..."
              className="pl-10 h-12 rounded-xl border-none bg-transparent shadow-none focus-visible:ring-1 focus-visible:ring-primary/50 text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div className="flex gap-2 w-full sm:w-auto p-2 sm:p-0">
            {(["ALL", "AVAILABLE", "BORROWED"] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
                className={`rounded-lg capitalize flex-1 sm:flex-none ${filter === f ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {filteredEquipment.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Boxes className="h-12 w-12 text-muted-foreground/50" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">
              No items found
            </h3>
            <p className="text-muted-foreground">
              {search || filter !== "ALL"
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Your inventory is currently empty. Click 'Register Item' to get started."}
            </p>
            {(search || filter !== "ALL") && (
              <Button
                variant="outline"
                className="mt-6 rounded-xl"
                onClick={() => {
                  setSearch("");
                  setFilter("ALL");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {filteredEquipment.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map((item, index) => (
              <EquipmentCard key={item.id} equipment={item} index={index} />
            ))}
          </div>
        )}

        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user.name || "User"}!</p>
        <p>Email: {user.email}</p>
        <Button onClick={() => signOut()} className="w-full">
          Sign Out
        </Button>
      </main>
    </div>
  );
};

export default DashboardPageContent;
