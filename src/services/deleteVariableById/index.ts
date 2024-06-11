import { prismaClient } from "@/config";

export const deleteVariableById = async (id: string) => {
  return prismaClient.variable.delete({ where: { id } });
};
