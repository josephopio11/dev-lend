import BanUserModal from "@/components/admin/ban-user-modal";
import UnbanUserModal from "@/components/admin/unban-user-modal";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { UserWithRole } from "better-auth/plugins";
import { FcCancel } from "react-icons/fc";
import { BanCountDownTimer } from "./BanCountDownTimer";

type Props = {
  user: UserWithRole;
};

export function BanForm({ user }: Props) {
  return (
    <Card className="border-border bg-card w-full p-6 shadow-xl transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-destructive/10 flex size-10 items-center justify-center rounded-lg">
          <FcCancel className="text-primary size-5" />
        </div>
        <div>
          <h2 className="text-foreground text-lg font-semibold">
            {user.banned ? "Unban" : "Ban"} {user.name}
          </h2>

          <p className="text-muted-foreground text-sm">
            {user.banned ? "Unban" : "Ban"} {user.name}'s account.
          </p>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="space-y-4">
        <div className="space-y-2 text-base">
          {user.banned && user.banExpires && (
            <BanCountDownTimer
              banned={!!user.banned}
              banExpires={user.banExpires!}
            />
          )}
          {user.banReason && (
            <div className="space-y-2 text-base">
              <p className="text-destructive text-sm">
                This account is banned.
              </p>
              <p className="text-muted-foreground text-sm">
                Latest Ban Reason:{" "}
                <span className="font-bold text-emerald-500">
                  {user.banReason}
                </span>
              </p>
            </div>
          )}
          {user.banned && !user.banExpires && (
            <p className="text-destructive text-sm font-bold">
              This account is permanently banned
            </p>
          )}
        </div>
        {!user.banned && (
          <p className="text-muted-foreground text-sm">
            If this account is suspected or involved in any illegal activity,
            please go ahead and ban this account.
          </p>
        )}
        {user.banned ? (
          <UnbanUserModal id={user.id} name={user.name} isInPage={true} />
        ) : (
          <BanUserModal id={user.id} name={user.name} isInPage={true} />
        )}
      </div>
    </Card>
  );
}
