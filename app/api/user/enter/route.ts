import { createUserSession, deleteUserSession } from "@lib/server/session";
import { NextRequest, NextResponse } from "next/server";
import client from "@lib/server/client";
interface RequestBody {
  email: string;
  type: "create-account" | "log-in";
}
interface RequestError {
  code: string;
  message: string;
}
// login logic 에서 login인지 create 인지 정해서 오면 좋을듯?
export async function POST(req: NextRequest) {
  // signup-login logic
  const { email, type } = (await req.json()) as RequestBody;

  let user = undefined;
  try {
    switch (type) {
      case "create-account":
        user = await client?.user.create({
          data: {
            email: email,
            name: `USER-${new Date().getTime()}`,
          },
        });
        break;
      case "log-in":
        user = await client?.user.findUnique({ where: { email: email } });
        // user가 없다면 에러 생성
        if (user === null) throw { code: "L0001" };
        break;
    }
  } catch (_error: unknown) {
    const error = _error as RequestError;
    let errorMessage = "Something error";
    if (error) {
      console.log(error);
      if (error.code === "P2002") {
        // create-account에서 유저가 이미 존재하는 경우
        errorMessage = "Email address is already exist";
      } else if (error.code === "L0001") {
        // log-in에서 유저를 찾지 못한 경우
        errorMessage = "Couldn't find your Next-Tweet account";
      } else {
        // errorMessage = error.message;
      }
    }

    return NextResponse.json({ ok: false, errorMessage: errorMessage });
  }
  if (user) {
    // set session data
    deleteUserSession();
    createUserSession(user.name);
    return NextResponse.json({ ok: true });
  }
}
