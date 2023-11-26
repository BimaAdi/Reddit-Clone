import * as context from "next/headers";
import { twMerge } from "tailwind-merge";
import { auth } from "@/server/auth/lucia";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className={twMerge("min-h-[500px] w-full grid place-items-center")}>
      <div className="text-center">
        <h1 className="text-4xl">This is a ProtectPage</h1>
        <div>Welcome {session.user.username}</div>
      </div>
    </main>
  );
}
