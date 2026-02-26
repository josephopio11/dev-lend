"use client";

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
import { Equipment } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { HandHelping } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BorrowModalProps {
  equipment: Equipment;
  trigger?: React.ReactNode;
  small?: boolean;
}

const BorrowModal = ({ equipment, trigger, small }: BorrowModalProps) => {
  const [open, setOpen] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowerName.trim()) return;

    const res = await borrowItem(equipment.id, borrowerName.trim());

    toast.success("Borrowed successfully", {
      description: JSON.stringify(res, null, 2),
    });
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
            <Input
              id="borrowerName"
              placeholder="e.g. Jane Doe"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="rounded-xl"
              autoFocus
              required
            />
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
              disabled={!borrowerName.trim()}
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
