import * as context from "next/headers";
import { validate } from "uuid";
import AddComment from "@/client/components/Home/id/AddComment";
import Comment from "@/client/components/Home/id/Comment";
import PostDetail from "@/client/components/Home/id/PostDetail";
import PostNotFound from "@/client/components/Home/id/PostNotFound";
import { getDetailPost } from "@/server/actions/post";
import { auth } from "@/server/auth/lucia";
import { getCommentByPostId } from "@/server/actions/comment";

export default async function PageDetail({
  params,
}: {
  params: { id: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!validate(params.id)) {
    return <PostNotFound />;
  }

  const post = await getDetailPost({
    id: params.id,
    user: session
      ? {
          id: session.user.userId,
          username: session.user.username,
        }
      : null,
  });
  if (!post) {
    return <PostNotFound />;
  }

  const comments = await getCommentByPostId({ post_id: post.id });

  return (
    <main className="max-w-[1200px] mx-auto px-2 flex flex-col gap-4">
      <PostDetail
        id={post.id}
        title={post.title}
        full_post={post.FullPost[0].full_post}
        vote_counter={post.vote_counter}
        num_votes={post.num_votes}
        num_comments={post.num_comments}
        author={post.user.username}
        is_up_vote={post.is_up_vote}
        is_down_vote={post.is_down_vote}
      />
      <div>Comments:</div>
      {session ? <AddComment post_id={post.id} /> : <></>}
      <div className="w-full flex flex-col gap-4">
      {comments.map((comment) => (
        <>
          <Comment
            key={comment.id}
            post_id={post.id}
            comment_id={comment.id}
            username={comment.user.username}
            comment={comment.comment}
          />
        </>
      ))}
      </div>
    </main>
  );
}
