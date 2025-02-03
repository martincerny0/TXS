import React from "react";
import type { User } from "next-auth";
import ServerNav from "@/app/_components/MainElements/Main_Nav/MainNav";
import AdCard from "@/app/_components/Others/Ad_Card/Ad_Card";
import SocialSection from "../SocialSection";
import Footer from "@/app/_components/MainElements/Footer/Footer";
import FinancialSection from "./FinancialSection";
import HeaderSection from "./HeaderSection";
import type { UserAccount } from "@/types/user";

interface AccountPageProps {
  accountOfUser: UserAccount;
  sessionUser: User;
}
const AccountPage: React.FC<AccountPageProps> = ({
  accountOfUser,
  sessionUser,
}) => {
  return (
    <div>
      <ServerNav isMessage user={sessionUser}  />  
      <div className="mx-auto max-w-7xl lg:py-20">
        <HeaderSection user={accountOfUser} />
        <AdCard isSubscribed={sessionUser.isSubscribed} />
        <div className="grid gap-8 md:grid-cols-2">
          <FinancialSection user={accountOfUser} />
          <SocialSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
