"use client";
import { downVoteAction, upVoteAction } from "@/server/actions/vote";
import Post from "./Post";
import { useAction } from "next-safe-action/hook";
import { useRouter } from "next/navigation";

type PostProps = {
  id: string;
  title: string;
  post: string;
  vote_counter: number;
  num_votes: number;
  num_comments: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  is_up_vote: boolean;
  is_down_vote: boolean;
};

export default function PostList({ posts }: { posts: PostProps[] }) {
  const router = useRouter();
  const upVoteAct = useAction(upVoteAction, {
    onSuccess: () => {
      router.refresh();
    },
  });
  const downVoteAct = useAction(downVoteAction, {
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          post={post.post}
          vote_counter={post.vote_counter}
          num_votes={post.num_votes}
          num_comment={post.num_comments}
          up_vote_selected={post.is_up_vote}
          down_vote_selected={post.is_down_vote}
          onUpvoteClick={() => {
            upVoteAct.execute({ post_id: post.id });
          }}
          onDownvoteClick={() => {
            downVoteAct.execute({ post_id: post.id });
          }}
        />
      ))}
    </div>
  );
}
