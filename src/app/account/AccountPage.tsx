import React from "react";
import AdCard from "../_components/Others/Ad_Card/Ad_Card";
import Footer from "../_components/MainElements/Footer/Footer";
import SocialSection from "./SocialSection";
import FinancialSection from "./FinancialSection";
import HeaderSection from "./HeaderSection";
import type { User } from "next-auth";
import type { AccountUser } from "@/types/user";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";

interface AccountPageProps {
  user: User;
}
const AccountPage : React.FC<AccountPageProps> = ({user}) => {

  if (!user) {
    return <>Loading....</>
  }

  const extendedUser : AccountUser = {
    ...user, 
    balance: 0,
    createdAt: new Date(), 
  }


  return (
    <div>
      <ServerNav isMessage={false} user={user} />
      <div className="mx-auto max-w-7xl lg:py-20">
        <HeaderSection user={extendedUser} />
        <AdCard isSubscribed={user?.isSubscribed} />
        <div className="grid gap-8 md:grid-cols-2">
          <FinancialSection />
          <SocialSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountPage;