import DownArrow from "../DownArrow";
import UpArrow from "../UpArrow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type PostProps = {
  id: string;
  title: string;
  post: string;
  vote_counter: number;
  num_votes: number;
  num_comment: number;
  up_vote_selected: boolean;
  down_vote_selected: boolean;
};

export default function Post({
  title,
  post,
  vote_counter,
  num_votes,
  num_comment,
  up_vote_selected,
  down_vote_selected
}: PostProps) {
  return (
    <Card className="flex">
      <div className="flex flex-col justify-around items-center p-6">
        <UpArrow selected={up_vote_selected} />
        <div className="text-lg">{vote_counter}</div>
        <DownArrow selected={down_vote_selected} />
      </div>
      <div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post}</p>
        </CardContent>
        <CardFooter className="flex justify-start items-center gap-4">
          <div>{num_votes} Votes</div>
          <div>{num_comment} Comments</div>
        </CardFooter>
      </div>
    </Card>
  );
}
