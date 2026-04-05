"use server";

import { requireAdmin } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

export async function getStats() {
  await requireAdmin();

  const users = await prisma.user.count({ where: { role: "user" } });
  const admins = await prisma.user.count({ where: { role: "admin" } });

  const countOfBorrowings = await prisma.lendingHistory.count({});

  const itemsCount = await prisma.lendingHistory.groupBy({
    by: ["equipmentId"],
    _count: { equipmentId: true },
  });

  const equipments = await prisma.equipment.findMany({});

  const data = {
    adminUsers: admins,
    users: users,
    totalUsers: users + admins,
    totalItems: equipments.length,
    totalBorrowings: countOfBorrowings,
    itemsCount: itemsCount.map((item) => {
      return {
        id: item.equipmentId,
        name:
          equipments.find((equipment) => equipment.id === item.equipmentId)
            ?.name || "",
        count: item._count.equipmentId,
      };
    }),
  };

  return data;
}

export type AdminStats = Awaited<ReturnType<typeof getStats>>;
