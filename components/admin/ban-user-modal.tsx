"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconShieldOff, IconUserPin } from "@tabler/icons-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface BanUserModalProps {
  id: string;
  name: string;
}

type FormState = {
  reason?: string;
  expiresIn?: number;
  units?: string;
};

export default function BanUserModal({ id, name }: BanUserModalProps) {
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

    console.log("=========================================");
    console.log(form);
    console.log("=========================================");

    const { data, error } = await clientAdmin.banUser({
      userId: id, // required
      banReason: form.reason,
      banExpiresIn: form.expiresIn,
    });
    console.log(data, error);
    router.push("/admin/users");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-xs">
          <IconShieldOff className="w-4 h-4 text-red-600" title="Ban User" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 rounded-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
            <IconUserPin className="h-6 w-6 text-primary" />
            Banning {name}
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
            <div className="flex flex-row gap-2 justify-between items-end">
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
