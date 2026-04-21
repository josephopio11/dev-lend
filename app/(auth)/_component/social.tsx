"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { signIn } from "@/lib/auth-client";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function SocialSignIn() {
  const handleSocialSignIn = async (
    provider: "google" | "github" | "facebook",
  ) => {
    await signIn.social({
      provider: provider,
    });
  };
  return (
    <Field>
      <div className="flex w-full flex-row gap-2">
        <Button
          variant="outline"
          type="button"
          className="text-foreground/70 w-full flex-1"
          onClick={() => handleSocialSignIn("google")}
        >
          <FcGoogle className="h-4 w-4 md:mr-2" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          className="text-foreground/70 w-full flex-1"
          onClick={() => handleSocialSignIn("github")}
        >
          <FaGithub className="h-4 w-4 md:mr-2" />
          GitHub
        </Button>
        <Button
          variant="outline"
          type="button"
          className="text-foreground/70 w-full flex-1"
          onClick={() => handleSocialSignIn("facebook")}
        >
          <FaFacebook className="h-4 w-4 md:mr-2" />
          Facebook
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
