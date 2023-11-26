import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import CreatePost from "@/client/components/Home/CreatePost";
import Link from "next/link";
import { createPostAction, getAllPost } from "@/server/actions/post";
import PostList from "@/client/components/Home/PostList";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  const posts = await getAllPost();

  return (
    <main className="max-w-[1200px] mx-auto">
      {session ? (
        <div className="py-6">
          <CreatePost createPost={createPostAction} />
        </div>
      ) : (
        <div className="py-6">
          Please{" "}
          <Link href={"/signin"} className="underline font-bold">
            signIn
          </Link>{" "}
          to create new post
        </div>
      )}
      <PostList posts={posts} />
    </main>
  );
}
