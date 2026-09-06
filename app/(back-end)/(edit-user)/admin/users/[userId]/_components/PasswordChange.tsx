"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
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
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card w-full p-6">
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
      <Separator className="my-2" />
      {error && (
        <div className="bg-destructive/10 rounded-lg p-4">
          <p className="text-destructive">{error}</p>
        </div>
      )}
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-foreground text-sm font-medium">
            Revoke all other sessions
          </p>

          <p className="text-muted-foreground text-sm">
            Toggle the switch to revoke all other sessions the user is logged
            in.
          </p>
        </div>
        <Switch />
      </div>
      <Button onClick={() => handlePasswordChange(data)}>
        Update Password
      </Button>
    </Card>
  );
}
