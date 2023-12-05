import { Card, CardContent, CardHeader } from "../../ui/card";

type Props = {
  username: string;
  comment: string;
};

export default function SubSubComment({
  username,
  comment,
}: Props) {
  return (
    <div className="w-full flex">
      <div className="min-w-[50px] md:min-w-[100px]"></div>
      <div className="w-full flex flex-col gap-4">
        <Card>
          <CardHeader>{username}</CardHeader>
          <CardContent>{comment}</CardContent>
        </Card>
      </div>
    </div>
  );
}
