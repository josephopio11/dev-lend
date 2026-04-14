"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientAdmin } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { BanUserModalProps } from "@/types";
import { IconShieldOff, IconUserPin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FormState = {
  reason?: string;
  expiresIn?: number;
  units?: string;
};

export default function BanUserModal({
  id,
  name,
  isInPage,
}: BanUserModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    reason: "",
    expiresIn: 0,
    units: "",
  });

  const handleBan = async () => {
    if (!form.reason) {
      toast.error("Imagine banning someone for no reason, eh?");
    }

    if (form.expiresIn) {
      switch (form.units) {
        case "minutes":
          form.expiresIn *= 60;
          break;
        case "hours":
          form.expiresIn *= 60 * 60;
          break;
        case "days":
          form.expiresIn *= 60 * 60 * 24;
          break;
        case "weeks":
          form.expiresIn *= 60 * 60 * 24 * 7;
          break;
        case "months":
          form.expiresIn *= 60 * 60 * 24 * 30;
          break;
        case "years":
          form.expiresIn *= 60 * 60 * 24 * 365;
          break;
        case "indefinitely":
          form.expiresIn = 0;
          break;
        default:
          break;
      }
    } else {
      form.expiresIn = 0;
    }

    const { data, error } = await clientAdmin.banUser({
      userId: id, // required
      banReason: form.reason,
      banExpiresIn: form.expiresIn,
    });

    await clientAdmin.setRole({
      userId: id,
      role: "user",
    });
    console.log(data, error);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className={cn("w-19", isInPage && "min-w-1/3")}
          size={isInPage ? "default" : "sm"}
        >
          <IconShieldOff className="text-white-600 h-4 w-4" title="Ban User" />{" "}
          Ban
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <IconUserPin className="text-primary h-6 w-6" />
            Banning {name}
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
          <p className="leading-none">You are about to ban {name}</p>
          <div className="">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              type="text"
              placeholder="Reason"
              className="mt-2"
              defaultValue={form.reason}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  reason: e.target.value,
                }))
              }
            />
          </div>
          <div className="">
            <Label htmlFor="expiresIn">Ban expires in</Label>
            <div className="flex flex-row items-end justify-between gap-2">
              <Input
                id="expiresIn"
                type="number"
                min={0}
                placeholder="Enter a number"
                className="mt-2"
                defaultValue={form.expiresIn}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, expiresIn: +e.target.value }))
                }
              />
              <Select
                value={form.units}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    units: value,
                  }))
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Units</SelectLabel>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="indefinitely">Indefinitely</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleBan()}>Continue</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
