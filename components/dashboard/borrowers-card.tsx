import { deleteBorrower, SingleBorrowerType } from "@/app/actions/borrower";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Armchair,
  Box,
  CalendarClock,
  Mail,
  Phone,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import EditBorrowerModal from "./edit-borrower-modal";
import MemberHistory from "./member-history-modal";

interface BorrowerCardProps {
  borrower: SingleBorrowerType;
  index: number;
}

const BorrowerCard = ({ borrower, index }: BorrowerCardProps) => {
  const hasItem = borrower.lendingHistories[0]?.returnedAt !== null;

  const handleDelete = async () => {
    const data = await deleteBorrower(borrower.id);
    toast.success("Deleted successfully", {
      description: JSON.stringify(data, null, 2),
    });
  };

  return (
    <Card
      className="group border-border/50 bg-card/50 hover:border-primary/20 animate-in-stagger relative flex flex-col overflow-hidden rounded-2xl border shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Decorative gradient blob */}
      <div className="bg-primary/5 group-hover:bg-primary/10 pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl transition-colors" />
      <CardHeader className="relative z-10 px-3 pb-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`rounded-full border-0 px-3 py-1 font-medium ${
                hasItem
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
              } `}
            >
              {hasItem ? "Returned" : "Borrowed"}
            </Badge>
            <MemberHistory
              borrowerId={borrower.id}
              borrowerName={borrower.name}
            />
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Borrower?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove {borrower.name} from the
                  inventory system. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {/* <Link
          href={`/dashboard/account/${borrower.id}`}
          className="font-display font-bold text-xl text-foreground leading-tight"
        >
          {borrower.name}
        </Link> */}
        <EditBorrowerModal borrowerId={borrower.id} title={borrower.name} />
      </CardHeader>
      <CardContent className="relative z-10 flex-1 px-3 pb-4">
        <div className="text-foreground bg-foreground/5 border-border/50 my-2 flex min-h-10 items-start rounded-xl border p-2">
          <Box
            className={cn(
              "mt-0.5 mr-2 h-4 w-4",
              borrower.lendingHistories.length > 0 &&
                borrower.lendingHistories[0].returnedAt === null
                ? "text-amber-500"
                : "text-primary/70",
            )}
          />

          <div>
            <p
              className={cn(
                borrower.lendingHistories[0]?.equipment.name
                  ? "font-medium"
                  : "text-xs font-light text-yellow-500 italic",
              )}
            >
              {borrower.lendingHistories[0]?.equipment.name ??
                "Nothing borrowed yet"}
            </p>
            {borrower.lendingHistories.length > 0 && (
              <div className="text-muted-foreground mt-1 flex items-center text-xs">
                <CalendarClock className="mr-1 h-3 w-3" />
                {borrower.lendingHistories[0].returnedAt === null ? (
                  <span>
                    Borrowed{" "}
                    {formatDistanceToNow(
                      new Date(borrower.lendingHistories[0].borrowedAt),
                      {
                        addSuffix: true,
                      },
                    )}
                    <br />{" "}
                    <span className="text-destructive">Not returned yet</span>
                  </span>
                ) : (
                  <span>
                    Borrowed{" "}
                    {formatDistanceToNow(
                      new Date(borrower.lendingHistories[0].borrowedAt),
                      {
                        addSuffix: true,
                      },
                    )}
                    <br /> Returned{" "}
                    {formatDistanceToNow(
                      new Date(borrower.lendingHistories[0].returnedAt),
                      {
                        addSuffix: true,
                      },
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-foreground/5 border-foreground/10 space-y-3 rounded-xl border p-2 text-sm">
          <div className="text-muted-foreground flex items-center">
            <Armchair className="text-primary/70 mr-1 h-4 w-4" />
            <span className="font-mono text-xs font-bold">
              {borrower.position}
            </span>
          </div>
          <div className="text-muted-foreground border-border/50 flex items-center justify-start border-t pt-2">
            <Mail className="text-primary/70 mr-1 h-4 w-4" />
            <span className="font-mono text-xs font-bold">
              <Link href={`mailto:${borrower.email}`}>{borrower.email}</Link>
            </span>
          </div>

          <div className="text-muted-foreground border-border/50 flex items-center border-t pt-2">
            <Phone className="text-primary/70 mt-0.5 mr-1 h-4 w-4" />
            <span className="font-mono text-xs font-bold">
              <Link href={`tel:${borrower.phone}`}>{borrower.phone}</Link>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowerCard;
