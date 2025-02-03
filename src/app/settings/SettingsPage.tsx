"use client";

import React, {  useState } from "react";
import {
  Bell,
  CreditCard,
  User as UserIcon,
} from "lucide-react";
import type { User } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";
import { useSearchParams } from "next/navigation";
import UserDetailsTab from "./UserDetailsTab";
import NotificationSettingsTab from "./NotificationSettingsTab";
import PaymentsTab from "./PaymentsTab";

interface SettingsPageProps {
  user: User;
}

const SettingPage: React.FC<SettingsPageProps> = ({ user }) => {


  // utils
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedTab = useSearchParams().get("tab");

  return (
    <div>
      <ServerNav user={user}  />
      <Tabs
        defaultValue={selectedTab ?? "account"}
        className="container mx-auto mt-14 w-2/3 space-y-6"
      >
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="account" disabled={isLoading}>
            <UserIcon className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled={isLoading}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payments" disabled={isLoading}>
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          {/* user details tab  */}
        <UserDetailsTab isLoading={isLoading} setIsLoading={setIsLoading} user={user} />
        </TabsContent>
        <TabsContent value="notifications">
          {/* notification settings tab  */}
          <NotificationSettingsTab user={user} isLoading={isLoading} setIsLoading={setIsLoading} />
        </TabsContent>
        <TabsContent value="payments">
          {/* payments tab */}
          <PaymentsTab user={user} isLoading={isLoading} setIsLoading={setIsLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
