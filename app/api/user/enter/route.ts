import { createUserSession, deleteUserSession } from "@/app/lib/server/session";
import { NextRequest, NextResponse } from "next/server";

// login logic 에서 login인지 create 인지 정해서 오면 좋을듯?
export function GET(req: NextRequest) {
  // signup-login logic

  // set session data
  deleteUserSession();
  createUserSession("user_1");

  return NextResponse.json({ ok: true });
}
