"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}

export async function getAllUsers() {
  const users = await auth.api.listUsers({
    query: {
      // searchValue: "Joseph",
      // searchField: "name",
      // searchOperator: "contains",
      // limit: 100,
      // offset: 100,
      // sortBy: "name",
      // sortDirection: "desc",
      // filterField: "email",
      // filterValue: "hello@example.com",
      // filterOperator: "eq",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  return users;
}
