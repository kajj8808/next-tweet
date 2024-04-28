"use client";

import { Tweet } from "@prisma/client";
import ReplyTweet from "./ReplyTweet";
import useSWR from "swr";
import ReplyTweetForm from "./ReplyTweetForm";

interface CommentProps extends Tweet {
  user: { name: string };
}
export default function Comments({
  comments,
  tweetId,
}: {
  tweetId: number;
  comments: CommentProps[];
}) {
  const { data } = useSWR<{ comments: CommentProps[] }>(
    `/api/tweets/${tweetId}/reply`
  );

  return (
    <div>
      <div className="p-3 bg-white border-b">
        <ReplyTweetForm tweetId={tweetId} />
      </div>
      {data
        ? data.comments.map((comment) => (
            <ReplyTweet
              text={comment.text}
              username={comment.user.name}
              key={comment.id}
            />
          ))
        : comments.map((comment) => (
            <ReplyTweet
              text={comment.text}
              username={comment.user.name}
              key={comment.id}
            />
          ))}
    </div>
  );
}
