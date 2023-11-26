"use client";
import { FormEvent, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { protectedSayHelloAction } from "@/server/actions/hello";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { error } from "console";

type Props = {
  sayHello: typeof protectedSayHelloAction;
};

export default function ProtectedServerAction({ sayHello }: Props) {
  const [username, setUsername] = useState("");
  const [helloMessage, setHelloMessage] = useState<string | null>(null);

  const { execute } = useAction(sayHello, {
    onSuccess: (data) => {
      setHelloMessage(data.success);
      setUsername("");
    },
    onError: (error) => {
      console.log(error.fetchError);
      console.log(error.serverError);
      console.log(error.validationError);
      setHelloMessage("Please SignIn");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(username);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protected Server Action</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="protected-server-action-input"
          />
          <Button variant={"default"} data-testid="protected-server-action-submit">Say Hello Protected</Button>
          {helloMessage ? <div data-testid="protected-server-action-output">{helloMessage}</div> : <div data-testid="protected-server-action-output"></div>}
        </form>
      </CardContent>
    </Card>
  );
}
