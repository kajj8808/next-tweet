import {
  createUserSession,
  deleteUserSession,
  getUserSession,
} from "@lib/server/session";
import { NextRequest, NextResponse } from "next/server";
import client from "@lib/server/client";

interface Params {
  tweet: string;
}
export async function POST(req: NextRequest) {
  const { tweet } = (await req.json()) as Params;
  const user = getUserSession();
  let pushedTweet;
  if (tweet && user) {
    pushedTweet = await client.tweet.create({
      data: {
        text: tweet,
        userId: user.id,
      },
    });
  }

  // 우선은 무조건 ok
  return NextResponse.json({ ok: true, tweet: pushedTweet });
}
