"use server";
import { z } from "zod";
import { authAction } from "../lib/safe-action";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db/prisma";

export const createCommentAction = authAction(
  z.object({
    comment: z.string().min(5).max(50),
    post_id: z.string(),
  }),
  async (data, session) => {
    const genId = uuidv4();
    await prisma.comment.create({
      data: {
        id: genId,
        post_id: data.post_id,
        user_id: session.user.userId,
        comment: data.comment,
        comment_depth: 1,
      },
    });

    return {
      status: "OK",
    };
  }
);
