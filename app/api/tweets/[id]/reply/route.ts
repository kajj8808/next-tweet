import { NextRequest, NextResponse } from "next/server";
import client from "@lib/server/client";
import { getUserSession } from "@lib/server/session";
import { getComments } from "@lib/server/tweet";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { tweet } = await req.json();
  const user = getUserSession();
  await client.coment.create({
    data: {
      userId: user.id,
      text: tweet,
      tweetId: +params.id,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const comments = await getComments(+params.id);
  return NextResponse.json({ comments });
}
