import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

type Props = {
  username: string;
  comment: string;
};

export default function Comment({ username, comment }: Props) {
  return (
    <Card>
      <CardHeader>{username}</CardHeader>
      <CardContent>{comment}</CardContent>
    </Card>
  );
}
