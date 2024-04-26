"use client";
import { cls } from "@lib/client/utiles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "./LoadingButton";
import Input from "./Input";

interface LoginForm {
  email: string;
}
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const onVaild = async (formData: LoginForm) => {
    setIsLoading(true);
    try {
      const { ok, errorMessage } = await (
        await fetch("/api/user/enter", {
          body: JSON.stringify({ email: formData.email, type: "log-in" }),
          method: "POST",
        })
      ).json();
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
      <h5 className="mb-2 text-2xl">LOG IN</h5>
      <Input
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
        <Link href={"/create-account"} className="text-sm text-product-color">
          Create account
        </Link>
        <LoadingButton isLoading={isLoading} text="Log in" />
      </div>
    </form>
  );
}
