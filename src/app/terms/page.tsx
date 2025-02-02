import { getServerAuthSession } from "@/server/auth";
import TermsOfService from "./TermsPage";

export const metadata = {
  title: 'Terms of Service | TXS',
};

export default async function Page() {
      const session = await getServerAuthSession();
  
  return <TermsOfService user={session?.user} />;
}
