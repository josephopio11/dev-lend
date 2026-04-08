import { getAllUsers } from "@/lib/auth-server";
import { UsersTable } from "./UsersTable";

export default async function UsersPage() {
  const data = await getAllUsers();

  return <UsersTable users={data.users} />;
}
