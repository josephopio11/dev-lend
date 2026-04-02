"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconUserPin } from "@tabler/icons-react";
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

interface ImpersonateUserModalProps {
  id: string;
  name: string;
}

export default function ImpersonateUserModal({
  id,
  name,
}: ImpersonateUserModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleImpersonate = async () => {
    const { data, error } = await clientAdmin.impersonateUser({
      userId: id, // required
    });
    console.log(data, error);
    router.push("/dashboard");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconUserPin
            className="w-4 h-4 text-orange-500"
            title="Impersonate User"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 rounded-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
            <IconUserPin className="h-6 w-6 text-primary" />
            Impersonating {name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {/* <span className="text-foreground font-semibold">
              {borrowerName}
            </span>{" "}
            has borrowed {history._count.lendingHistories} times so far. The
            recent {history.lendingHistories.length} items borrowed can ben seen
            below <br /> */}
          </p>
        </DialogHeader>

        <div className="space-y-4 pb-6 px-6">
          <p className="leading-none">You are about to impersonate {name}</p>
          <p>Would you like to continue</p>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleImpersonate()}>Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
