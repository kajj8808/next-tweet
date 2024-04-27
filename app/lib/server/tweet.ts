import { TweetProps } from "@components/Tweet";
import client from "@lib/server/client";
import { getUserSession } from "./session";

export async function getTweets() {
  const user = getUserSession();
  const tweets = (await client?.tweet.findMany({
    include: {
      user: {
        select: { name: true },
      },
      _count: {
        select: {
          Like: true,
          Coment: true,
          TweetView: true,
          Share: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })) as TweetProps[];

  return tweets;
}
