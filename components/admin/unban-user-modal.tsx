"use client";

import { clientAdmin } from "@/lib/auth-client";
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

interface UnbanUserModalProps {
  id: string;
  name: string;
}

type FormState = {
  reason?: string;
  expiresIn?: number;
  units?: string;
};

export default function UnbanUserModal({ id, name }: UnbanUserModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleUnban = async () => {
    const { data, error } = await clientAdmin.unbanUser({
      userId: id, // required
    });
    console.log(data, error);
    router.push("/admin/users");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <IconShieldCheckFilled
            className="h-4 w-4 text-emerald-600"
            title="Ban User"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Unbanning {name}
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            {/* <span className="text-foreground font-semibold">
              {borrowerName}
            </span>{" "}
            has borrowed {history._count.lendingHistories} times so far. The
            recent {history.lendingHistories.length} items borrowed can ben seen
            below <br /> */}
          </p>
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
