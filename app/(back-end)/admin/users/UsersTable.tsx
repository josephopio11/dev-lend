"use client";

import BanUserModal from "@/components/admin/ban-user-modal";
import ChangePasswordModal from "@/components/admin/change-password-modal";
import DeleteUserModal from "@/components/admin/delete-user-modal";
import ImpersonateUserModal from "@/components/admin/impersonate-user-modal";
import RevokeSessionsModal from "@/components/admin/revoke-all-sessions-modal";
import UnbanUserModal from "@/components/admin/unban-user-modal";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IconBan, IconEdit, IconStar } from "@tabler/icons-react";
import { UserWithRole } from "better-auth/plugins";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface UsersTableProps {
  users: UserWithRole[];
}

type SortField = "name" | "email" | "role" | "createdAt";
type SortDirection = "asc" | "desc";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRoleBadgeVariant = (role: string | undefined) => {
  switch (role) {
    case "admin":
      return "default";
    case "moderator":
      return "secondary";
    case "viewer":
      return "outline";
    default:
      return "secondary";
  }
};

export function UsersTable({ users }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "role":
          comparison = (a.role || "user").localeCompare(b.role || "user");
          break;
        case "createdAt":
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [users, search, roleFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="text-muted-foreground/50 ml-1 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  const uniqueRoles = useMemo(() => {
    const roles = new Set(users.map((user) => user.role || "user"));
    return Array.from(roles).sort();
  }, [users]);

  return (
    <>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>A list of all users in the system.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {uniqueRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredAndSortedUsers.length === 0 ? (
          <div className="text-muted-foreground flex items-center justify-center py-12">
            {users.length === 0
              ? "No users found. Add a user to get started."
              : "No users match your search criteria."}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="hover:bg-muted/50 cursor-pointer select-none"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      <SortIcon field="name" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hover:bg-muted/50 cursor-pointer select-none"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center">
                      Email
                      <SortIcon field="email" />
                    </div>
                  </TableHead>

                  <TableHead
                    className="hover:bg-muted/50 cursor-pointer select-none"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Created
                      <SortIcon field="createdAt" />
                    </div>
                  </TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className={cn(
                      user.banned && "bg-primary/30 text-muted-foreground",
                    )}
                  >
                    <TableCell className="flex gap-2 font-medium">
                      {user.name}
                      {user.banned && (
                        <IconBan className="text-destructive h-4 w-4" />
                      )}
                      {user.role === "admin" && (
                        <IconStar className="h-4 w-4 text-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-muted-foreground flex items-center justify-end gap-0.5 truncate font-mono text-xs">
                      <Button variant="ghost" size="icon-xs" asChild>
                        <Link href={`/admin/users/${user.id}`}>
                          <IconEdit
                            className="h-4 w-4"
                            title="Change Password"
                          />
                        </Link>
                      </Button>
                      <ChangePasswordModal
                        id={user.id}
                        name={user.name}
                        email={user.email}
                      />
                      <RevokeSessionsModal
                        id={user.id}
                        name={user.name}
                        email={user.email}
                      />
                      <DeleteUserModal id={user.id} name={user.name} />
                      {user.banned ? (
                        <UnbanUserModal id={user.id} name={user.name} />
                      ) : (
                        <BanUserModal id={user.id} name={user.name} />
                      )}
                      <ImpersonateUserModal id={user.id} name={user.name} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {users.length > 0 && (
          <div className="text-muted-foreground text-sm">
            Showing {filteredAndSortedUsers.length} of {users.length} users
          </div>
        )}
      </CardContent>
    </>
  );
}
