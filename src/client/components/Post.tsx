import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Post() {
  return (
    <Card className="flex">
      <div className="flex flex-col justify-around items-center p-6">
        <UpArrow selected={true} />
        <div className="text-lg">6</div>
        <DownArrow selected={false} />
      </div>
      <div>
        <CardHeader>
            <CardTitle>Post Title</CardTitle>
        </CardHeader>
        <CardContent>
            <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            laudantium architecto minima necessitatibus illum reiciendis
            dignissimos quos quasi molestias ipsa.
            </p>
        </CardContent>
        <CardFooter className="flex justify-start items-center gap-4">
            <div>20 Votes</div>
            <div>5 Comments</div>
        </CardFooter>
      </div>
    </Card>
  );
}
