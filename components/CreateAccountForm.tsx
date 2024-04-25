"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface CreateAccountForm {
  email: string;
}

export default function CreateAccountForm() {
  const { register, handleSubmit } = useForm<CreateAccountForm>();
  const onVaild = (formData: CreateAccountForm) => {};
  return (
    <div
      className="w-full max-w-lg p-5 bg-white shadow-lg"
      onSubmit={handleSubmit(onVaild)}
    >
      <h1>NEXT-TWEET</h1>
      <h5 className="mb-2 text-2xl">CREATE ACCOUNT</h5>
      <input
        type="email"
        placeholder="email"
        className="w-full p-3.5 border rounded-md mt-5"
        {...register("email")}
      />
      <div className="flex items-center justify-between mt-10">
        <Link href={"/log-in"} className="text-sm text-product-color">
          Log in
        </Link>
        <button className="px-6 text-xs font-bold tracking-wider text-white rounded-full h-11 bg-product-color">
          Create account
        </button>
      </div>
    </div>
  );
}
