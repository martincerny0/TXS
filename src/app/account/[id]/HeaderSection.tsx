"use client";
import React, { useEffect } from "react";
import { Settings, MessageSquare, Crown, Share, MessageCirclePlus, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UserAccount, AccountFollower, AccountUser } from "@/types/user";
import UserAvatar from "@/app/_components/MainElements/User_Avatar/User_Avatar";
import FollowModal from "@/app/_components/Social/Follow_Modal/Follow_Modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// app url
const url = process.env.NEXT_PUBLIC_URL;

interface HeaderSectionProps {
  user: UserAccount;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ user }) => {
  // utils
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openFollowersModal = () => setIsFollowersModalOpen(true);
  const openFollowingModal = () => setIsFollowingModalOpen(true);

    const { toast } = useToast();

  // followers and following states
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // if (user?.followers) setFollowers(user.followers);
    // if (user?.following) setFollowing(user.following);
  }, [user]);


  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?text=Hey, look at this amazing profile! + ${url}/account/${user.id}`;
        break;

      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=Hey,  look at this amazing profile! +   ${url}/account/${user.id}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${url}/account/${user.id}`);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

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
          <div className="flex w-full space-x-2 mt-4">
          <Button size={"sm"} variant="default">
            Follow
          </Button>
          <Button size={"sm"} variant="outline">
            <MessageCirclePlus className="h-4 w-4" />
            </Button>
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
          <Dialog
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
              >
                <DialogTrigger className="flex">
                <Button variant="outline" asChild>
                  <div className="h-4 w-20">
                    <Share className="h-4 w-4" />
                    Share
                    </div>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this profile</DialogTitle>
                    <DialogDescription>
                      Choose how you want to share this user&apos;s profile
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input value={`${url}/account/${user.id}`} readOnly />
                      <Button  variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <Button variant="outline" onClick={() => handleShare("x")}>
                      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0 L80 100 L20 200 H50 L100 130 L150 200 H180 L120 100 L180 0 H150 L100 70 L50 0 H20 Z" fill="none" stroke="black" stroke-width="10"/>
                        </svg>

                      Share on X
                    </Button>
                    <Button
                  
                      variant="outline"
                      onClick={() => handleShare("whatsapp")}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Share on WhatsApp
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
