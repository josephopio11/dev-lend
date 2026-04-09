"use client";

import { SessionCards } from "@/components/admin/session-cards";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { UserWithRole } from "better-auth/plugins";
import { Loader2, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BanCountDownTimer } from "./_components/BanCountDownTimer";
import PasswordChange from "./_components/PasswordChange";

type Props = {
  user: UserWithRole;
};

export function UserPageContent({ user }: Props) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInfo = async () => {
    setIsLoading(true);
    // console.log(userInfo);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setIsLoading(false);
  };

  const toggleNotification = async (item: string, value: boolean) => {
    const data = !value;

    console.log(data);
    console.log(value);
  };

  const isBanned = user.banned;
  const statusText = isBanned ? "banned" : "not banned";
  const actionText = isBanned ? "active" : "banned";

  return (
    <Tabs defaultValue="user_settings">
      <Card className="border-border bg-card dark:shadow-primary/20 p-4 shadow-xl transition-all hover:shadow-md">
        <TabsList>
          <TabsTrigger value="user_settings">User Settings</TabsTrigger>
          <TabsTrigger value="danger_zone">Advanced Settings</TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="user_settings">
        <div className="grid w-full grid-cols-1 flex-col gap-2 space-y-4 md:grid-cols-2">
          <Card
            className={cn(
              "border-border bg-card w-full p-6",
              user.banned && "border-t-4 border-t-red-500",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                <User className="text-primary size-5" />
              </div>
              <div>
                <h2 className="text-foreground text-lg font-semibold">
                  Account Information
                </h2>
                {user.banned && user.banExpires && (
                  <BanCountDownTimer
                    banned={!!user.banned}
                    banExpires={user.banExpires!}
                  />
                )}
                {user.banned && !user.banExpires && (
                  <p className="text-xs">
                    <span className="text-destructive font-bold">
                      This account is permanently banned
                    </span>
                    . Reason: {user.banReason}
                  </p>
                )}
                <p className="text-muted-foreground text-sm">
                  Update {user.name}'s personal details
                </p>
              </div>
            </div>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}

            <Separator className="my-2" />

            <div className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    User is {statusText}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {isBanned && (
                      <>
                        Reason:{" "}
                        <span className="underline">{user.banReason}</span>.
                        <br />
                      </>
                    )}
                    Toggle the switch to make the user {actionText}
                  </p>
                </div>
                <Switch checked={!!user.banned} />
              </div>

              <Button
                onClick={handleUserInfo}
                className="min-w-30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Card>
          <PasswordChange />
          <div></div>
        </div>
      </TabsContent>

      <TabsContent value="danger_zone">
        <div className="grid w-full grid-cols-1 flex-col gap-2 space-y-4">
          <Card className="bg-card">
            <SessionCards id={user.id} />
          </Card>
          {/* Danger Zone */}
          <Card className="border-destructive/50 bg-card p-6">
            <div>
              <h2 className="text-destructive text-lg font-semibold">
                Danger Zone
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Irreversible actions for your account
              </p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    Delete Account
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
