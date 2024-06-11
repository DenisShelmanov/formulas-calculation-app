import { withErrorHandler } from "@/middlewares/errorHandler";
import { createVariable } from "@/services/createVariable";
import { getVariables } from "@/services/getVariables";
import { VariableType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

type CreateVariableBody = {
  name: string;
  type: VariableType;
  value: number;
};

const CreateVariableBodySchema = z.object({
  name: z.string(),
  type: z.nativeEnum(VariableType),
  value: z.number(),
});

export const POST = withErrorHandler(async function POST(request: Request) {
  const body = await request.json();

  CreateVariableBodySchema.parse(body);

  const createdVariable = await createVariable(body as CreateVariableBody);

  return NextResponse.json(createdVariable, { status: 201 });
});

export const GET = withErrorHandler(async function GET(request: Request) {
  const result = await getVariables();

  return NextResponse.json(result);
});
