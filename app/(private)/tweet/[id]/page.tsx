import ReplyTweet from "@components/ReplyTweet";
import TweetForm from "@components/TweetForm";
import { authWithUserSession } from "@lib/server/auth";
import Link from "next/link";
import client from "@lib/server/client";
import { redirect } from "next/navigation";
import { SWRProvider } from "@lib/client/swr-provider";
import TweetStatusBar from "@components/TweetStatusBar";

async function getTweet({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  try {
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
  } catch (error) {
    return redirect("/");
  }
}

export default async function TweetPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await authWithUserSession();
  const { id } = params;
  const { tweet, isLiked } = await getTweet({
    tweetId: +params.id,
    userId: user.id,
  });
  return (
    <SWRProvider>
      <main className="flex items-center justify-center w-full min-h-screen pb-10 bg-product-background">
        <div className="flex flex-col max-w-xl shadow-lg">
          <Link href={"/"} className="border-t border-b">
            <div className="relative flex items-center p-5 bg-white">
              <div className="size-4">
                <svg
                  data-slot="icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  ></path>
                </svg>
              </div>
              <h5 className="absolute mb-2 text-base font-bold left-12 top-4">
                POST
              </h5>
            </div>
          </Link>
          <div className="p-5 bg-white">
            <h5 className="mb-2 text-sm font-semibold tracking-wider text-product-color">
              {tweet?.user.name}
            </h5>
            <span className="text-sm tracking-normal">{tweet?.text}</span>
          </div>
          <TweetStatusBar
            barStatus={{
              tweetId: +id,
              commentLength: tweet?.Coment.length,
              like: { isLiked: isLiked, length: tweet?._count.Like },
              shareLength: tweet?._count.Share,
              viewLength: tweet?._count.TweetView,
            }}
          />
          <div>
            <div className="p-3 bg-white border-b">
              <TweetForm type="reply" />
            </div>
            <ReplyTweet />
            <ReplyTweet />
            <ReplyTweet />
            <ReplyTweet />
          </div>
        </div>
      </main>
    </SWRProvider>
  );
}
