"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import ValidatedInput from "./ValidatedInput";

interface CreateAccountForm {
  email: string;
}

export default function CreateAccountForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateAccountForm>();

  const [isLoading, setIsLoading] = useState(false);

  const onVaild = async (formData: CreateAccountForm) => {
    setIsLoading(true);
    try {
      // create account logic
      const { ok, errorMessage } = await (
        await fetch("/api/user/enter", {
          body: JSON.stringify({
            email: formData.email,
            type: "create-account",
          }),
          method: "POST",
        })
      ).json();
      // 서버가 문제없고, 요청이 정상이라 가정.
      if (ok === false) {
        setError("email", { message: errorMessage });
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      // 예상치 못한 에러 처리 (request 등등)
      setError("email", { message: "Something's wrong reload the website" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="w-full max-w-lg p-5 bg-white shadow-lg"
      onSubmit={handleSubmit(onVaild)}
    >
      <h1>NEXT-TWEET</h1>
      <h5 className="mb-2 text-2xl">CREATE ACCOUNT</h5>
      <ValidatedInput
        register={register("email", {
          required: "Enter an email address",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        error={errors.email}
        type="email"
        placeholder="email"
      />
      <div className="flex items-center justify-between mt-10">
        <Link href={"/log-in"} className="text-sm text-product-color">
          Log in
        </Link>
        <SubmitButton isLoading={isLoading} text="Create account" />
      </div>
    </form>
  );
}
