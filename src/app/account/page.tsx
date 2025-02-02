import { getServerAuthSession } from "@/server/auth";
import AccountPage from "./AccountPage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Account | TXS",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session?.user === null || session?.user === undefined) {
    return redirect("/signin");
  }
  return <AccountPage user={session.user} />;
}
