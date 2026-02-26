"use client";

import { getEquipmentHistory } from "@/app/actions/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LendingHistory } from "@/lib/generated/prisma/client";
import { format } from "date-fns";
import { ArrowRightLeft, CheckCircle2, History, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

interface HistoryModalProps {
  equipmentId: string;
  equipmentName: string;
}

const HistoryModal = ({ equipmentId, equipmentName }: HistoryModalProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<LendingHistory[] | null>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchHistory = async () => {
      toast.info("Loading history...", {
        position: "bottom-center",
        duration: 1000,
      });
      const data = await getEquipmentHistory(equipmentId);
      if (!cancelled) {
        setHistory(data ?? []);
      }
    };

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, [equipmentId, open]);

  //   if (!history) {
  //     handleGetHistory();
  //   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs font-medium rounded-lg text-muted-foreground hover:text-primary transition-colors"
        >
          <History className="h-3.5 w-3.5 mr-1.5" />
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 rounded-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Lending History
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Past {history?.length} records for{" "}
            <span className="text-foreground font-semibold">
              {equipmentName}
            </span>
            <br />
            <span>
              To view the full record{" "}
              <Button asChild variant={"link"} className="px-0 mx-0">
                <Link href={`/dashboard/history/${equipmentId}`}>
                  click here
                </Link>
              </Button>
            </span>
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-4 py-4">
            {!history || history.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
                <History className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No lending history yet.
                </p>
              </div>
            ) : (
              <div className="relative border-l-2 border-primary/20 ml-3 pl-6 space-y-8 ">
                {history.map((record) => (
                  <div key={record.id} className="relative">
                    <div className="absolute -left-7.75 top-1 h-2.5 w-2.5 rounded-full bg-primary border-4 border-background shadow-[0_0_0_2px_rgba(var(--primary),0.1)]" />

                    <div className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold text-sm leading-none">
                              {record.borrowerName}
                            </p>
                            <Badge
                              variant="outline"
                              className={`mt-1 text-[10px] h-4 rounded-full ${record.returnedAt ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100 animate-pulse"}`}
                            >
                              {record.returnedAt ? "Completed" : "Current"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <p className="text-muted-foreground flex items-center gap-1">
                            <ArrowRightLeft className="h-3 w-3" /> Checked Out
                          </p>
                          <p className="font-medium">
                            {format(
                              new Date(record.borrowedAt),
                              "MMM d, yyyy • h:mm a",
                            )}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Returned
                          </p>
                          <p className="font-medium">
                            {record.returnedAt ? (
                              format(
                                new Date(record.returnedAt),
                                "MMM d, yyyy • h:mm a",
                              )
                            ) : (
                              <span className="text-amber-600 italic">
                                In progress
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
