import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();


  return (
    <main className="max-w-[1200px] mx-auto">
      <h1>Reddit Clone</h1>
    </main>
  );
}
