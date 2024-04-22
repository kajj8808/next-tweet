import { cookies } from "next/headers";

export default function SignupPage() {
  const sessionCookie = cookies().get("session")?.value;
  console.log(sessionCookie);
  return (
    <div>
      <h1>Sign up</h1>
    </div>
  );
}
