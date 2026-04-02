"use client";

import { clientAdmin } from "@/lib/auth-client";
import { IconCancel } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function StopImpersonating() {
  const router = useRouter();

  const handleStopImpersonating = async () => {
    await clientAdmin.stopImpersonating();
    router.push("/admin/users");
  };

  return (
    <Button
      size={"xs"}
      variant={"destructive"}
      className="  my-1"
      onClick={handleStopImpersonating}
    >
      <IconCancel className="mr-1 h-4 w-4" />
      Stop Impersonating
    </Button>
  );
}
