import { withErrorHandler } from "@/middlewares/errorHandler";
import { createFormula } from "@/services/createFormula";
import { getFormulas } from "@/services/getFormulas";
import { NextResponse } from "next/server";
import { z } from "zod";

type CreateFormulaBody = {
  name: string;

  value: number;
  state: string;
};

const CreateFormulaBodySchema = z.object({
  name: z.string(),
  value: z.number(),
  state: z.string(),
});

export const POST = withErrorHandler(async function POST(request: Request) {
  const body = await request.json();

  CreateFormulaBodySchema.parse(body);

  const createdVariable = await createFormula(body as CreateFormulaBody);
  return NextResponse.json(createdVariable, { status: 201 });
});

export const GET = withErrorHandler(async function GET(request: Request) {
  const result = await getFormulas();

  return NextResponse.json(result);
});
