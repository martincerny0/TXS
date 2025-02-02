import { getServerAuthSession } from "@/server/auth";
import InsightsPage from "./InsightsPage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Insights | TXS",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session?.user === null || session?.user === undefined) {
    return redirect("/signin");
  }
  
  return <InsightsPage user={session.user} />;
}
