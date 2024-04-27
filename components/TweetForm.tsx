"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

interface TweetFormProps {
  type: "new" | "reply";
}
interface TweetForm {
  text: string;
}
export default function TweetForm({ type }: TweetFormProps) {
  const { register, handleSubmit } = useForm<TweetForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onValid = (formData: TweetForm) => {
    setIsLoading(true);
  };
  return (
    <form className="flex gap-1 mt-1" onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder={type === "new" ? "tweet" : "post your reply"}
        className="w-full p-2 border rounded-md"
        {...register("text", { required: true })}
      />
      <SubmitButton
        isLoading={isLoading}
        text={type === "new" ? "TWEET" : "REPLY"}
        lightMode
      />
    </form>
  );
}
