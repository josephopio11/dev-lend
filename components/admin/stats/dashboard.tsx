"use client";

import { AdminStats } from "@/app/actions/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft, Package, UserCog, Users } from "lucide-react";
import { ItemsChart } from "./items-chart";
import { ItemsTable } from "./items-table";

type UserDashboardProps = {
  data: AdminStats;
};

export function UserDashboard({ data }: UserDashboardProps) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      description: `${data.adminUsers} admins, ${data.users} regular`,
      icon: Users,
    },
    {
      title: "Admin Users",
      value: data.adminUsers,
      description: "System administrators",
      icon: UserCog,
    },
    {
      title: "Total Items",
      value: data.totalItems,
      description: "Items in inventory",
      icon: Package,
    },
    {
      title: "Total Borrowings",
      value: data.totalBorrowings,
      description: "All-time borrowings",
      icon: ArrowRightLeft,
    },
  ];
  return (
    <div className="">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-card border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4 bg-card border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Item Borrowings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Borrowing count per item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemsChart data={data.itemsCount} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-card border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Items Overview</CardTitle>
            <CardDescription className="text-muted-foreground">
              Detailed item statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ItemsTable data={data.itemsCount} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
