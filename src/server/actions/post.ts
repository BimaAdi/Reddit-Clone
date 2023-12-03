"use server";
import { z } from "zod";
import { authAction } from "../lib/safe-action";
import { prisma } from "../db/prisma";
import { v4 as uuidv4 } from "uuid";

export const getAllPost = async ({
  user = null,
}: {
  user: { id: string; username: string } | null;
}) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 10,
    skip: 0,
  });

  let postsVote = posts.map((x) => ({
    ...x,
    is_up_vote: false,
    is_down_vote: false,
  }));

  if (user) {
    // check is upvote or down vote by user
    let votes = await prisma.vote.findMany({
      where: {
        user_id: user.id,
        post_id: {
          in: posts.map((x) => x.id),
        },
      },
    });

    postsVote = postsVote.map((post) => {
      let found_votes = votes.filter((x) => x.post_id === post.id);
      if (found_votes.length > 0) {
        let found_vote = found_votes[0];
        return {
          ...post,
          is_up_vote: found_vote.is_up_vote === true,
          is_down_vote: found_vote.is_up_vote === false,
        };
      }
      return {
        ...post,
        is_up_vote: false,
        is_down_vote: false,
      };
    });
  }

  return postsVote;
};

export const getDetailPost = async (params: {
  id: string;
  user?: { id: string; username: string } | null;
}) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: true,
      FullPost: true,
    },
  });

  if (post === null) {
    return null;
  }

  if (params.user) {
    let votes = await prisma.vote.findFirst({
      where: {
        user_id: params.user.id,
        post_id: params.id,
      },
    });

    if (votes) {
      return {
        ...post,
        is_up_vote: votes.is_up_vote === true,
        is_down_vote: votes.is_up_vote === false,
      };
    }
  }

  return {
    ...post,
    is_up_vote: false,
    is_down_vote: false,
  };
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
