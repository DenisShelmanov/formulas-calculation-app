import { prismaClient } from "@/config";

export const deleteFormulaById = async (id: string) => {
  return prismaClient.formula.delete({ where: { id } });
};
