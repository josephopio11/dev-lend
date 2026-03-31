"use server";

import { requireAuth } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function searchBorrowers(text: string) {
  const session = await requireAuth();
  const data = await prisma.borrower.findMany({
    where: {
      OR: [
        { name: { contains: text, mode: "insensitive" } },
        { email: { contains: text, mode: "insensitive" } },
        { phone: { contains: text, mode: "insensitive" } },
        { address: { contains: text, mode: "insensitive" } },
        { position: { contains: text, mode: "insensitive" } },
      ],
    },
    select: { id: true, name: true },

    orderBy: {
      name: "asc",
    },

    take: 8,
  });

  return data;
}

export type SearchBorrowersType = Awaited<ReturnType<typeof searchBorrowers>>;

export async function getAllBorrowers() {
  const session = await requireAuth();

  const data = await prisma.borrower.findMany({
    include: {
      _count: {
        select: { lendingHistories: true },
      },
      lendingHistories: {
        select: {
          id: true,
          borrowedAt: true,
          returnedAt: true,
          equipment: {
            select: {
              id: true,
              name: true,
              serialNumber: true,
              deletedItem: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export type AllBorrowersType = Awaited<ReturnType<typeof getAllBorrowers>>;
export type SingleBorrowerType = AllBorrowersType[number];

export async function getBorrower(id: string) {
  const session = await requireAuth();
  const data = await prisma.borrower.findUnique({
    where: { id },
  });

  // console.log(data);
  return data;
}

export type GetBorrowerType = Awaited<ReturnType<typeof getBorrower>>;

export async function updateBorrower(
  id: string,
  name: string,
  email: string,
  position: string,
  phone?: string,
  address?: string,
) {
  const session = await requireAuth();

  const updatedBorrower = await prisma.borrower.update({
    where: { id },
    data: {
      name: name,
      email: email,
      phone: phone,
      address: address,
      position: position,
    },
  });

  revalidatePath("/dashboard/borrowers");

  if (updatedBorrower) {
    return { success: true, message: "Borrower updated successfully!" };
  }

  return { success: false, message: "Failed to update borrower!" };
}

export async function deleteBorrower(id: string) {
  const session = await requireAuth();
  // const data = await prisma.borrower.delete({
  //   where: { id },
  // });

  // console.log(id);
  return null;
}

export async function getBorrowerHistory(
  borrowerId: string,
  isPage: boolean = false,
) {
  await requireAuth();

  const itemHistory = await prisma.borrower.findUnique({
    where: { id: borrowerId },
    select: {
      _count: {
        select: { lendingHistories: true },
      },
      lendingHistories: {
        select: {
          id: true,
          borrowedAt: true,
          returnedAt: true,
          equipment: {
            select: {
              id: true,
              name: true,
              serialNumber: true,
              deletedItem: true,
            },
          },
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

export type BorrowersHistoryType = Awaited<
  ReturnType<typeof getBorrowerHistory>
>;
