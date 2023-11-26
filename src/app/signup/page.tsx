import SignUp from "@/client/components/Home/signup/SignUp";
import { signUpAction } from "@/server/actions/auth";
import { twMerge } from "tailwind-merge";

const Page = async () => {
  return (
    <main className={twMerge("min-h-[500px] w-full grid place-items-center")}>
      <div className={twMerge("flex flex-col gap-2 justify-center")}>
        <SignUp signUp={signUpAction} />
      </div>
    </main>
  );
};

export default Page;
