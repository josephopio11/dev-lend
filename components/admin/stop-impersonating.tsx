"use client";

import { clientAdmin, useSession } from "@/lib/auth-client";
import { UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function StopImpersonating() {
  const router = useRouter();
  const { refetch } = useSession();

  const handleStopImpersonating = async () => {
    await clientAdmin.stopImpersonating();
    refetch();
    router.refresh();
    new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/admin/users");
  };

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      className="shadow-foreground/30 shadow-md"
      onClick={handleStopImpersonating}
    >
      <UserRoundX className="h-4 w-4" />
    </Button>
  );
}
