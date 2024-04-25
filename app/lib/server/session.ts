import { cookies } from "next/headers";
import "server-only";

export function createUserSession(userId: string) {
  cookies().set("user-session", userId);
}

export function getUserSession() {
  return cookies().get("user-session");
}

export function deleteUserSession() {
  cookies().delete("user-session");
}
