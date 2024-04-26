import useSWR from "swr";
import { useState } from "react";

import Button from "@components/Button";
import Tweet from "@components/Tweet";
import { authWithUserSession } from "@lib/server/auth";
import { SWRProvider } from "@lib/client/swr-provider";

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
            <h1 className="mb-3 tracking-wide">NEXT-TWEET</h1>
            <div className="flex gap-1 mt-1">
              <input
                type="text"
                placeholder="tweet"
                className="w-full p-2 border rounded-md"
              />
              <Button text="TWEET" />
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
