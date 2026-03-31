"use server";

import { requireAuth } from "@/lib/auth-server";
// import { EquipmentStatus } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllEquipments() {
  const session = await requireAuth();

  const data = await prisma.equipment.findMany({
    where: {
      userId: session.user.id,
      deletedItem: false,
    },
    include: {
      lendingHistories: {
        include: {
          borrower: true,
        },
        orderBy: {
          borrowedAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return data;
}

export type AllEquipmentType = Awaited<ReturnType<typeof getAllEquipments>>;
export type SingleEquipmentType = AllEquipmentType[number];

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

export async function getEquipmentHistory(
  equipmentId: string,
  isPage: boolean = false,
) {
  const session = await requireAuth();

  const itemHistory = await prisma.equipment.findUnique({
    where: { id: equipmentId, userId: session.user.id },
    include: {
      _count: {
        select: { lendingHistories: true },
      },
      lendingHistories: {
        include: {
          borrower: true,
        },
        orderBy: {
          borrowedAt: "desc",
        },
        take: isPage ? undefined : 3,
      },
    },
  });

  return itemHistory;
}

export type EquipmentHistoryType = Awaited<
  ReturnType<typeof getEquipmentHistory>
>;

export async function borrowItem(equipmentId: string, borrowerName: string) {
  const session = await requireAuth();

  const currentTime = new Date();

  const newBorrower = await prisma.borrower.upsert({
    where: {
      name: borrowerName,
    },
    create: {
      name: borrowerName,
    },
    update: {
      name: borrowerName,
    },
  });

  const data = await prisma.lendingHistory.create({
    data: {
      borrowedAt: currentTime,
      equipmentId,
      borrowerId: newBorrower.id,
      lentById: session.user.id,
    },
  });

  // console.log({ data, newBorrower });

  revalidatePath("/dashboard");

  return { data, newBorrower };
}

export async function returnItem(equipmentId: string, borrowedAt: Date) {
  const session = await requireAuth();

  const existingItem = await prisma.equipment.findUnique({
    where: {
      id: equipmentId,
      userId: session.user.id,
    },
    include: { lendingHistories: true },
  });

  if (
    existingItem?.lendingHistories &&
    existingItem?.lendingHistories.length < 1 &&
    existingItem.lendingHistories[0].returnedAt !== null
  ) {
    return { message: "You can't return this item when it is available" };
  }

  const data = await prisma.lendingHistory.updateMany({
    where: {
      equipmentId,
      borrowedAt,
    },
    data: {
      returnedAt: new Date(),
      returnedToId: session.user.id,
    },
  });

  // console.log("-------------------------------------------------");
  // console.log(data);
  // console.log("-------------------------------------------------");

  revalidatePath("/dashboard");
  return { data };
}

export async function deleteEquipment(equipmentId: string) {
  const session = await requireAuth();

  const existingItem = await prisma.equipment.findUnique({
    where: {
      id: equipmentId,
      userId: session.user.id,
    },
    include: {
      lendingHistories: true,
    },
  });

  if (
    existingItem?.lendingHistories &&
    existingItem?.lendingHistories.length > 0 &&
    existingItem.lendingHistories[0].returnedAt === null
  ) {
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
