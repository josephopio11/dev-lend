"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackArrow = () => {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className=" rounded-lg shadow-sm"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};

export default BackArrow;
