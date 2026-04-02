import AdminBackButton from "@/components/admin/admin-back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth-server";
import {
  IconUser,
  IconUserDown,
  IconUserExclamation,
  IconUserPlus,
} from "@tabler/icons-react";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: LayoutProps) {
  const user = await requireAdmin();

  console.log(user);
  return (
    <div>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <AdminBackButton />

        {/* Hero / Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              User Admin Page
            </h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
              Manage users on this system.
            </p>
          </div>
        </div>

        {/* <TestCode /> */}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full flex-1 ">
            <Card className="shadow-xl ">
              <CardContent>
                <div className="md:flex grid grid-cols-5 gap-2 w-full space-y-2 justify-between md:flex-col md:justify-start">
                  <Button asChild>
                    <Link href="/admin">
                      <IconUser className=" h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/admin/users">
                      <IconUser className=" h-4 w-4" />
                      All
                    </Link>
                  </Button>
                  <Button asChild variant={"secondary"}>
                    <Link href="/admin/users/add">
                      <IconUserPlus className=" h-4 w-4" />
                      Add
                    </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                    <Link href="/admin/users?role=admin">
                      <IconUserExclamation className=" h-4 w-4" />
                      Admins
                    </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                    <Link href="/admin/users?role=user">
                      <IconUserDown className=" h-4 w-4" />
                      Users
                    </Link>
                  </Button>
                </div>
              </CardContent>
              {/* <CardFooter></CardFooter> */}
            </Card>
          </div>

          <Card className="flex-2 shadow-xl">
            <div className="relative border-l-2 border-primary/20 mx-3  space-y-8 overflow-y-scroll ">
              {children}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
