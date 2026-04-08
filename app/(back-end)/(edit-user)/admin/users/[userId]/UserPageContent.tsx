"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UserWithRole } from "better-auth/plugins";
import { Bell, Loader2, Mail, Save, User } from "lucide-react";
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
    console.log(userInfo);
  };

  const toggleNotification = async (item: string, value: boolean) => {
    const data = !value;

    console.log(data);
    console.log(value);
  };

  return (
    <Tabs defaultValue="user_settings">
      <Card className="border-border bg-card dark:shadow-primary/20 p-4 shadow-xl transition-all hover:shadow-md">
        <TabsList>
          <TabsTrigger value="user_settings">User Settings</TabsTrigger>
          <TabsTrigger value="profile_settings">Profile Settings</TabsTrigger>
          <TabsTrigger value="danger_zone">Advanced Settings</TabsTrigger>
        </TabsList>
      </Card>
      <TabsContent value="user_settings">
        <div className="grid w-full grid-cols-1 space-y-4 space-x-4 md:grid-cols-2">
          <div className="space-y-4">
            {/* Account Settings */}
            <Card
              className={cn(
                "border-border bg-card p-6",
                user.banned && "border-t-4 border-red-500",
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
                      User is {user.banned ? "banned" : "not banned"}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {user.banned && "Reason: "}
                      <span className="underline">{user.banReason}</span>.{" "}
                      <br />
                      Toggle the switch to make the user{" "}
                      {user.banned ? "active" : "banned"}
                    </p>
                  </div>
                  <Switch checked={!!user.banned} />
                </div>

                <Button onClick={handleUserInfo} className="min-w-30">
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>

                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                </Button>
              </div>
            </Card>
          </div>
          {/* <PasswordChange /> */}
          <div className="space-y-4">{/* Security Settings */}</div>
        </div>
      </TabsContent>
      <TabsContent value="profile_settings">
        <div className="grid w-full grid-cols-1 space-y-4 space-x-4 md:grid-cols-2">
          <div className="space-y-4">
            {/* Account Settings */}
            <Card className="border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                  <User className="text-primary size-5" />
                </div>
                <div>
                  <h2 className="text-foreground text-lg font-semibold">
                    Profile Settings
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Update your profile information and details
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" readOnly disabled />
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+60 11 1234 5678"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Some Place in Malaysia" />
                  </div>
                </div>

                <Button onClick={handleUserInfo} className="min-w-30">
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                </Button>
              </div>
            </Card>

            {/* Email Preferences */}

            <Card className="border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 flex size-10 items-center justify-center rounded-lg">
                  <Mail className="text-accent size-5" />
                </div>
                <div>
                  <h2 className="text-foreground text-lg font-semibold">
                    Email Preferences
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Manage your email notifications
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Booking Confirmations
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Receive emails when bookings are confirmed
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Request Updates
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Get notified about request status changes
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      New Bands
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Discover new bands in your favorite genres
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Marketing Emails
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Promotional content and special offers
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            {/* Notification Settings */}
            <Card className="border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="bg-chart-4/10 flex size-10 items-center justify-center rounded-lg">
                  <Bell className="text-chart-4 size-5" />
                </div>
                <div>
                  <h2 className="text-foreground text-lg font-semibold">
                    Push Notifications
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Manage your push notification settings
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Booking Reminders
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Reminders for upcoming bookings
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Message Notifications
                    </p>
                    <p className="text-muted-foreground text-sm">
                      New messages from bands or venues
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      Request Responses
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Updates on your booking requests
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <PasswordChange />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="danger_zone">
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
      </TabsContent>
    </Tabs>
  );
}
