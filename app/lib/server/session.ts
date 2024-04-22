import { cookies } from "next/headers";
import "server-only";

export async function createUserSession(userId: string) {
  cookies().set("session", userId);
}

export async function getUserSession() {
  return cookies().get("session");
}

export async function deleteUserSession() {
  cookies().delete("session");
}
