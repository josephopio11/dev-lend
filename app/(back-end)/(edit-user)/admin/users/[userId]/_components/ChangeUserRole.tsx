"use client";

import { getUniqueRoles } from "@/app/actions/users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { UserWithRole } from "better-auth/plugins";
import { CogIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  user: UserWithRole;
};

const getRoleBadgeVariant = (role: string | undefined) => {
  switch (role) {
    case "admin":
      return "default";
    case "user":
      return "secondary";
    default:
      return "outline";
  }
};

export default function ChangeUserRole({ user }: Props) {
  const [inputRole, setInputRole] = useState<string | undefined>(user.role);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = async () => {
    console.log("Role changed to:", inputRole);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchRoles = async () => {
      // delay by 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const res = await getUniqueRoles();
      setRoles(res);
      setIsLoading(false);
    };
    fetchRoles();
  }, []);

  return (
    <div>
      <Card
        className={cn(
          "border-border bg-card w-full p-6 transition-all duration-300",
          isLoading && "animate-pulse shadow-2xl shadow-black",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-lg">
            <CogIcon className="text-destructive size-5" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Change Role
            </h2>
            <p className="text-muted-foreground text-sm">
              Change user's role in this app
            </p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Your current role is
            <Badge
              variant={getRoleBadgeVariant(user.role)}
              className="ml-2 capitalize"
            >
              {user.role}
            </Badge>
          </p>

          <div className="flex gap-2">
            <Select
              value={inputRole}
              onValueChange={(value) => setInputRole(value)}
            >
              <SelectTrigger className="w-full flex-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Roles</SelectLabel>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="capitalize">
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={() => handleRoleChange()}
              disabled={inputRole === user.role}
            >
              Change Role
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
