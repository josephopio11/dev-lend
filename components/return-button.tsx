"use client";

import { returnItem } from "@/app/actions/dashboard";
import { cn } from "@/lib/utils";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type ReturnButtonProps = {
  id: string;
  borrowedAt: Date | null;
  small?: boolean;
};

export function ReturnButton({ id, borrowedAt, small }: ReturnButtonProps) {
  const handleReturn = async () => {
    if (!id || !borrowedAt) return;
    await returnItem(id, borrowedAt);
    toast.message("Returned successfully", {
      description: "Item has been returned successfully",
    });
  };

  return (
    <Button
      variant="outline"
      className={cn(
        " rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-900/30 group/btn",
        small === true ? "" : "w-full",
      )}
      onClick={handleReturn}
    >
      <ArrowRightLeft className="mr-2 h-4 w-4 transition-transform group-hover/btn:-rotate-180" />
      Process Return
    </Button>
  );
}
