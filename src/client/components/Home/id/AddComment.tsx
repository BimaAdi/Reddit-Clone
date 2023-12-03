"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { createCommentAction } from "@/server/actions/comment";

export default function AddComment({ post_id }: { post_id: string }) {
  const [comment, setComment] = useState<string>("");

  const router = useRouter();
  const createCommentAct = useAction(createCommentAction, {
    onSuccess: () => {
      setComment("");
      router.refresh();
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      createCommentAct.execute({ comment: comment.trim(), post_id: post_id });
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <Input onChange={(e) => setComment(e.target.value)} value={comment} />
      <Button className="min-w-[130px]" type="submit">
        Add Comment
      </Button>
    </form>
  );
}
