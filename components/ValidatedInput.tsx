import { cls } from "@lib/client/utiles";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  type: string;
  placeholder: string;
  [key: string]: any;
}
export default function ValidatedInput({
  register,
  error,
  type,
  placeholder,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className={cls(
          "w-full p-3.5 border rounded-md mt-5 outline-none",
          error ? "border-red-700" : ""
        )}
        {...register}
      />
      <span className="text-xs text-red-700">
        {error && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="size-5">
              <svg
                data-slot="icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                ></path>
              </svg>
            </div>
            {error.message}
          </div>
        )}
      </span>
    </div>
  );
}
