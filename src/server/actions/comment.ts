"use server";
import { z } from "zod";
import { authAction } from "../lib/safe-action";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db/prisma";

export const getCommentByPostId = async ({ post_id }: { post_id: string }) => {
  const comments = await prisma.comment.findMany({
    where: {
      post_id: post_id,
      comment_depth: 1,
    },
    include: {
      user: true,
      SubComments: {
        include: {
          user: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return comments;
};

export const createCommentAction = authAction(
  z.object({
    comment: z.string().min(5).max(50),
    post_id: z.string(),
  }),
  async (data, session) => {
    const post = await prisma.post.findFirst({
      where: {
        id: data.post_id,
      },
    });
    if (!post) {
      return {
        status: "NOT_FOUND",
        message: "post not found",
      };
    }

    await prisma.comment.create({
      data: {
        id: uuidv4(),
        post_id: data.post_id,
        user_id: session.user.userId,
        comment: data.comment,
        comment_depth: 1,
      },
    });

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        num_comments: post.num_comments + 1,
      },
    });

    return {
      status: "OK",
    };
  }
);

export const createSubCommmentAction = authAction(
  z.object({
    comment: z.string().min(5).max(50),
    post_id: z.string(),
    comment_id: z.string(),
  }),
  async (data, session) => {
    const post = await prisma.post.findFirst({
      where: {
        id: data.post_id,
      },
    });
    if (!post) {
      return {
        status: "NOT_FOUND",
        message: "post not found",
      };
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: data.comment_id,
      },
    });
    if (!comment) {
      return {
        status: "NOT_FOUND",
        message: "comment not found",
      };
    }

    await prisma.comment.create({
      data: {
        id: uuidv4(),
        post_id: data.post_id,
        user_id: session.user.userId,
        comment: data.comment,
        comment_depth: comment.comment_depth + 1,
        commenting_comment_id: comment.id,
      },
    });

    return {
      status: "OK",
    };
  }
);
