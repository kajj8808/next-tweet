"use client";

import { cls } from "@lib/client/utiles";
import { useState } from "react";
import useSWR from "swr";

export default function ShareButton({
  shareLength,
  shareUrl,
  tweetId,
}: {
  shareLength: string;
  shareUrl: string;
  tweetId: number;
}) {
  const [showCopyText, setShowCopyText] = useState(false);
  const { mutate } = useSWR(`/api/tweets/${tweetId}`);

  const onClick = () => {
    setShowCopyText(true);
    navigator.clipboard.writeText(shareUrl);
    fetch(`/api/tweets/${tweetId}/share`);
    mutate();
    setTimeout(() => {
      setShowCopyText(false);
    }, 1500);
  };
  return (
    <button
      onClick={onClick}
      className="relative flex gap-1 p-1 rounded-full cursor-pointer hover:bg-slate-200"
    >
      <div
        className={cls(
          "absolute -top-6 text-xs bg-product-color text-white px-1.5 py-1 rounded-full ",
          showCopyText ? "animate-jump-out animate-delay-1000" : "hidden"
        )}
      >
        copy
      </div>
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
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          ></path>
        </svg>
      </div>
      <p className="text-sm select-none">{shareLength}</p>
    </button>
  );
}
