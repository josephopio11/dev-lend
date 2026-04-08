import { deleteEquipment, SingleEquipmentType } from "@/app/actions/dashboard";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Box, CalendarClock, Fingerprint, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import BorrowModal from "./borrow-modal";
import HistoryModal from "./history-modal";
import { ReturnButton } from "./return-button";

interface EquipmentCardProps {
  equipment: SingleEquipmentType;
  index: number;
}

const EquipmentCard = ({ equipment, index }: EquipmentCardProps) => {
  const isAvailable =
    equipment.lendingHistories.length < 1 ||
    equipment.lendingHistories[0].returnedAt !== null;

  const handleDelete = async () => {
    const data = await deleteEquipment(equipment.id);
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

      <CardHeader className="relative z-10 pb-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`rounded-full border-0 px-3 py-1 font-medium ${
                isAvailable
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
              } `}
            >
              {isAvailable ? "Available" : "Checked Out"}
            </Badge>
            <HistoryModal
              equipmentId={equipment.id}
              equipmentName={equipment.name}
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
                <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove {equipment.name} from the
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

        <Link
          href={`/dashboard/item/${equipment.id}`}
          className="font-display text-foreground text-xl leading-tight font-bold"
        >
          {equipment.name}
        </Link>
        <p className="text-muted-foreground mt-1 line-clamp-2 min-h-10 text-sm">
          {equipment.description}
        </p>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 pb-4">
        <div className="bg-muted/30 space-y-3 rounded-xl p-4 text-sm">
          <div className="text-muted-foreground flex items-center">
            <Fingerprint className="text-primary/70 mr-2 h-4 w-4" />
            <span className="font-mono text-xs">{equipment.serialNumber}</span>
          </div>

          {!isAvailable && equipment.lendingHistories[0].borrower?.name && (
            <div className="text-foreground border-border/50 flex items-start border-t pt-2">
              <Box className="mt-0.5 mr-2 h-4 w-4 text-amber-500" />
              <div>
                <p className="font-medium">
                  {equipment.lendingHistories[0].borrower?.name}
                </p>
                {equipment.lendingHistories[0].borrowedAt && (
                  <div className="text-muted-foreground mt-1 flex items-center text-xs">
                    <CalendarClock className="mr-1 h-3 w-3" />
                    Borrowed{" "}
                    {formatDistanceToNow(
                      new Date(equipment.lendingHistories[0].borrowedAt),
                      {
                        addSuffix: true,
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-0">
        {isAvailable ? (
          <BorrowModal equipment={equipment} />
        ) : (
          <ReturnButton
            id={equipment.id}
            borrowedAt={equipment.lendingHistories[0].borrowedAt}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default EquipmentCard;
