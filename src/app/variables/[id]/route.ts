import { withErrorHandler } from "@/middlewares/errorHandler";
import { deleteVariableById } from "@/services/deleteVariableById";
import { getVariableById } from "@/services/getVariableById";
import { updateVariable } from "@/services/updateVariable";
import { VariableType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

type ParamType = {
  params: {
    id: string;
  };
};

type UpdateVariableBody = {
  name?: string;
  type?: VariableType;
  value?: number;
};

const CreateVariableBodySchema = z.object({
  name: z.string().optional(),
  type: z.nativeEnum(VariableType).optional(),
  value: z.number().optional(),
});

export const PUT = withErrorHandler(async function PUT(
  request: Request,
  { params }: ParamType
) {
  const body = await request.json();

  CreateVariableBodySchema.parse(body);

  const { id } = params;
  const updatedVariable = await updateVariable({
    id,
    data: body as UpdateVariableBody,
  });

  return NextResponse.json(updatedVariable, { status: 200 });
});

export const GET = withErrorHandler(async function GET(
  request: Request,
  { params }: ParamType
) {
  const result = await getVariableById(params.id);

  return NextResponse.json(result);
});

export const DELETE = withErrorHandler(async function DELETE(
  request: Request,
  { params }: ParamType
) {
  const result = await deleteVariableById(params.id);

  return NextResponse.json(result);
});
