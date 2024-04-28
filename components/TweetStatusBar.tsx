"use client";

import { useState } from "react";
import LikeButton from "./LikeButton";
import useSWR from "swr";
import ShareButton from "./ShareButton";

interface TweetStatusBarProps {
  tweetId: number;
  commentLength: number | undefined;
  shareLength: number | undefined;
  like: { length: number | undefined; isLiked: boolean };
  viewLength: number | undefined;
  homeTweet?: boolean;
}
export default function TweetStatusBar({
  barStatus,
}: {
  barStatus: TweetStatusBarProps;
}) {
  const { data, mutate } = useSWR(`/api/tweets/${barStatus.tweetId}`);

  const [isLiked, setIsLiked] = useState(barStatus.like.isLiked);
  const [likeLength, setLikeLength] = useState(barStatus.like.length!);

  const onLikeClick = async () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      setLikeLength((prev) => prev - 1);
    } else {
      setLikeLength((prev) => prev + 1);
    }
    // 서버로 실제 데이터 전송
    await fetch(`/api/tweets/${barStatus.tweetId}/like`);
    mutate();
  };

  return (
    <div className="relative flex justify-between px-2 py-3 text-gray-800 bg-white border-t border-b">
      <div className="flex gap-1 p-1 rounded-full">
        <div className="size-5">
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            ></path>
          </svg>
        </div>

        <p className="text-sm select-none">
          {data ? data.result.tweet.Coment.length : barStatus.commentLength}
        </p>
      </div>
      <ShareButton
        tweetId={barStatus.tweetId}
        shareUrl={typeof window !== "undefined" ? window.location.href : ""}
        shareLength={
          data ? data.result.tweet._count.Share : barStatus.shareLength
        }
      />
      <LikeButton
        onClick={onLikeClick}
        isLiked={data ? data.result.isLiked : isLiked}
        likes={data ? data.result.tweet._count.Like : likeLength}
      />
      <div className="flex gap-1 p-1 rounded-full">
        <div className="size-5">
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            ></path>
          </svg>
        </div>
        <p className="text-sm select-none">
          {data ? data.result.tweet._count.TweetView : barStatus.viewLength}
        </p>
      </div>
    </div>
  );
}
