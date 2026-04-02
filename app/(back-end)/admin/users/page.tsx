import { getAllUsers } from "@/lib/auth-server";
import { UsersTable } from "./UsersTable";

export default async function UsersPage() {
  const data = await getAllUsers();

  return (
    <div>
      <UsersTable users={data.users} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
