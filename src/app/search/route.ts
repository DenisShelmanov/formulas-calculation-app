import { withErrorHandler } from "@/middlewares/errorHandler";
import { getFormulas } from "@/services/getFormulas";
import { getVariables } from "@/services/getVariables";
import { NextResponse } from "next/server";

type ParamType = {
  params: { query: string };
};

export const GET = withErrorHandler(async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const name = searchParams.get("query") || "";

    const result = await Promise.all([
      getVariables({ name }),
      getFormulas({ name }),
    ]);
    return NextResponse.json(result.flat());
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
});
