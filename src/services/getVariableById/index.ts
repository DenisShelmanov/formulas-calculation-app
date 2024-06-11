import { prismaClient } from "@/config";

export const getVariableById = async (id: string) => {
  return prismaClient.variable.findUnique({ where: { id } });
};
