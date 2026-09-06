"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconKey, IconUserPin } from "@tabler/icons-react";
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
import { Label } from "../ui/label";

interface ChangePasswordModalProps {
  id: string;
  name: string;
  email: string;
}

export default function ChangePasswordModal({
  id,
  name,
  email,
}: ChangePasswordModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handlePasswordChange = async () => {
    if (!inputPassword || inputPassword.length < 8) {
      toast.error("Please enter a password");
      return;
    }

    await clientAdmin.setUserPassword({
      newPassword: inputPassword, // required
      userId: id, // required
    });
<<<<<<< HEAD
    // console.log(data, error);
=======
>>>>>>> auth_pages
    router.push("/admin/users");
    setInputPassword("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <IconKey
            className="h-4 w-4 text-emerald-600"
            title="Change Password"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Change {name}'s Password
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
          <div className="">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-2"
              defaultValue={email}
              disabled
            />
          </div>
          <div className="">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="5om@K0mpl3xP@ssw0rd"
              className="mt-2"
              defaultValue={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handlePasswordChange()}>Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
