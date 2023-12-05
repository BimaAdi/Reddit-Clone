"use client";
import { FormEvent, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import SubComment from "./SubComment";
import { createSubCommmentAction, getSubCommentByCommentIdAction } from "@/server/actions/comment";

type Props = {
  post_id: string;
  comment_id: string;
  username: string;
  comment: string;
};

export default function Comment({
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
      getSubCommentAct.execute({ comment_id: comment_id });
    },
  });

  const onShowCommentsClick = () => {
    if (subComments.length === 0) {
      getSubCommentAct.execute({ comment_id: comment_id });
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
        comment_id: comment_id,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
        <SubComment
          key={sub_comment.id}
          id={sub_comment.id}
          post_id={sub_comment.post_id}
          comment_id={sub_comment.comment_id}
          comment={sub_comment.comment}
          username={sub_comment.username}
        />
      ))}
    </div>
  );
}
