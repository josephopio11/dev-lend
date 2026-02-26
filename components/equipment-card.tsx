import { deleteEquipment, returnItem } from "@/app/actions/dashboard";
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
import { Equipment } from "@/lib/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowRightLeft,
  Box,
  CalendarClock,
  Fingerprint,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import BorrowModal from "./borrow-modal";
import HistoryModal from "./history-modal";

interface EquipmentCardProps {
  equipment: Equipment;
  index: number;
}

const EquipmentCard = ({ equipment, index }: EquipmentCardProps) => {
  const isAvailable = equipment.status === "AVAILABLE";

  const handleReturn = async () => {
    const res = await returnItem(equipment.id, equipment.borrowedAt!);

    toast.success("Returned successfully", {
      description: JSON.stringify(res, null, 2),
    });
  };

  const handleDelete = async () => {
    const data = await deleteEquipment(equipment.id);
    toast.success("Deleted successfully", {
      description: JSON.stringify(data, null, 2),
    });
  };

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col animate-in-stagger"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 items-center">
            <Badge
              variant="outline"
              className={`
                font-medium rounded-full px-3 py-1 border-0
                ${
                  isAvailable
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300"
                }
              `}
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
                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <h3 className="font-display font-bold text-xl text-foreground leading-tight">
          {equipment.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 min-h-10">
          {equipment.description}
        </p>
      </CardHeader>

      <CardContent className="pb-4 flex-1 relative z-10">
        <div className="space-y-3 bg-muted/30 p-4 rounded-xl text-sm">
          <div className="flex items-center text-muted-foreground">
            <Fingerprint className="h-4 w-4 mr-2 text-primary/70" />
            <span className="font-mono text-xs">{equipment.serialNumber}</span>
          </div>

          {!isAvailable && equipment.borrowerName && (
            <div className="flex items-start text-foreground pt-2 border-t border-border/50">
              <Box className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
              <div>
                <p className="font-medium">{equipment.borrowerName}</p>
                {equipment.borrowedAt && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <CalendarClock className="h-3 w-3 mr-1" />
                    Borrowed{" "}
                    {formatDistanceToNow(new Date(equipment.borrowedAt), {
                      addSuffix: true,
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 relative z-10">
        {isAvailable ? (
          <BorrowModal equipment={equipment} />
        ) : (
          <Button
            variant="outline"
            className="w-full rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-900/30 group/btn"
            onClick={handleReturn}
          >
            <ArrowRightLeft className="mr-2 h-4 w-4 transition-transform group-hover/btn:-rotate-180" />
            Process Return
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EquipmentCard;
