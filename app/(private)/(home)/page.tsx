import useSWR from "swr";
import { useState } from "react";

import Tweet from "@components/Tweet";
import { authWithUserSession } from "@lib/server/auth";
import { SWRProvider } from "@lib/client/swr-provider";
import TweetForm from "@components/TweetForm";

/* model Tweet {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  text      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Like      Like[]
  Coment    Coment[]
} */

export default function Home() {
  const userSession = authWithUserSession();
  console.log(userSession);
  return (
    <SWRProvider>
      <main className="w-full min-h-screen pb-10 bg-product-background">
        <div className="flex flex-col max-w-xl mx-auto">
          <div className="p-5 mt-5 bg-white border-b shadow-lg">
            <h1 className="mb-3 font-semibold tracking-wide">NEXT-TWEET</h1>
            <div className="-mt-2.5">
              <h5 className="text-xs">{userSession.value}</h5>
              <TweetForm type="new" />
            </div>
          </div>
          <div className="flex flex-col">
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
          </div>
        </div>
      </main>
    </SWRProvider>
  );
}
