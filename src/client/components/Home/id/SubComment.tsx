"use client";
import { FormEvent, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import SubSubComment from "./SubSubComment";
import { createSubCommmentAction, getSubCommentByCommentIdAction } from "@/server/actions/comment";

type Props = {
  id: string;
  post_id: string;
  comment_id: string;
  username: string;
  comment: string;
};

export default function SubComment({
  id,
  post_id,
  comment_id,
  username,
  comment,
}: Props) {
  const [showAddComment, setShowAddComment] = useState(false);
  const [commentinput, setCommentInput] = useState<string>("");
  const [subComments, setSubComments] = useState<{
    id: string,
    post_id: string,
    comment_id: string,
    comment: string,
    username: string
  }[]>([]);

  const getSubCommentAct = useAction(getSubCommentByCommentIdAction, {
    onSuccess: (data) => {
      setSubComments(data.map((item) => ({
        id: item.id,
        post_id: item.post_id,
        comment_id: comment_id,
        comment: item.comment,
        username: item.user.username
      })))
    }
  });

  const createSubCommentAct = useAction(createSubCommmentAction, {
    onSuccess: () => {
      setShowAddComment(false);
      setCommentInput("");
      getSubCommentAct.execute({ comment_id: id });
    },
  });

  const onShowCommentsClick = () => {
    if (subComments.length === 0) {
      getSubCommentAct.execute({ comment_id: id });
    } else {
      setSubComments([]);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentinput.trim() !== "") {
      createSubCommentAct.execute({
        comment: commentinput.trim(),
        post_id: post_id,
        comment_id: id,
      });
    }
  };

  return (
    <div className="w-full flex">
      <div className="min-w-[25px] md:min-w-[50px]"></div>
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
            <a
              onClick={() => { onShowCommentsClick() }}
              className="text-blue-500 underline cursor-pointer pl-2"
            >
              Show Comments
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
        {subComments.map((sub_comment) => (
          <SubSubComment
            key={sub_comment.id}
            comment={sub_comment.comment}
            username={sub_comment.username}
          />
        ))}
      </div>
    </div>
  );
}
