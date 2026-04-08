"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  revokeOtherSessions?: boolean;
};

export default function PasswordChange() {
  const [data, setData] = useState<ChangePasswordType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    revokeOtherSessions: false,
  });
  const [error, setError] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updatePassData = (passwords: Partial<ChangePasswordType>) => {
    setError(null);
    setData((prev) => ({ ...prev, ...passwords }));
  };

  const handlePasswordChange = async (passwords: ChangePasswordType) => {
    setError(null);
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setError("Please fill in all the required fields");
      toast.error("Please fill in all the required fields", {
        id: "password-toast",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match", {
        id: "password-toast",
      });
      setError("Passwords don't match");
      return;
    }
    try {
      setIsLoading(true);
      //   const { data, error } = await clientAdmin.changePassword({
      //     newPassword: passwords.newPassword,
      //     currentPassword: passwords.currentPassword,
      //     revokeOtherSessions: passwords.revokeOtherSessions,
      //   });

      console.table(passwords);
      console.log(data);
      console.table(error);

      //   if (error) {
      //     toast.error(error.message || "Failed to change password", {
      //       id: "password-toast",
      //     });
      //     setError(error.message);
      //     return;
      //   }

      if (data) {
        toast.success("Password changed successfully", {
          description: `You have changed your password successfully
            ${
              passwords.revokeOtherSessions
                ? ". All other sessions have been revoked"
                : "."
            }`,
          id: "password-toast",
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-fit w-full">
      {isLoading && (
        <div className="bg-background/50 absolute z-10 flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-sm">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}
      <Card className="border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-lg">
            <Lock className="text-destructive size-5" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-semibold">Security</h2>
            <p className="text-muted-foreground text-sm">
              Manage your password and security settings
            </p>
          </div>
        </div>

        <Separator className="my-6" />
        {error && (
          <div className="bg-destructive/10 rounded-lg p-4">
            <p className="text-destructive">{error}</p>
          </div>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              required
              value={data.currentPassword}
              onChange={(e) =>
                updatePassData({ currentPassword: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              required
              value={data.newPassword}
              onChange={(e) => updatePassData({ newPassword: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={data.confirmPassword}
              onChange={(e) =>
                updatePassData({ confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="revokeOtherSessions"
              checked={data.revokeOtherSessions}
              onCheckedChange={(checked) =>
                updatePassData({ revokeOtherSessions: checked })
              }
            />
            <Label>Revoke other sessions</Label>
          </div>
          <Button onClick={() => handlePasswordChange(data)}>
            Update Password
          </Button>
        </div>
      </Card>
    </div>
  );
}
