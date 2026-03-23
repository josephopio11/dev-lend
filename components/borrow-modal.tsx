"use client";

import { SearchBorrowersType, searchBorrowers } from "@/app/actions/borrower";
import { borrowItem } from "@/app/actions/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Equipment } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { HandHelping } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface BorrowModalProps {
  equipment: Equipment;
  trigger?: React.ReactNode;
  small?: boolean;
}

const BorrowModal = ({ equipment, trigger, small }: BorrowModalProps) => {
  const [open, setOpen] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");
  const [suggestions, setSuggestions] = useState<SearchBorrowersType>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1); // index, not id
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!borrowerName.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const results = await searchBorrowers(borrowerName.trim());
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setActiveSuggestion(-1);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [borrowerName]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    setBorrowerName(name);
    setShowSuggestions(false);
    setActiveSuggestion(-1); // reset to -1
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeSuggestion].name);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!borrowerName.trim()) return;
    setLoading(true);
    const res = await borrowItem(equipment.id, borrowerName.trim());

    toast.success("Borrowed successfully", {
      description: JSON.stringify(res, null, 2),
    });

    setOpen(false);
    setBorrowerName("");
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="default"
            className={cn(
              ` rounded-lg shadow-sm text-white`,
              small === true ? "" : "w-full",
            )}
          >
            <HandHelping className="mr-2 h-4 w-4" />
            Check Out
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-100 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Check Out Equipment
          </DialogTitle>
          <DialogDescription>
            You are about to check out{" "}
            <span className="font-medium text-foreground">
              {equipment.name}
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBorrow} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="borrowerName">Borrower&apos;s Full Name</Label>
            <div ref={wrapperRef} className="relative">
              <Input
                id="borrowerName"
                placeholder="e.g. Jane Doe"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() =>
                  suggestions.length > 0 && setShowSuggestions(true)
                }
                className="rounded-xl"
                autoFocus
                required
                autoComplete="off"
                autoCapitalize="on"
              />
              {showSuggestions && (
                <ul className="absolute z-50 mt-1 w-full rounded-xl border border-border bg-popover shadow-md overflow-hidden">
                  {suggestions.map((suggestion, i) => (
                    <li
                      key={suggestion.id}
                      onMouseDown={() => handleSelect(suggestion.name)}
                      className={cn(
                        "px-3 py-2 text-sm cursor-pointer transition-colors",
                        i === activeSuggestion // compare index, not id
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!borrowerName.trim() || loading}
              className="rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Confirm Checkout
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
