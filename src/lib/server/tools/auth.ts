import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { User } from "../types/auth/user/User";
import { getUser } from "../actions/auth/getUser";



export async function isAuth(): Promise<boolean> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return false;

    const session = await decrypt(cookie);
    if (!session) return false;
    if (new Date(session.expiresAt as string) < new Date()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getUser();
    return user?.user?.key.keyable_type === "super_admin";
  } catch (error) {
    console.error("Admin check failed:", error);
    return false;
  }
}

export async function isEmployee(): Promise<boolean> {
  try {
   const user = await getUser();
    return user?.user?.key.keyable_type  === "employee";
  } catch (error) {
    console.error("Employee check failed:", error);
    return false;
  }
}

export async function isCommittee(): Promise<boolean> {
  try {
    const user = await getUser();
    return user?.user?.key.keyable_type === "committee";
  } catch (error) {
    console.error("Committee check failed:", error);
    return false;
  }
}



export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookie = (await cookies()).get("user")?.value;
    if (!cookie) return null;

    return JSON.parse(cookie) as User;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
} 