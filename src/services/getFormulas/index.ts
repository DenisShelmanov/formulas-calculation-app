import { prismaClient } from "@/config";
import { Formula } from "@prisma/client";

type SearchParams = {
  name?: string;
};

export const getFormulas = async (
  searchParams: SearchParams | undefined = undefined
): Promise<Formula[]> => {
  return prismaClient.formula.findMany({
    where: searchParams && {
      name: { contains: searchParams.name, mode: "insensitive" },
    },
    orderBy: { create_at: "desc" },
  });
};


export const getFormulasByIds = async (ids: string[]): Promise<Formula[]> => {
  return prismaClient.formula.findMany({
    where: { id: { in: ids } },
  });
};
