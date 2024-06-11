import { prismaClient } from "@/config";
import { Variable } from "@prisma/client";

type CreateParams = Pick<Variable, "name" | "value" | "type">;

export const createVariable = async (
  params: CreateParams
): Promise<Variable> => {
  return prismaClient.variable.create({ data: params });
};
