"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { signInAction } from "@/server/actions/auth";
import { useAction } from "next-safe-action/hook";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, AlertTitle } from "../../ui/alert";

const signInFormSchema = z.object({
  username: z.string().min(3).max(60),
  password: z.string().min(3).max(60),
});

export default function SignInComponent({
  signIn,
}: {
  signIn: typeof signInAction;
}) {
  const [alert, setAlert] = useState<string | null>(null);

  const router = useRouter();

  const signInAct = useAction(signIn, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        router.push("/");
        router.refresh();
      } else if (data?.status === "BAD_REQUEST") {
        setAlert("Wrong username or Password");
      }
    },
    onError: (err) => {
      setAlert("Something wrong with the server");
    },
  });

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
    signInAct.execute({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Card className="min-w-[500px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        {alert && (
          <Alert className="border-red-600 bg-red-500">
            <AlertTitle>{alert}</AlertTitle>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="usernameInput"
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="passwordInput"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button data-testid="signInButton" type="submit">
                Sign In
              </Button>
              <Link
                href={"/signup"}
                className="text-blue-500 underline hover:cursor-pointer"
              >
                No Account SignUp
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
