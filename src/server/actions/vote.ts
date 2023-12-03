"use server";
import { z } from "zod";
import { authAction } from "../lib/safe-action";
import { prisma } from "../db/prisma";
import { v4 as uuidv4 } from "uuid";

export const upVoteAction = authAction(
  z.object({
    post_id: z.string(),
  }),
  async (data, session) => {
    const existingPost = await prisma.post.findFirst({
      where: {
        id: data.post_id,
      },
    });
    if (!existingPost) {
      return {
        status: "OK",
      };
    }

    // Upsert Vote for user
    let is_new_votes = false;
    let is_already_up_votes = true;
    const existingVote = await prisma.vote.findFirst({
      where: {
        post_id: data.post_id,
        user_id: session.user.userId,
      },
    });
    if (existingVote !== null && existingVote.is_up_vote === false) {
      is_already_up_votes = false;
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          is_up_vote: true,
        },
      });
    } else if (existingVote === null) {
      is_already_up_votes = false;
      is_new_votes = true;
      await prisma.vote.create({
        data: {
          id: uuidv4(),
          post_id: data.post_id,
          user_id: session.user.userId,
          is_up_vote: true,
        },
      });
    }

    // handling if only one user doing voting
    let vote_counter = is_already_up_votes
      ? existingPost.vote_counter
      : (existingPost.vote_counter += 1);
    if (vote_counter === 0 && existingPost.num_votes === 1) {
      vote_counter += 1;
    }

    // Update post vote_counter and num_votes
    await prisma.post.update({
      where: {
        id: existingPost.id,
      },
      data: {
        vote_counter: vote_counter,
        num_votes: is_new_votes
          ? (existingPost.num_votes += 1)
          : existingPost.num_votes,
      },
    });

    return {
      status: "OK",
    };
  }
);

export const downVoteAction = authAction(
  z.object({
    post_id: z.string(),
  }),
  async (data, session) => {
    const existingPost = await prisma.post.findFirst({
      where: {
        id: data.post_id,
      },
    });
    if (!existingPost) {
      return {
        status: "OK",
      };
    }

    // Upsert Vote for user
    let is_new_votes = false;
    let is_already_down_votes = true;
    const existingVote = await prisma.vote.findFirst({
      where: {
        post_id: data.post_id,
        user_id: session.user.userId,
      },
    });
    if (existingVote !== null && existingVote.is_up_vote === true) {
      is_already_down_votes = false;
      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          is_up_vote: false,
        },
      });
    } else if (existingVote === null) {
      is_already_down_votes = false;
      is_new_votes = true;
      await prisma.vote.create({
        data: {
          id: uuidv4(),
          post_id: data.post_id,
          user_id: session.user.userId,
          is_up_vote: false,
        },
      });
    }

    // handling if only one user doing voting
    let vote_counter = is_already_down_votes
      ? existingPost.vote_counter
      : (existingPost.vote_counter -= 1);
    if (vote_counter === 0 && existingPost.num_votes === 1) {
      vote_counter -= 1;
    }

    // Update post vote_counter and num_votes
    await prisma.post.update({
      where: {
        id: existingPost.id,
      },
      data: {
        vote_counter: vote_counter,
        num_votes: is_new_votes
          ? (existingPost.num_votes += 1)
          : existingPost.num_votes,
      },
    });

    return {
      status: "OK",
    };
  }
);
