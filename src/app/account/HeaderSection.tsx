import { Settings, MessageSquare, Crown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import FollowModal from '../_components/Follow_Modal/Follow_Modal'
import UserAvatar from '../_components/User_Avatar/User_Avatar'


export default function HeaderSection() {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const openFollowersModal = () => setIsFollowersModalOpen(true);
  const openFollowingModal = () => setIsFollowingModalOpen(true);

  const isSubscribed = false;
  const bio =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adi";

  // testing users data
  const users = [
    { id: 1, name: "martin", avatarUrl: "", isFollowing: true },
    { id: 2, name: "cerny", avatarUrl: "", isFollowing: false },
    { id: 3, name: "martinsnsnsn", avatarUrl: "", isFollowing: true },
  ];

  const user = {
    name: "Martin Cerny",
    id:58484848,
  };

  return (
    <section className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-start space-x-4">
        <UserAvatar name={user.name} userId={user.id} />
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Martin Cerny</h1>
            {isSubscribed && <Crown className="h-5 w-5 text-yellow-400" />}
          </div>
          <p className="text-gray-500">@martincerny</p>
          <p className="mt-1 text-sm text-gray-500">Member since: Dec 2024</p>
          <div className="relative mt-2 w-80">
            <p className="text-sm text-gray-700">{bio}</p>
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
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="default">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
      </div>
      <FollowModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        title="Followers"
        users={users}
      />

      <FollowModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        title="Following"
        users={users}
      />
    </section>
  );
}