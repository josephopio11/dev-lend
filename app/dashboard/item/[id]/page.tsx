import BackArrow from "@/components/back-arrow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { formatMyDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleItemPage({ params }: PageProps) {
  const { id } = await params;

  const item = await prisma.equipment.findUnique({
    where: { id },
    include: {
      lendingHistories: {
        include: {
          borrower: true,
        },
        orderBy: {
          borrowedAt: "desc",
        },
        take: 2,
      },
      _count: {
        select: { lendingHistories: true },
      },
    },
  });

  console.log(item);

  if (!item) return null;

  return (
    <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10 space-y-4">
      {/* Hero / Header Section */}
      <BackArrow />
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {item.name} details
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
            Manage checkouts, track availability, and maintain your hardware
            catalog seamlessly.
          </p>
        </div>

        {/* Stats quick view */}
        <div className="flex gap-4 p-4 bg-card rounded-2xl border shadow-xl">
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-primary">
              {/* {item._count.lendingHistories} */}
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Borrowings
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full  flex-1 shadow-xl">
          <CardHeader>
            <CardTitle className="flex gap-2">
              Serial: <pre>{item.serialNumber}</pre>
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardAction>
              <Button variant="link">
                {item.deletedItem ? "Deleted" : "Not deleted"}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Key</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell className="text-right">{item.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date Added</TableCell>
                  <TableCell className="text-right">
                    {formatMyDate(item.createdAt.toString())}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Item Deleted</TableCell>
                  <TableCell className="text-right">
                    {item.deletedItem ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Times Borrowed</TableCell>
                  <TableCell className="text-right">
                    {/* {item._count.lendingHistories} */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="flex-2 shadow-xl">
          <div className="relative border-l-2 border-primary/20 mx-3 pl-6 space-y-8 ">
            {/* {item?.lendingHistories.map((record) => (
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
            ))} */}
          </div>
        </Card>
      </div>
    </main>
  );
}
