import SignInComponent from "@/client/components/Home/signin/SignIn";
import { signInAction } from "@/server/actions/auth";
import { twMerge } from "tailwind-merge";

const Page = async () => {
  return (
    <main className={twMerge("min-h-[500px] w-full grid place-items-center")}>
      <div className={twMerge("flex flex-col gap-2 justify-center")}>
        <SignInComponent signIn={signInAction} />
      </div>
    </main>
  );
};

export default Page;
