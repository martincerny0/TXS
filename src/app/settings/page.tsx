import { getServerAuthSession } from "@/server/auth";
import SettingsPage from "./SettingsPage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Settings | TXS",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session?.user === null || session?.user === undefined) {
    return redirect("/signin");
  }

  return <SettingsPage user={session?.user} />;
}
