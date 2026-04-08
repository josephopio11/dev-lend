import { getUserById } from "@/app/actions/users";
import AdminBackButton from "@/components/admin/admin-back-button";
import { UserPageContent } from "./UserPageContent";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  if (!userId) return null;
  const userInfo = await getUserById(userId);

  return (
    <main className="relative z-10 container mx-auto max-w-7xl flex-1 px-4 py-8">
      <AdminBackButton />

      {/* Hero / Header Section */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-foreground text-4xl font-bold tracking-tight text-balance md:text-5xl">
            {userInfo.name}&apos;s Profile
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Manage {userInfo.name} on this system.
          </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <UserPageContent user={userInfo} />
      </div>
    </main>
  );
}
