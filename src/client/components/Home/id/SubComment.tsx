"use client";
import { FormEvent, useState } from "react";
// import { useAction } from "next-safe-action/hook";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
// import { createSubCommmentAction } from "@/server/actions/comment";
// import { useRouter } from "next/navigation";

type Props = {
  post_id: string;
  comment_id: string;
  username: string;
  comment: string;
};

export default function SubComment({
  post_id,
  comment_id,
  username,
  comment,
}: Props) {
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const [commentinput, setCommentInput] = useState<string>("");
  // const router = useRouter();
  // const createSubCommentAct = useAction(createSubCommmentAction, {
  //   onSuccess: () => {
  //     setCommentInput("");
  //     setShowAddComment(false);
  //     console.log("called");
  //     router.refresh();
  //   },
  // });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentinput.trim() !== "") {
      // createSubCommentAct.execute({
      //   comment: commentinput.trim(),
      //   post_id: post_id,
      //   comment_id: comment_id,
      // });
    }
  };

  return (
    <div className="w-full flex">
      <div className="min-w-[50px]"></div>
      <div className="w-full flex flex-col gap-4">
        <Card>
          <CardHeader>{username}</CardHeader>
          <CardContent>{comment}</CardContent>
          <CardFooter>
            <a
              onClick={() => setShowAddComment(!showAddComment)}
              className="text-blue-500 underline cursor-pointer"
            >
              Add Comment
            </a>
          </CardFooter>
        </Card>
        {showAddComment ? (
          <form onSubmit={onSubmit} className="flex w-full gap-2">
            <Input
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentinput}
            />
            <Button className="min-w-[130px]" type="submit">
              Add Comment
            </Button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
