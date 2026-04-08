"use client";

import { IconServerOff, IconUserPin } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SessionCards } from "./session-cards";

interface RevokeSessionsModalProps {
  id: string;
  name: string;
  email: string;
}

export default function RevokeSessionsModal({
  id,
  name,
}: RevokeSessionsModalProps) {
  const [open, setOpen] = useState(false);

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
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-250">
        <DialogHeader className="h-fit p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Revoke {name}'s Other Sessions
          </DialogTitle>
        </DialogHeader>

        <SessionCards id={id} />
      </DialogContent>
    </Dialog>
  );
}
