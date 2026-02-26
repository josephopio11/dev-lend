import { getAllEquipments } from "../actions/dashboard";
import DashboardPageContent from "./DashboardPageContent";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const equipment = await getAllEquipments();
  return <DashboardPageContent equipment={equipment} />;
}
