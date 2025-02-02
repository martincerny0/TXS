import { getServerAuthSession } from "@/server/auth";
import InsightPage from "./InsightPage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Insight | TXS ",
};

export default async function Page({ params }: { params: { id: string } }) {
   const session = await getServerAuthSession();

  return <InsightPage user={session?.user} id={parseInt(params.id)} />;
}
