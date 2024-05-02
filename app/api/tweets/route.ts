import { getTweets } from "@lib/server/tweet";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET() {
  const tweets = await getTweets();
  return NextResponse.json(tweets);
}
