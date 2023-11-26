import { prisma } from "../db/prisma";

export const clearDb = async () => {
  await prisma.user.deleteMany();
};
