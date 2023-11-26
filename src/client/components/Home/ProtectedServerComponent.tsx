"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

type Props = {
  msg: string;
};

export default function ProtectedServerComponent({ msg }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Protected Server Component</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="testProtectedServerComponentId">{msg}</div>
      </CardContent>
    </Card>
  );
}
