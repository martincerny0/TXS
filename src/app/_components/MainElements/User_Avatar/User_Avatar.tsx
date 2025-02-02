"use client";
import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { User as UserIcon, Settings, CreditCard, LogOut, StarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";

interface UserAvatarProps {
  user: User;
  isDropdown?: boolean;
  classname?: string;
  isRedirect?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, isDropdown = false, classname, isRedirect = true }) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/logout",
    });
    setIsLogoutDialogOpen(false);
  };
  if(!user) return null;

  if (!isDropdown && isRedirect) {
    return (
      <Link href={`/account/${user.id}`}>
        <Avatar className={classname}>
          <AvatarImage className="border shadow-sm" src={`/image/user/${user.id}.webp`} alt={`Avatar of ${user.name}`} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </Link>
    );
  }
  if(!isDropdown && !isRedirect) {
    return (
      <Avatar className={`bg-cover ${classname}`}>
        <AvatarImage className="border shadow-sm" src={`/image/user/${user.id}.webp`} alt={`Avatar of ${user.name}`} />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className={`cursor-pointer shadow-md ${classname}`}>
            <AvatarImage src={`/image/user/${user.id}.webp`} alt={`Avatar of ${user.name}`} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem disabled className="flex items-center opacity-50">
            <UserIcon className="mr-3 h-4 w-4" />
            {user.name}
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="flex items-center opacity-50">
           {user.isSubscribed ? (<>
            <StarIcon className="mr-3 h-4 w-4 text-yellow-400" />
            Subscribed
           </>) : (<>
            <StarIcon className="mr-3 h-4 w-4 text-gray-400" />
            No Active Subscription
           </>)}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account" className="flex items-center">
              <UserIcon className="mr-3 h-4 w-4" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings?tab=payments" className="flex items-center">
              <CreditCard className="mr-3 h-4 w-4" />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setIsLogoutDialogOpen(true)}>
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              You will be signed out of your account and redirected to the home page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAvatar;

