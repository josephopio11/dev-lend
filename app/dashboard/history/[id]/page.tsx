import { getEquipmentHistory } from "@/app/actions/dashboard";
import BackArrow from "@/components/back-arrow";
import BorrowModal from "@/components/borrow-modal";
import { ReturnButton } from "@/components/return-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRightLeft, CheckCircle2, History, User } from "lucide-react";

export const metadata = {
  title: "History",
};

type HistoryDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function HistoryDetailsPage({
  params,
}: HistoryDetailsPageProps) {
  const { id } = await params;

  const data = await getEquipmentHistory(id, true);

  console.log(data);

  if (!data) return null;

  const isAvailable = data.lendingHistories[0].returnedAt === null;

  if (data.lendingHistories.length === 0) {
    return (
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Hero / Header Section */}
        <BackArrow />
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              {data?.name} History
            </h1>
            <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
              {data?.serialNumber}
            </p>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
              {data?.description}
            </p>
          </div>

          {/* Stats quick view */}
          <div className="flex gap-4 p-4 bg-card rounded-2xl border shadow-sm">
            <div className="text-center flex-1 px-4  border-border">
              <div className="text-3xl font-display font-bold text-amber-500">
                {data?.lendingHistories.length}
              </div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Never borrowed
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
          <History className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">
            No lending history yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10 space-y-4">
      <div className="w-full flex justify-between items-center ">
        <BackArrow />
        {isAvailable ? (
          <BorrowModal equipment={data} small={true} />
        ) : (
          <ReturnButton
            id={id}
            borrowedAt={data?.lendingHistories[0].borrowedAt}
            small={true}
          />
        )}
      </div>
      {/* Hero / Header Section */}

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {data?.name} History
          </h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
            {data?.serialNumber}
          </p>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            {data?.description}
          </p>
        </div>

        {/* Stats quick view */}
        <div className="flex gap-4 p-4 bg-card rounded-2xl border shadow-sm">
          <div className="text-center flex-1 px-4  border-border">
            <div className="text-3xl font-display font-bold text-amber-500">
              {data?.lendingHistories.length}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Times Borrowed
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-l-2 border-primary/20 ml-3 pl-6 space-y-8 ">
        {data?.lendingHistories.map((record) => (
          <Card key={record.id} className="relative shadow-xl p-0">
            <div className="absolute -left-7.75 top-1 h-2.5 w-2.5 rounded-full bg-primary border-4 border-background shadow-[0_0_0_2px_rgba(var(--primary),0.1)]" />

            <div className="bg-card border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-none">
                      {record.borrower.name}
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
                      <span className="text-amber-600 italic">In progress</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
