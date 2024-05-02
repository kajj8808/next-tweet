import { getUserSession } from "@lib/server/session";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

interface IResult {
  userId?: string;
  ok: boolean;
}
export function GET() {
  const session = getUserSession();
  let result: IResult;
  if (session?.value) {
    result = {
      userId: session.value,
      ok: true,
    };
  } else {
    result = {
      ok: false,
    };
  }
  return NextResponse.json(result);
}
