import { getUserSession } from "@lib/server/session";
import { NextRequest, NextResponse } from "next/server";
import client from "@lib/server/client";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = getUserSession();
  const { id } = params;
  if (!user) return;
  const alreadyExists = await client.share.findFirst({
    where: {
      tweetId: +id,
      userId: user.id,
    },
  });

  if (!alreadyExists) {
    await client.share.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        tweet: {
          connect: {
            id: +id,
          },
        },
      },
    });
  }
  return NextResponse.json({ ok: true });
}
