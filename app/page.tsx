import useSWR from "swr";
import { SWRProvider } from "./lib/client/swr-provider";
import SWRTester from "@/components/SWRTester";
import { useState } from "react";
import Tweet from "@/components/Tweet";
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
  return (
    <SWRProvider>
      <main className="w-full min-h-screen pb-10 bg-product-background">
        <div className="flex flex-col max-w-xl gap-3 mx-auto">
          <div className="p-5 mt-5 bg-white shadow-lg">
            <h1 className="mb-3 tracking-wide">NEXT-TWEET</h1>
            <div className="flex gap-1 mt-1">
              <input
                type="text"
                placeholder="tweet"
                className="w-full p-2 border rounded-md"
              />
              <button className="px-6 text-xs font-light tracking-wider text-white rounded-full h-11 bg-product-color">
                TWEET
              </button>
            </div>
          </div>
          <div>
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
