"use server";
import { z } from "zod";
import { action, authAction } from "@/server/lib/safe-action";
import { User } from "lucia";

export const helloServer = async () => {
  return "Hello from server";
};

export const protectedHelloServer = async (user: User | null | undefined) => {
  if (user) {
    return `Hello ${user.username} from protected server`;
  }
  return "Please SignIn";
};

export const sayHelloAction = action(z.string(), async (username) => {
  return {
    success: `Hello ${username} !!!`,
  };
});

export const protectedSayHelloAction = authAction(
  z.string(),
  async (username) => {
    return {
      success: `Hello ${username} !!!`,
    };
  }
);
