import Navbar from "@/client/components/Navbar";
import Footer from "@/client/components/Footer";
import { signOutAction } from "@/server/actions/auth";

export default function HomeLayout({
  children,
  isLogin,
  signOut,
}: {
  children: React.ReactNode;
  isLogin: boolean;
  signOut: typeof signOutAction;
}) {
  return (
    <div className="min-h-screen max-w-screen relative">
      <Navbar isLogin={isLogin} signOut={signOut} />
      <div className="mt-5 pb-20">{children}</div>
      <Footer />
    </div>
  );
}
