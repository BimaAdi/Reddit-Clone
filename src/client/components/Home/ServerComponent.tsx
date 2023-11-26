"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

type Props = {
  hello: string;
};

export default function ServerComponent({ hello }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Component</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="testServerComponentId">{hello}</div>
      </CardContent>
    </Card>
  );
}
