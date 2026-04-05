"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ItemCount {
  id: string;
  name: string;
  count: number;
}

interface ItemsTableProps {
  data: ItemCount[];
}

export function ItemsTable({ data }: ItemsTableProps) {
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-muted-foreground">Item Name</TableHead>
          <TableHead className="text-right text-muted-foreground">
            Times
          </TableHead>
          <TableHead className="text-right text-muted-foreground">%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          const percentage = ((item.count / totalCount) * 100).toFixed(0);
          return (
            <TableRow key={item.id} className="border-border">
              <TableCell className="font-medium text-foreground">
                <span className="line-clamp-1" title={item.name}>
                  {item.name.slice(0, 18) +
                    (item.name.length > 18 ? "..." : "")}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {item.count}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {percentage}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
