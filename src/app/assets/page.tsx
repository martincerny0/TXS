import { Suspense } from "react";
import MainLoading from "../_components/Loading/MainLoading";
import ChartPage from "./AssetsPage";
import { getServerAuthSession } from "@/server/auth";

export const metadata = {
  title: 'Create New Chart | TXS',
};

export default async function Page() {
    const session = await getServerAuthSession();
  
  return <Suspense fallback={<MainLoading/>}>
    <ChartPage user={session?.user}/>
    </Suspense>;

}
