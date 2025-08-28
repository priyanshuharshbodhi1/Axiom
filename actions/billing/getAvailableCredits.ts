"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetAvailableCredits() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("unauthenticated");
  }

  let balance = await prisma.userBalance.findUnique({
    where: { userId },
  });
  
  // Create user balance with 250 credits if it doesn't exist
  if (!balance) {
    balance = await prisma.userBalance.create({
      data: {
        userId,
        credits: 250,
      },
    });
  }
  
  return balance.credits;
}
