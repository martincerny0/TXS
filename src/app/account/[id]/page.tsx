import { getServerAuthSession } from "@/server/auth";
import { caller } from "@/app/caller";
import { redirect } from "next/navigation";
import UserNotFound from "@/app/_components/Errors/UserNotFound";
import AccountPage from "./AccountPage";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const user = await caller.user.getUserById({ id });
  if(!user) {
    return { title: "No User found | TXS" };
  }
  return { title: `@${user.tag}'s Account | TXS` };
}

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getServerAuthSession();
    
    // prevent from user visit chart page without being signed in
    if (session?.user === null || session?.user === undefined) return redirect("/signin?origin=account");
    // prevent from user visit its own account page on 'strange' url
    if(session.user.id === parseInt(params.id)) return redirect("/account");
    
    // check if user exists
    const user = await caller.user.getUserById({ id: parseInt(params.id) });
    if(!user) {
        return <UserNotFound />;
    }
    return <AccountPage accountOfUser={user} sessionUser={session.user} />;
}
