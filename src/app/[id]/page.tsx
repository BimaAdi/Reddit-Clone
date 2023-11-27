import * as context from "next/headers";
import Link from "next/link";
import { validate } from "uuid";
import AddComment from "@/client/components/Home/id/AddComment";
import Comment from "@/client/components/Home/id/Comment";
import PostDetail from "@/client/components/Home/id/PostDetail";
import { getDetailPost } from "@/server/actions/post";
import { auth } from "@/server/auth/lucia";

export default async function PageDetail({
  params,
}: {
  params: { id: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  let post = null;
  if (validate(params.id)) {
    post = await getDetailPost(params.id);
  }

  if (!post) {
    return (
      <main className="max-w-[1200px] mx-auto">
        <h2>Post not found</h2>
        <Link href={"/"} className="underline text-blue-500">
          back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-2 flex flex-col gap-4">
      <PostDetail
        title={post.title}
        full_post={post.FullPost[0].full_post}
        num_votes={post.num_votes}
        num_comments={post.num_comments}
        author={post.user.username}
      />
      <div>Comments:</div>
      {session ? <AddComment /> : <></>}
      <Comment
        username="John"
        comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, ab."
      />
      <Comment
        username="Doe"
        comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, ab."
      />
      <Comment
        username="Smith"
        comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, ab."
      />
    </main>
  );
}
