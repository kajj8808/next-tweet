"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import useSWR from "swr";

interface TweetFormProps {
  type: "new" | "reply";
}
interface TweetForm {
  tweet: string;
}
export default function TweetForm({ type }: TweetFormProps) {
  const { data, mutate } = useSWR("/api/tweets");
  const { register, handleSubmit } = useForm<TweetForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onValid = async (formData: TweetForm) => {
    setIsLoading(true);
    await fetch("/api/tweets/enter", {
      body: JSON.stringify({ tweet: formData.tweet }),
      method: "POST",
    });
    mutate("/api/tweets");
    setIsLoading(false);
  };
  return (
    <form className="flex gap-1 mt-1" onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder={type === "new" ? "tweet" : "post your reply"}
        className="w-full p-2 border rounded-md"
        {...register("tweet", { required: true })}
      />
      <SubmitButton
        isLoading={isLoading}
        text={type === "new" ? "TWEET" : "REPLY"}
        lightMode
      />
    </form>
  );
}
