import { prismaClient } from "@/config";
import { calculateFormula } from "../calculateFormula";
import { getFormulas } from "../getFormulas";

export const revalidateResultAllFormulas = async () => {
  const formulas = await getFormulas();

  await Promise.all(
    formulas.map(async ({ id, state }) => {
      const value = await calculateFormula(state);

      return prismaClient.formula.update({
        where: { id },
        data: { value },
      });
    })
  );
};
