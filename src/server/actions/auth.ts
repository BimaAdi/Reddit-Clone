"use server";
import * as context from "next/headers";
import { z } from "zod";
import { action } from "@/server/lib/safe-action";
import { auth } from "@/server/auth/lucia";
import { LuciaError } from "lucia";

export const signUpAction = action(
  z.object({
    username: z.string(),
    password: z.string(),
  }),
  async ({ username, password }) => {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username, // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
      },
    });
    return user;
  }
);

export const signInAction = action(
  z.object({
    username: z.string(),
    password: z.string(),
  }),
  async ({ username, password }) => {
    try {
      const key = await auth.useKey("username", username, password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });
      /*
        NOTE:
        I use lucia style to set cookie before, (example down below)
        but it's not work on webkit (Safari, Gnome Browser, etc).
        so I move to nextjs cookies helper.
        I don't know why it's not work, I assume they are 2 things:
         1. NextJS App router use diffrent syntax to set Cookie, and lucia
         implementation only work on pages router
         2. Lucia Implementation doesn't work on server action, 
         It's only works on api routes
      */
      // const authRequest = auth.handleRequest("POST", context);
      // authRequest.setSession(session);
      context
        .cookies()
        .set("auth_session", session.sessionId, {
          expires: session.activePeriodExpiresAt,
        });
      return {
        status: "OK",
        data: session.sessionId,
      };
    } catch (e) {
      if (
        e instanceof LuciaError &&
        (e.message === "AUTH_INVALID_KEY_ID" ||
          e.message === "AUTH_INVALID_PASSWORD")
      ) {
        return {
          status: "BAD_REQUEST",
          message: "Incorrect username or password",
        };
      }
      if (e instanceof Error) {
        throw new Error(e.toString())
      }
    }
  }
);

export const signOutAction = action(z.null(), async () => {
  const authRequest = auth.handleRequest("POST", context);
  const session = await authRequest.validate();
  if (!session) {
    return null;
  }
  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);
  return null;
});
