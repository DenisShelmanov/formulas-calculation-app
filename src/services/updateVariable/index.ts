import { prismaClient } from "@/config";
import { Variable } from "@prisma/client";
import { revalidateResultAllFormulas } from "../revalidateResultAllFormulas";

type UpdateParams = {
  id: string;
  data: Partial<Pick<Variable, "name" | "value" | "type">>;
};

export const updateVariable = async (params: UpdateParams) => {
  const { id, data } = params;

  const updatedVariable = await prismaClient.variable.update({
    where: { id },
    data,
  });

  if (data.value) {
    await revalidateResultAllFormulas();
  }

  return updatedVariable;
};
