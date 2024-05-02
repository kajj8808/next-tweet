import { getUserSession } from "@lib/server/session";
import client from "@lib/server/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET() {
  const user = getUserSession();
  const likes = await client.like.findMany({
    where: {
      userId: user.id,
    },
    select: {
      tweetId: true,
    },
  });
  return NextResponse.json({ likes });
}
