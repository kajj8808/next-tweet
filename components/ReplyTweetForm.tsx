"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import useSWR from "swr";

interface TweetForm {
  tweet: string;
}
export default function ReplyTweetForm({ tweetId }: { tweetId: number }) {
  const { mutate: tweetMutate } = useSWR("/api/tweets");
  const { mutate: replyMutate } = useSWR(`/api/tweets/${tweetId}/reply`);

  const { register, handleSubmit, reset } = useForm<TweetForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onValid = async (formData: TweetForm) => {
    setIsLoading(true);

    await fetch(`/api/tweets/${tweetId}/reply`, {
      body: JSON.stringify({ tweet: formData.tweet }),
      method: "POST",
    });

    tweetMutate();
    replyMutate();
    reset();
    setIsLoading(false);
  };
  return (
    <form className="flex gap-1 mt-1" onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="post your reply"
        className="w-full p-2 border rounded-md"
        {...register("tweet", { required: true })}
        autoComplete="off"
      />
      <SubmitButton isLoading={isLoading} text="REPLY" lightMode />
    </form>
  );
}
