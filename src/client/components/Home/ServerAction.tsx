"use client";
import { FormEvent, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { sayHelloAction } from "@/server/actions/hello";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

type Props = {
  sayHello: typeof sayHelloAction;
};

export default function ServerAction({ sayHello }: Props) {
  const [username, setUsername] = useState("");
  const [helloMessage, setHelloMessage] = useState<string | null>(null);

  const { execute } = useAction(sayHello, {
    onSuccess: (data) => {
      setHelloMessage(data.success);
      setUsername("");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(username);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Action</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="server-action-input"
          />
          <Button variant={"default"} data-testid="server-action-submit">Say Hello</Button>
          {helloMessage ? <div data-testid="server-action-output">{helloMessage}</div> : <div data-testid="server-action-output"></div>}
        </form>
      </CardContent>
    </Card>
  );
}
