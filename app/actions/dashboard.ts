"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllEquipments() {
  const data = await prisma.equipment.findMany();
  console.log(data);
  return data;
}

export async function addEquipment(
  name: string,
  serialNumber: string,
  description: string,
) {
  const data = await prisma.equipment.create({
    data: { name, serialNumber, description },
  });

  revalidatePath("/dashboard");

  return data;
}

export async function getEquipmentHistory(equipmentId: string) {
  const data = await prisma.lendingHistory.findMany({
    where: { equipmentId },
  });

  return data;
}
