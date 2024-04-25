import Button from "@/components/Button";
import ReplyTweet from "@/components/ReplyTweet";
import { cookies } from "next/headers";
import Link from "next/link";

export default function TweetPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const sessionCookie = cookies().get("session")?.value;
  console.log(sessionCookie);
  return (
    <main className="flex items-center justify-center w-full min-h-screen pb-10 bg-product-background">
      <div className="flex flex-col max-w-xl shadow-lg">
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
                  clip-rule="evenodd"
                  fill-rule="evenodd"
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
          <h5 className="mb-2 text-sm font-bold">NICK NAME</h5>
          <span className="text-sm tracking-normal">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            molestiae, ea accusamus suscipit sit corporis porro ut dicta quo
            inventore, enim tempora similique consequatur quasi? Tempora
            praesentium corporis porro cupiditate?
          </span>
        </div>
        <div className="relative flex justify-between px-2 py-3 text-gray-800 bg-white border-t border-b">
          <div className="flex gap-1 p-1 rounded-full cursor-pointer hover:bg-slate-200">
            <div className="size-5">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm">13</p>
          </div>
          <div className="flex gap-1 p-1 rounded-full cursor-pointer hover:bg-slate-200">
            <div className="size-5">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm">13</p>
          </div>
          <div className="flex gap-1 p-1 rounded-full cursor-pointer hover:bg-slate-200">
            <div className="size-5">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm">13</p>
          </div>
          <div className="flex gap-1 p-1 rounded-full cursor-pointer hover:bg-slate-200">
            <div className="size-5">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm">13</p>
          </div>
        </div>
        <div>
          <div className="p-3 bg-white border-b">
            <div className="flex gap-1 mt-1">
              <input
                type="text"
                placeholder="post your reply"
                className="w-full p-2 border rounded-md"
              />
              <Button text="REPLY" />
            </div>
          </div>
          <ReplyTweet />
          <ReplyTweet />
          <ReplyTweet />
          <ReplyTweet />
        </div>
      </div>
    </main>
  );
}
