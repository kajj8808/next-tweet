"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
}
export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>();
  const onVaild = async (formData: LoginForm) => {
    const { ok } = await fetch("/api/user/enter");

    if (ok === true) {
      router.push("/");
    }
  };

  return (
    <form
      className="w-full max-w-lg p-5 bg-white shadow-lg"
      onSubmit={handleSubmit(onVaild)}
    >
      <h1>NEXT-TWEET</h1>
      <h5 className="mb-2 text-2xl">LOG IN</h5>
      <input
        type="email"
        placeholder="email"
        className="w-full p-3.5 border rounded-md mt-5"
        {...register("email")}
      />
      <div className="flex items-center justify-between mt-10">
        <Link href={"/create-account"} className="text-sm text-product-color">
          Create account
        </Link>
        <button className="px-6 text-xs font-bold tracking-wider text-white rounded-full h-11 bg-product-color">
          Log in
        </button>
      </div>
    </form>
  );
}
