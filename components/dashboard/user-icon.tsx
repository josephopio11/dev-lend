"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { createNameAvatar } from "@/lib/utils";
import { IconLogout, IconUserCircle, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserIconProps = {
  email: string;
  name: string;
  image?: string | null | undefined;
  role?: string | null | undefined;
};

function UserIcon({ email, name, image, role }: UserIconProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant={"ghost"}
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-full outline-none focus:outline-none"
        >
          <Avatar className="h-8 w-8 rounded-full grayscale">
            <AvatarImage src={image || ""} alt={name} />
            <AvatarFallback className="rounded-full">
              {createNameAvatar(name)}
            </AvatarFallback>
          </Avatar>
          {/* <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {email}
            </span>
          </div> */}
          {/* <IconDotsVertical className="ml-auto size-4" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={image || ""} alt={name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account">
              <IconUserCircle />
              Account
            </Link>
          </DropdownMenuItem>
          {role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <IconUsers />
                Admin
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserIcon;
