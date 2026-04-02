import { getAllBorrowers } from "@/app/actions/borrower";
import BorrowersPageContent from "./BorrowersPageContent";

export default async function BorrowersPage() {
  const borrowers = await getAllBorrowers();

  // console.log(borrowers);

  if (!borrowers) return null;

  return <BorrowersPageContent borrowers={borrowers} />;
}
