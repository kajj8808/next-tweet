import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen pb-10 bg-product-background">
      <div className="w-full max-w-lg p-5 bg-white shadow-lg">
        <h1>NEXT-TWEET</h1>
        <h5 className="mb-2 text-2xl">LOG IN</h5>
        <input
          type="email"
          placeholder="email"
          className="w-full p-3.5 border rounded-md mt-5"
        />
        <div className="flex items-center justify-between mt-10">
          <Link href={"/create-account"} className="text-sm text-product-color">
            Create account
          </Link>
          <button className="px-6 text-xs font-bold tracking-wider text-white rounded-full h-11 bg-product-color">
            Log in
          </button>
        </div>
      </div>
    </main>
  );
}
