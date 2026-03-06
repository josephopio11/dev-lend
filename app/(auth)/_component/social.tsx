"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { signIn } from "@/lib/auth-client";

export default function SocialSignIn() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };
  return (
    <Field>
      <div className="flex flex-row gap-2 w-full">
        {/* <Button variant="outline" type="button" className="w-full flex-1">
          <Github />
          GitHub
        </Button> */}
        <Button
          variant="outline"
          type="button"
          className="w-full flex-1 text-foreground/70"
          onClick={handleGoogleSignIn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={"currentColor"}
            viewBox={"0 0 24 24"}
          >
            {/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.91 8.91 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625" />
          </svg>
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
