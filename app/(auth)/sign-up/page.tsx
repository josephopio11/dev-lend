"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp, useSession } from "@/lib/auth-client";
import { Github, RectangleGoggles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  if (session?.user.email) router.push("/dashboard");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      toast.error("Something went wrong", { description: res.error.message });
    } else {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to create an account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Okalebo Irigei"
            required
          />
        </Field>
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
          <FieldLabel htmlFor="password">Password</FieldLabel>{" "}
          <Input
            id="password"
            placeholder="y0ur-5tron9-p@ssword"
            type="password"
            name="password"
            required
          />
        </Field>

        <Field>
          <Button type="submit">Sign Up</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <div className="flex flex-row gap-2 w-full">
            <Button variant="outline" type="button" className="w-full flex-1">
              <Github />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="w-full flex-1">
              <RectangleGoggles />
              Google
            </Button>
          </div>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <a href="/sign-in" className="underline underline-offset-4">
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
