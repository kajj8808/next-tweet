import { createUserSession } from "@/app/lib/server/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // signup-login logic

  // set session data
  await createUserSession("user_1");
  const json = {
    text: "hello",
    ok: true,
  };
  return NextResponse.json(json);
}
