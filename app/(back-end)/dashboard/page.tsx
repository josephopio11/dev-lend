import { getAllEquipments } from "@/app/actions/dashboard";
import DashboardPageContent from "./DashboardPageContent";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const equipment = await getAllEquipments();
  // console.log(equipment);

  return <DashboardPageContent equipment={equipment} />;
}
