"use client";

import { clientAdmin } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { BanUserModalProps } from "@/types";
import { IconShieldCheckFilled, IconUserPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function UnbanUserModal({
  id,
  name,
  isInPage,
}: BanUserModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleUnban = async () => {
    const { data, error } = await clientAdmin.unbanUser({
      userId: id, // required
    });
    console.log(data, error);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("w-19 bg-emerald-500 text-xs", isInPage && "min-w-1/3")}
          size={isInPage ? "default" : "sm"}
        >
          <IconShieldCheckFilled
            className="text-white-600 h-4 w-4"
            title="Ban User"
          />{" "}
          Unban
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Unbanning {name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-6 pb-6">
          <p className="leading-none">You are about to unban {name}</p>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleUnban()}>Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
