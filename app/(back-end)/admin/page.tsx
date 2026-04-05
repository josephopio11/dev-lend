import { getStats } from "@/app/actions/users";
import { UserDashboard } from "@/components/admin/stats/dashboard";

export default async function AdminPage() {
  const stats = await getStats();
  return <UserDashboard data={stats} />;
}
