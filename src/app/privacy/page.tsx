import { getServerAuthSession } from "@/server/auth";
import PrivacyPolicy from "./PrivacyPage";

export const metadata = {
  title: 'Privacy Policy | TXS',
};

export default async function Page() {
        const session = await getServerAuthSession();
  
  return <PrivacyPolicy user={session?.user} />;
}
