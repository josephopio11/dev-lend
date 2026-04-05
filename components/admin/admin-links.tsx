"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IconUser, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const AdminLinks = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Admin",
      href: "/admin",
      icon: IconUser,
    },
    {
      name: "All Users",
      href: "/admin/users",
      icon: IconUser,
    },
    {
      name: "Add User",
      href: "/admin/users/add",
      icon: IconUserPlus,
    },
  ];
  return (
    <div className="w-full">
      <Card className="shadow-xl ">
        <CardContent>
          <div className="grid grid-cols-3 gap-2 ">
            {links.map((link) => (
              <Button
                asChild
                variant={pathname === link.href ? "default" : "outline"}
                key={link.name}
              >
                <Link href={link.href}>
                  <link.icon className=" h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    </div>
  );
};
