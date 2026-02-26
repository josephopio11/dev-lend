"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth"; // path to your Better Auth server instance

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}
