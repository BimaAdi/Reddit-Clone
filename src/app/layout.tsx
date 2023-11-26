import type { Metadata } from "next";
import * as context from "next/headers";
import { Inter } from "next/font/google";
import HomeLayout from "@/client/layouts/HomeLayout";
import { auth } from "@/server/auth/lucia";
import "./globals.css";
import { signOutAction } from "@/server/actions/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "reddit clone (kinda)",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeLayout isLogin={session ? true : false} signOut={signOutAction}>{children}</HomeLayout>
      </body>
    </html>
  );
}
