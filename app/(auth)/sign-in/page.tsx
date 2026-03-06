"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SocialSignIn from "../_component/social";

export default function SignInPage() {
  const router = useRouter();

  const { data: session } = useSession();
  if (session?.user.email) router.push("/dashboard");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      toast.error("Failed to log in", { description: res.error.message });
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            placeholder="y0ur-5tron9-p@ssword"
            type="password"
            name="password"
            required
          />
        </Field>
        <Field>
          <Button type="submit" className="text-white">
            Sign In
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <SocialSignIn />
      </FieldGroup>
    </form>
  );
}
