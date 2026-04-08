"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SocialSignIn() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };
  return (
    <Field>
      <div className="flex w-full flex-row gap-2">
        {/* <Button variant="outline" type="button" className="w-full flex-1">
          <Github />
          GitHub
        </Button> */}
        <Button
          variant="outline"
          type="button"
          className="text-foreground/70 w-full flex-1"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </FieldDescription>
    </Field>
  );
}
