import { getServerAuthSession } from "@/server/auth";
import ChartPage from "./ChartPage";
import { caller } from "@/app/caller";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const assetName = await caller.asset.getAssetNameByChartId({ chartId: id });
  if(!assetName) {
    return { title: "No Chart Found | TXS" };
  }
  return { title: `${assetName} Chart | TXS` };
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerAuthSession();
  
    if (session?.user === null || session?.user === undefined) {
      return redirect("/signin");
    }
  return <ChartPage initialChartId={parseInt(params.id)} user={session.user} />;
}
