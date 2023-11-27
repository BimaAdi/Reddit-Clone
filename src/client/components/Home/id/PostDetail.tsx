import DownArrow from "../../DownArrow";
import UpArrow from "../../UpArrow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

type Props = {
  title: string;
  full_post: string;
  num_votes: number;
  num_comments: number;
  author: string;
};

// TODO add feature upvote and downvote
export default function PostDetail({
  title,
  full_post,
  num_votes,
  num_comments,
  author,
}: Props) {
  return (
    <Card className="flex">
      <div className="flex flex-col justify-start items-center gap-2 py-6 pl-6">
        <UpArrow selected={false} />
        <div className="text-lg">0</div>
        <DownArrow selected={false} />
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
