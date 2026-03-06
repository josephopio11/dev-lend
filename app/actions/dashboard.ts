"use server";

import { requireAuth } from "@/lib/auth-server";
import { EquipmentStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllEquipments() {
  const session = await requireAuth();

  const data = await prisma.equipment.findMany({
    where: {
      userId: session.user.id,
      deletedItem: false,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  // console.log(data);
  return data;
}

export async function addEquipment(
  name: string,
  serialNumber: string,
  description: string,
) {
  const session = await requireAuth();

  const data = await prisma.equipment.create({
    data: { name, serialNumber, description, userId: session.user.id },
  });

  revalidatePath("/dashboard");

  return data;
}

export async function getEquipmentHistory(equipmentId: string) {
  const session = await requireAuth();

  const data = await prisma.lendingHistory.findMany({
    where: { equipmentId, lentById: session.user.id },
    orderBy: { borrowedAt: "desc" },
    take: 3,
  });

  return data;
}

export async function borrowItem(equipmentId: string, borrowerName: string) {
  const session = await requireAuth();

  const equipmentStatus = EquipmentStatus.BORROWED;
  const currentTime = new Date();
  const data = await prisma.equipment.update({
    where: {
      id: equipmentId,
    },
    data: {
      status: equipmentStatus,
      borrowerName,
      borrowedAt: currentTime,
      userId: session.user.id,
    },
  });

  const lent = await prisma.lendingHistory.create({
    data: {
      borrowedAt: currentTime,
      equipmentId: data.id,
      borrowerName,
      lentById: session.user.id,
    },
  });

  revalidatePath("/dashboard");

  return { data, lent };
}

export async function returnItem(equipmentId: string, borrowedAt: Date) {
  const session = await requireAuth();

  const data = await prisma.equipment.update({
    where: {
      id: equipmentId,
    },
    data: {
      borrowerName: null,
      status: EquipmentStatus.AVAILABLE,
      borrowedAt: null,
    },
  });

  const lent = await prisma.lendingHistory.updateMany({
    where: {
      equipmentId,
      borrowedAt,
    },
    data: {
      returnedAt: new Date(),
      returnedToId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
  return { data, lent };
}

export async function deleteEquipment(equipmentId: string) {
  const session = await requireAuth();

  const existingItem = await prisma.equipment.findUnique({
    where: {
      id: equipmentId,
      userId: session.user.id,
    },
  });

  if (existingItem?.status === "BORROWED") {
    return { message: "You can't delete this item when it has been borrowed" };
  }

  const data = await prisma.equipment.update({
    where: {
      id: equipmentId,
    },
    data: {
      deletedItem: true,
    },
  });
  revalidatePath("/dashboard");

  return data;
}
