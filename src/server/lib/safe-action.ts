import * as context from "next/headers";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth/lucia";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    if (!session) {
      throw new Error("Session not found!");
    }
    return session;
  },
});
