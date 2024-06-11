import { prismaClient } from "@/config";
import { Formula } from "@prisma/client";
import { calculateFormula } from "../calculateFormula";

type CreateParams = Pick<Formula, "name" | "state">;

export const createFormula = async (params: CreateParams): Promise<Formula> => {
  const value = params?.state ? await calculateFormula(params.state) : 0;
  return prismaClient.formula.create({ data: { ...params, value } });
};
