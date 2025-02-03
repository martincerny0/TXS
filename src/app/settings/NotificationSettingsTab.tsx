
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import type { User } from "next-auth";
import React, { useState } from "react";

interface NotificationSettingsTabProps {
    user: User;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const NotificationSettingsTab : React.FC<NotificationSettingsTabProps> = ({user, isLoading, setIsLoading}) => {
      const [tradeNotifications, setEmailNotifications] = useState<boolean>(user.isTradeNotification);

      const { toast } = useToast();
      // mutation
      const changeNotificationSettings = api.user.changeUserNotificationSettings.useMutation();

      const changeSetting = async () => {
        setIsLoading(true);
        const response = await changeNotificationSettings.mutateAsync({isTradeNotification: tradeNotifications})

        setIsLoading(false);
        if(response.success) {
            return toast({
              title: "Notification Preferences Updated",
              description: "Your notification preferences have been updated successfully.",  
            })
        }
            return toast({
              title: "Error",
              description: "An error occurred while updating your notification preferences.", 
              variant: "destructive", 
            })
      }
    return (
        <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage your notification settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notification After Each Trade</Label>
              <p className="text-sm text-muted-foreground">
                Receive an email notification after each trade is completed
              </p>
            </div>
            <Switch
              checked={tradeNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <Button className="w-full" onClick={changeSetting} disabled={isLoading || (tradeNotifications === user.isTradeNotification)}>Save Preferences</Button>
        </CardContent>
      </Card>
    );
};

export default NotificationSettingsTab;