"use server";

import prisma from "@/lib/prisma";

export async function getItemById(id: string) {
  const item = await prisma.equipment.findUnique({
    where: { id },
    include: {
      lendingHistories: true,
      _count: {
        select: { lendingHistories: true },
      },
    },
  });

  return item;
}
