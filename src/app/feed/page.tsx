import { getServerAuthSession } from "@/server/auth";
import SocialFeed from "./FeedPage";

export const metadata = {
  title: 'Feed | TXS',
};

export default async function Page() {
    const session = await getServerAuthSession();
  
  return <SocialFeed user={session?.user} />;
}
