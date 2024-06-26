import ReplyTweet from "@components/ReplyTweet";
import { authWithUserSession } from "@lib/server/auth";
import { SWRProvider } from "@lib/client/swr-provider";
import { getComments, getTweet } from "@lib/server/tweet";
import TweetStatusBar from "@components/TweetStatusBar";
import Link from "next/link";
import ReplyTweetForm from "@components/ReplyTweetForm";
import Comments from "@components/Comments";

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
  const comments = await getComments(+id);

  return (
    <SWRProvider>
      <main className="flex items-center justify-center w-full min-h-screen pb-10 bg-product-background">
        <div className="flex flex-col w-full max-w-xl shadow-lg">
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
            <span className="text-sm tracking-normal text-balance">
              {tweet?.text}
            </span>
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
            <Comments tweetId={tweet?.id!} comments={comments} />
          </div>
        </div>
      </main>
    </SWRProvider>
  );
}
