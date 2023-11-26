import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import Post from "@/client/components/Post";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();


  return (
    <main className="max-w-[1200px] mx-auto">
      <Post />
    </main>
  );
}
