import { NextResponse } from "next/server";
import { ZodError } from "zod";

type RequestHandler = (...args: any[]) => Promise<NextResponse>;

export async function errorHandler(handler: RequestHandler, ...args: any[]) {
  try {
    return await handler(...args);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Unexpected error" }, { status: 400 });
    }
  }
}

export function withErrorHandler(handler: RequestHandler) {
  return async (...args: any[]) => {
    return errorHandler(handler, ...args);
  };
}
