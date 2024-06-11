import { prismaClient } from "@/config";
import { Formula } from "@prisma/client";
import { revalidateResultAllFormulas } from "../revalidateResultAllFormulas";

type UpdateParams = {
  id: string;
  data: Partial<Pick<Formula, "name" | "state">>;
};

export const updateFormula = async (params: UpdateParams) => {
  const { id, data } = params;

  if (data.state) {
    await prismaClient.formula.update({
      where: { id },
      data,
    });

    await revalidateResultAllFormulas();
  }

  return prismaClient.formula.update({ where: { id }, data });
};
