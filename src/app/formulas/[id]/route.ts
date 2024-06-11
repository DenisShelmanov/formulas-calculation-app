import { withErrorHandler } from "@/middlewares/errorHandler";
import { deleteFormulaById } from "@/services/deleteFormulaById";
import { getFormulaById } from "@/services/getFormulaById";
import { updateFormula } from "@/services/updateFormula";
import { NextResponse } from "next/server";
import { z } from "zod";

type ParamType = {
  params: {
    id: string;
  };
};

type UpdateFormulaBody = {
  name?: string;
  state?: string;
};

const UpdateFormulaBodySchema = z.object({
  name: z.string().optional(),
  state: z.string().optional(),
});

export const PUT = withErrorHandler(async function PUT(
  request: Request,
  { params }: ParamType
) {
  const body = await request.json();

  UpdateFormulaBodySchema.parse(body);

  const { id } = params;

  const updatedVariable = await updateFormula({
    id,
    data: body as UpdateFormulaBody,
  });
  return NextResponse.json(updatedVariable, { status: 200 });
});

export const GET = withErrorHandler(async function GET(
  request: Request,
  { params }: ParamType
) {
  const result = await getFormulaById(params.id);

  return NextResponse.json(result);
});

export const DELETE = withErrorHandler(async function DELETE(
  request: Request,
  { params }: ParamType
) {
  const result = await deleteFormulaById(params.id);

  return NextResponse.json(result);
});
