"use server";

import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getStats() {
  await requireAdmin();

  const users = await prisma.user.count({ where: { role: "user" } });
  const admins = await prisma.user.count({ where: { role: "admin" } });

  const countOfBorrowings = await prisma.lendingHistory.count({});

  const itemsCount = await prisma.lendingHistory.groupBy({
    by: ["equipmentId"],
    _count: { equipmentId: true },
    orderBy: { _count: { equipmentId: "desc" } },
  });
  const borrowingsCount = await prisma.lendingHistory.groupBy({
    by: ["borrowerId"],
    _count: { borrowerId: true },
    orderBy: { _count: { borrowerId: "desc" } },
  });

  const equipments = await prisma.equipment.findMany({});
  const borrowers = await prisma.borrower.findMany({});

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
    borrowingsCount: borrowingsCount.map((i) => {
      return {
        id: i.borrowerId,
        name:
          borrowers.find((borrower) => borrower.id === i.borrowerId)?.name ||
          "",
        count: i._count.borrowerId,
      };
    }),
  };

  return data;
}

export type AdminStats = Awaited<ReturnType<typeof getStats>>;

export async function getAllUserSessions(id: string) {
  await requireAdmin();

  const data = await auth.api.listUserSessions({
    body: {
      userId: id, // required
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });

  const sessions = data.sessions;

  return sessions;
}

export type AllUserSessionsType = Awaited<
  ReturnType<typeof getAllUserSessions>
>;

export type SingleUserSessionType = AllUserSessionsType[number];

export async function getUserById(id: string) {
  await requireAdmin();

  const data = await auth.api.getUser({
    query: {
      id,
    },
    headers: await headers(),
  });
  return data;
}

export type UserByIdType = Awaited<ReturnType<typeof getUserById>>;

export async function getUniqueRoles() {
  await requireAdmin();

  const data = await prisma.user.groupBy({
    by: ["role"],
    _count: { role: true },
    orderBy: { _count: { role: "desc" } },
  });

  const res = data.map((item) => item.role);

  console.log(res);
  return res;
}
