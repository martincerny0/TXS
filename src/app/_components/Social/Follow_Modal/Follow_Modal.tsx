import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UserAvatar from '../../MainElements/User_Avatar/User_Avatar'
import type { AccountFollower } from '@/types/user'



interface FollowersModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  followUser: AccountFollower[]
}

const FollowModal : React.FC<FollowersModalProps> = ({ isOpen, onClose, title, followUser }) => {
  const [users, setUsers] = useState<AccountFollower[]>([]);
  console.log(followUser);
  useEffect(() => {
    if(followUser) setUsers(followUser);
  }, [followUser]);

  const toggleFollow = (name: string) => {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {/* <UserAvatar user={user} /> */}
                <span className="font-medium">{user.name}</span>
              </div>
              <Button 
                // variant={user.isFollowing ? "outline" : "default"} 
                onClick={() => toggleFollow(user.name)}
              >
                {/* {user.isFollowing ? "Unfollow" : "Follow"} */}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FollowModal;

