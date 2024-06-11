import { prismaClient } from "@/config";
import { Variable } from "@prisma/client";

type SearchParams = {
  name?: string;
};

export const getVariables = async (
  searchParams: SearchParams | undefined = undefined
): Promise<Variable[]> => {
  return prismaClient.variable.findMany({
    where: searchParams && {
      name: { contains: searchParams.name, mode: "insensitive" },
    },
    orderBy: { create_at: "desc" },
  });
};

export const getVariablesByIds = async (ids: string[]): Promise<Variable[]> => {
  return prismaClient.variable.findMany({
    where: { id: { in: ids } },
  });
};
