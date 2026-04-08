"use client";

import type { AllBorrowersType } from "@/app/actions/borrower";
import MenuWithBackArrow from "@/components/dashboard/back-arrow";
import BorrowerCard from "@/components/dashboard/borrowers-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
import { Boxes, PackageSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  borrowers: AllBorrowersType;
};

const BorrowersPageContent = ({ borrowers }: Props) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "HAS" | "RETURNED">("ALL");

  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return (
      <div className="relative">
        <div className="absolute z-50 flex h-screen w-screen items-center justify-center">
          <div className="-my-1 flex flex-col items-center gap-2">
            <Spinner className="h-12 w-12" />
            Loading...
          </div>
        </div>
      </div>
    );
  if (!session?.user)
    return <p className="mt-8 text-center text-white">Redirecting...</p>;

  const filteredBorrowers =
    borrowers?.filter((person) => {
      const matchesSearch =
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.id.toLowerCase().includes(search.toLowerCase()) ||
        person.position?.toLowerCase().includes(search.toLowerCase()) ||
        person.email?.toLowerCase().includes(search.toLowerCase()) ||
        person.lendingHistories[0]?.equipment?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return matchesSearch; //&& matchesStatus;
    }) || [];

  //   const stats = {
  //     total: borrowers?.length || 0,
  //     has:
  //       borrowers?.filter((e) => e.lendingHistories[0].returnedAt === null)
  //         .length || 0,
  //     returned:
  //       borrowers?.filter((e) => e.lendingHistories[0].returnedAt !== null)
  //         .length || 0,
  //   };

  return (
    <main className="relative z-10 container mx-auto max-w-7xl flex-1 px-4 py-8">
      <MenuWithBackArrow />

      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight text-balance md:text-5xl">
            Borrowers
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Manage the people that borrow items from your inventory.
          </p>
        </div>

        {/* Stats quick view */}
        <div className="bg-card flex gap-4 rounded-2xl border p-4 shadow-sm">
          <div className="border-border border-r px-4 text-center">
            <div className="font-display text-primary text-3xl font-bold">
              {/* {stats.total} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Total
            </div>
          </div>
          <div className="border-border border-r px-4 text-center">
            <div className="font-display text-3xl font-bold text-emerald-500">
              {/* {stats.available} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Ready
            </div>
          </div>
          <div className="px-4 text-center">
            <div className="font-display text-3xl font-bold text-amber-500">
              {/* {stats.borrowed} */}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Out
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card mb-8 flex flex-col items-center gap-4 rounded-2xl border p-2 shadow-sm sm:flex-row">
        <div className="relative w-full flex-1">
          <PackageSearch className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
          <Input
            placeholder="Search by name, id, position, email or the last item someone borrowed..."
            className="focus-visible:ring-primary/50 h-12 rounded-xl border-none bg-transparent pl-10 text-base shadow-none focus-visible:ring-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-border hidden h-8 w-px sm:block" />
        <div className="flex w-full gap-2 p-2 sm:w-auto sm:p-0">
          {/* {(["ALL", "HAS", "BORROWED"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
              className={`rounded-lg capitalize flex-1 sm:flex-none ${filter === f ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}`}
            >
              {f}
            </Button>
          ))} */}
        </div>
      </div>

      {/* Content Area */}
      {filteredBorrowers.length === 0 && (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center py-24 text-center">
          <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <Boxes className="text-muted-foreground/50 h-12 w-12" />
          </div>
          <h3 className="font-display mb-2 text-2xl font-bold">
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

      {filteredBorrowers.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBorrowers.map((borrower, index) => (
            <BorrowerCard key={borrower.id} borrower={borrower} index={index} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BorrowersPageContent;
