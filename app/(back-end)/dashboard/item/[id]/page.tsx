import MenuWithBackArrow from "@/components/dashboard/back-arrow";
import BorrowModal from "@/components/dashboard/borrow-modal";
import { ReturnButton } from "@/components/dashboard/return-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { format } from "date-fns";
import { ArrowRightLeft, CheckCircle2, User } from "lucide-react";

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
        // take: 2,
      },
      _count: {
        select: { lendingHistories: true },
      },
    },
  });

  // console.log(item);

  if (!item) return null;

  const isAvailable = item.lendingHistories[0]?.returnedAt !== null;

  return (
    <main className="relative z-10 container mx-auto max-w-7xl flex-1 space-y-4 px-4 py-8">
      {/* Hero / Header Section */}
      <MenuWithBackArrow />
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {item.name} details
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Manage checkouts, track availability, and maintain your hardware
            catalog seamlessly.
          </p>
        </div>

        {/* Stats quick view */}
        <div className="bg-card flex gap-4 rounded-2xl border p-4 shadow-xl">
          <div className="px-4 text-center">
            <div className="font-display text-primary text-3xl font-bold">
              {item._count.lendingHistories}
            </div>
            <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Borrowings
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="w-full flex-1 shadow-xl">
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
                  <TableCell className="text-right">
                    {item.lendingHistories[0]?.returnedAt === null
                      ? "Available"
                      : "Borrowed"}
                  </TableCell>
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
                    {item._count.lendingHistories}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            {isAvailable ? (
              <BorrowModal equipment={item} />
            ) : (
              <ReturnButton
                id={item.id}
                borrowedAt={item.lendingHistories[0].borrowedAt}
              />
            )}
          </CardFooter>
        </Card>

        <Card className="flex-2 shadow-xl">
          <div className="border-primary/20 relative mx-3 space-y-8 border-l-2 pl-6">
            {item?.lendingHistories.map((record) => (
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
                          {record.borrower.name}
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
        </Card>
      </div>
    </main>
  );
}
