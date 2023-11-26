"use server";
import { z } from "zod";
import { authAction } from "../lib/safe-action";
import { prisma } from "../db/prisma";
import { v4 as uuidv4 } from "uuid";

export const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 10,
    skip: 0,
  });
  return posts
};

export const createPostAction = authAction(
  z.object({
    title: z.string().min(5).max(50),
    post: z.string().min(5).max(1000),
  }),
  async (data, session) => {
    const genId = uuidv4();
    await prisma.post.create({
      data: {
        id: genId,
        title: data.title,
        post: data.post.slice(0, 50),
        user_id: session.user.userId,
        vote_counter: 0,
        num_votes: 0,
        num_comments: 0,
        FullPost: {
          create: [
            {
              id: genId,
              full_post: data.post,
            },
          ],
        },
      },
    });

    return {
      status: "OK",
    };
  }
);
