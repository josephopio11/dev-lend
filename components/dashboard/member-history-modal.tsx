"use client";

import {
  BorrowersHistoryType,
  getBorrowerHistory,
} from "@/app/actions/borrower";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ArrowRightLeft, CheckCircle2, History, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MemberHistoryProps {
  borrowerId: string;
  borrowerName: string;
}

const MemberHistory = ({ borrowerId, borrowerName }: MemberHistoryProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<BorrowersHistoryType>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchHistory = async () => {
      toast.info("Loading history...", {
        position: "bottom-center",
        duration: 1000,
      });
      const data = await getBorrowerHistory(borrowerId);
      if (!cancelled) {
        setHistory(data);
      }
    };

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, [borrowerId]);

  if (!history) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary h-8 rounded-lg text-xs font-medium transition-colors"
        >
          <History className="mr-1.5 h-3.5 w-3.5" />
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-125">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-display flex items-center gap-2 text-2xl font-bold">
            <History className="text-primary h-6 w-6" />
            Lending History
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">
              {borrowerName}
            </span>{" "}
            has borrowed {history._count.lendingHistories} times so far. The
            recent {history.lendingHistories.length} items borrowed can ben seen
            below <br />
            {/* <span>
              To view the full record{" "}
              <Button asChild variant={"link"} className="px-0 mx-0">
                <Link href={`/dashboard/history/${borrowerId}`}>
                  click here
                </Link>
              </Button>
            </span> */}
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-4 py-4">
            {!history || history.lendingHistories.length === 0 ? (
              <div className="bg-muted/30 rounded-2xl border border-dashed py-12 text-center">
                <History className="text-muted-foreground/30 mx-auto mb-3 h-10 w-10" />
                <p className="text-muted-foreground text-sm">
                  No lending history yet.
                </p>
              </div>
            ) : (
              <div className="border-primary/20 relative ml-3 space-y-8 border-l-2 pl-6">
                {/* <pre>{JSON.stringify(history.lendingHistories, null, 2)}</pre> */}
                {history.lendingHistories.map((record) => (
                  <div key={record.id} className="relative">
                    <div className="bg-primary border-background absolute top-1 -left-7.75 h-2.5 w-2.5 rounded-full border-4 shadow-[0_0_0_2px_rgba(var(--primary),0.1)]" />

                    <div className="bg-card rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                            <User className="text-primary h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm leading-none font-bold">
                              {record.equipment.name}
                            </p>
                            <Badge
                              variant="outline"
                              className={`mt-1 h-4 rounded-full text-[10px] ${record.returnedAt ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "animate-pulse border-amber-100 bg-amber-50 text-amber-700"}`}
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

export default MemberHistory;
