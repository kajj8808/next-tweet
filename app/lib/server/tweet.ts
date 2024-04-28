import { TweetProps } from "@components/Tweet";
import client from "@lib/server/client";

export async function getTweets() {
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

export async function getTweet({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const isPageViewed = Boolean(
    await client.tweetView.findFirst({
      where: {
        AND: {
          tweetId: tweetId,
          userId: userId,
        },
      },
      select: {
        id: true,
      },
    })
  );
  if (!isPageViewed) {
    await client.tweetView.create({
      data: {
        tweetId: tweetId,
        userId: userId,
      },
    });
  }
  const tweet = await client.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          Like: true,
          TweetView: true,
          Share: true,
        },
      },
      Coment: true,
    },
  });
  const isLiked = Boolean(
    await client.like.findFirst({
      where: { tweetId: tweetId, userId: userId },
      select: { id: true },
    })
  );
  return { tweet, isLiked };
}

export async function getComments(tweetId: number) {
  const comments = await client.coment.findMany({
    where: {
      tweetId: tweetId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return comments;
}
