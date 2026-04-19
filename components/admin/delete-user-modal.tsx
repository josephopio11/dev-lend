"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconTrash, IconUserPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

interface DeleteUserModalProps {
  id: string;
  name: string;
}

export default function DeleteUserModal({ id, name }: DeleteUserModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleDelete = async () => {
    if (!inputName) {
      toast.error("Imagine deleting someone for no reason, eh?");
      return;
    }

    if (inputName !== name) {
      toast.error("Name does not match");
      return;
    }

    await clientAdmin.removeUser({
      userId: id, // required
    });
    // console.log(data, error);
    router.push("/admin/users");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <IconTrash className="h-4 w-4 text-red-600" title="Delete User" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display text-destructive flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            This is a very dangerous action
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
          <p className="leading-none">
            You are about to{" "}
            <span className="text-destructive font-bold underline">
              permanently
            </span>{" "}
            delete {name}
          </p>
          <div className="">
            <p>
              Type <span className="font-bold">{name}</span> below to delete.
            </p>
            <Input
              id="name"
              type="text"
              placeholder="name"
              className="mt-2"
              defaultValue={inputName}
              onChange={(e) => setInputName(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete()}>Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
