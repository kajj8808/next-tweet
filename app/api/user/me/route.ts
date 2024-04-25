import { getUserSession } from "@lib/server/session";
import { NextResponse } from "next/server";

interface IResult {
  userId?: string;
  ok: boolean;
}
export async function GET() {
  const session = await getUserSession();
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
