"use client";
import { FormEvent, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

// TODO create comment
export default function AddComment() {
  const [comment, setComment] = useState<string>("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.trim() !== "") {
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <Input onChange={(e) => setComment(e.target.value)} />
      <Button className="min-w-[130px]" type="submit">
        Add Comment
      </Button>
    </form>
  );
}
