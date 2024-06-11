import { prismaClient } from "@/config";

export const getFormulaById = async (id: string) => {
  return prismaClient.formula.findUnique({ where: { id } });
};
