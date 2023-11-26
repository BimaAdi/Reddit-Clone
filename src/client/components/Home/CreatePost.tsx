"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { createPostAction } from "@/server/actions/post";
import { useAction } from "next-safe-action/hook";
import { useRouter } from "next/navigation";

const createPostFormSchema = z.object({
  title: z.string().min(3).max(50),
  post: z.string().min(3).max(1000),
});

type Props = {
  createPost: typeof createPostAction;
};

export default function CreatePost({ createPost }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const createPostAct = useAction(createPost, {
    onSuccess: () => {
      setOpen(false);
      form.reset();
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      post: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createPostFormSchema>) => {
    createPostAct.execute({
      title: values.title,
      post: values.post,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full flex justify-end items-center">
        <DialogTrigger className="bg-slate-900 p-3 text-white rounded-md">
          Create Post
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="post" {...field} /> */}
                    <Textarea placeholder="Your post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button data-testid="createPostButton" type="submit">
                Create Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
