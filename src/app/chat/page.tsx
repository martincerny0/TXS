import { getServerAuthSession } from "@/server/auth";
import ChatMessage from "./ChatPage";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Messages | TXS',
};

export default async function Page() {
    const session = await getServerAuthSession();
  
    if (session?.user === null || session?.user === undefined) {
      return redirect("/signin");
    }
    
  return <ChatMessage user={session.user} />;
}
