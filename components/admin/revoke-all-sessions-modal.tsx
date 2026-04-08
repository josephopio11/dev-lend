"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconServerOff, IconUserPin } from "@tabler/icons-react";
import { SessionWithImpersonatedBy } from "better-auth/plugins";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SessionCards } from "./session-cards";

interface RevokeAllOtherSessionsModalProps {
  id: string;
  name: string;
  email: string;
}

export default function RevokeAllOtherSessionsModal({
  id,
  name,
  email,
}: RevokeAllOtherSessionsModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [allSessions, setAllSessions] = useState<SessionWithImpersonatedBy[]>(
    [],
  );

  const handlePasswordChange = async () => {
    if (!inputPassword || inputPassword.length < 8) {
      toast.error("Please enter a password");
      return;
    }

    const { data, error } = await clientAdmin.setUserPassword({
      newPassword: inputPassword, // required
      userId: id, // required
    });
    console.log(data, error);
    router.push("/admin/users");
    setInputPassword("");
    setOpen(false);
  };

  useEffect(() => {
    if (!id || !open) return;

    const fetchSessions = async () => {
      const { data, error } = await clientAdmin.listUserSessions({
        userId: id, // required
      });
      console.log("data", data);
      setAllSessions(data);
    };
    fetchSessions();

    return () => {
      setAllSessions([]);
    };
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <IconServerOff
            className="h-4 w-4 text-purple-600"
            title="Revoke All Other Sessions"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-scroll rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="h-fit p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Revoke {name}'s Other Sessions
          </DialogTitle>
          <p className="text-muted-foreground h-fit text-sm">
            {/* <span className="text-foreground font-semibold">
              {borrowerName}
            </span>{" "}
            has borrowed {history._count.lendingHistories} times so far. The
            recent {history.lendingHistories.length} items borrowed can ben seen
            below <br /> */}{" "}
            {/* <pre className="overflow-scroll">
              {JSON.stringify(allSessions, null, 2)}
            </pre> */}
          </p>
        </DialogHeader>

        <div className="space-y-4 px-6 pb-6">
          <SessionCards sessionsData={allSessions} />
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
