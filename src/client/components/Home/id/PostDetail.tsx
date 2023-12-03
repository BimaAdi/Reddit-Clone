"use client";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hook";
import DownArrow from "../../DownArrow";
import UpArrow from "../../UpArrow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { downVoteAction, upVoteAction } from "@/server/actions/vote";

type Props = {
  id: string;
  title: string;
  full_post: string;
  vote_counter: number;
  num_votes: number;
  num_comments: number;
  author: string;
  is_up_vote: boolean;
  is_down_vote: boolean;
};

export default function PostDetail({
  id,
  title,
  full_post,
  vote_counter,
  num_votes,
  num_comments,
  author,
  is_up_vote,
  is_down_vote,
}: Props) {
  const router = useRouter();
  const upVoteAct = useAction(upVoteAction, {
    onSuccess: () => {
      router.refresh();
    },
  });
  const downVoteAct = useAction(downVoteAction, {
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Card className="flex">
      <div className="flex flex-col justify-start items-center gap-2 py-6 pl-6">
        <UpArrow
          selected={is_up_vote}
          onClick={() => {
            upVoteAct.execute({ post_id: id });
          }}
        />
        <div className="text-lg">{vote_counter}</div>
        <DownArrow
          selected={is_down_vote}
          onClick={() => {
            downVoteAct.execute({ post_id: id });
          }}
        />
      </div>
      <div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-justify">{full_post}</p>
        </CardContent>
        <CardFooter className="flex justify-start items-center gap-4">
          <div>{num_votes} Votes</div>
          <div>{num_comments} Comments</div>
          <div>{author}</div>
        </CardFooter>
      </div>
    </Card>
  );
}
