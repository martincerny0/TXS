"use client";
import React, { useEffect } from "react";
import { Settings, MessageSquare, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";
import FollowModal from "../_components/Social/Follow_Modal/Follow_Modal";
import { type AccountFollower, type AccountUser } from "@/types/user";
import RedirectButton from "../_components/Redirect/Redirect_Button/Redirect_Button";

interface HeaderSectionProps {
  user?: AccountUser;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ user }) => {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const openFollowersModal = () => setIsFollowersModalOpen(true);
  const openFollowingModal = () => setIsFollowingModalOpen(true);

  const [followers, setFollowers] = useState<AccountFollower[]>([]);
  const [following, setFollowing] = useState<AccountFollower[]>([]);

  useEffect(() => {
    if (user?.followers) setFollowers(user.followers);
    if (user?.following) setFollowing(user.following);
  }, [user]);

  if (!user?.name) return null;

  return (
    <section className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-start space-x-4">
        <UserAvatar classname="h-20 w-20" user={user}  />
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.isSubscribed && <Crown className="h-5 w-5 text-yellow-400" />}
          </div>
          <p className="text-gray-500">@{user.tag}</p>
          <p className="mt-1 text-sm text-gray-500">
            Member since: {user.createdAt.toDateString()}
          </p>
          <div className="relative mt-2 w-80">
            <p className="text-sm text-gray-700">{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          42 posts
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={openFollowersModal}
          className="rounded-full hover:bg-secondary"
        >
          1,234 followers
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={openFollowingModal}
          className="rounded-full hover:bg-secondary"
        >
          567 following
        </Button>
        <RedirectButton href="/settings" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </RedirectButton>
        <RedirectButton href="/chat" variant="default">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </RedirectButton>
      </div>
      <FollowModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        title="Followers"
        followUser={followers}
      />

      <FollowModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        title="Following"
        followUser={following}
      />
    </section>
  );
};

export default HeaderSection;
