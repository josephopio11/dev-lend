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
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col animate-in-stagger "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
      <CardHeader className="pb-4 relative z-10 px-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 items-center">
            <Badge
              variant="outline"
              className={`
                font-medium rounded-full px-3 py-1 border-0
                ${
                  hasItem
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                }
              `}
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
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
      <CardContent className="pb-4 flex-1 relative z-10 px-3">
        <div className="flex items-start text-foreground bg-foreground/5 p-2 rounded-xl border my-2 min-h-10 border-border/50">
          <Box
            className={cn(
              "h-4 w-4 mr-2 mt-0.5 ",
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
                  : "italic text-xs font-light text-yellow-500",
              )}
            >
              {borrower.lendingHistories[0]?.equipment.name ??
                "Nothing borrowed yet"}
            </p>
            {borrower.lendingHistories.length > 0 && (
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <CalendarClock className="h-3 w-3 mr-1" />
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

        <div className="space-y-3 bg-foreground/5 border border-foreground/10 p-2 rounded-xl text-sm">
          <div className="flex items-center text-muted-foreground">
            <Armchair className="h-4 w-4 mr-1 text-primary/70" />
            <span className="font-mono font-bold text-xs">
              {borrower.position}
            </span>
          </div>
          <div className="flex items-center justify-start text-muted-foreground pt-2 border-t border-border/50">
            <Mail className="h-4 w-4 mr-1 text-primary/70" />
            <span className="font-mono font-bold text-xs">
              <Link href={`mailto:${borrower.email}`}>{borrower.email}</Link>
            </span>
          </div>

          <div className="flex items-center text-muted-foreground pt-2 border-t border-border/50">
            <Phone className="h-4 w-4 mr-1 mt-0.5 text-primary/70" />
            <span className="font-mono font-bold text-xs">
              <Link href={`tel:${borrower.phone}`}>{borrower.phone}</Link>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowerCard;
