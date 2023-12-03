import Link from "next/link";

export default function PostNotFound() {
  return (
    <main className="max-w-[1200px] mx-auto">
      <h2>Post not found</h2>
      <Link href={"/"} className="underline text-blue-500">
        back to home
      </Link>
    </main>
  );
}
