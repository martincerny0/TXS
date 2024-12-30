import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UserAvatar from '../User_Avatar/User_Avatar'

interface User {
  id: number
  name: string
  avatarUrl: string
  isFollowing: boolean
}

interface FollowersModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  users: User[]
}

const FollowModal : React.FC<FollowersModalProps> = ({ isOpen, onClose, title, users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers)

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
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <UserAvatar userId={user.id} name={user.name} />
                <span className="font-medium">{user.name}</span>
              </div>
              <Button 
                variant={user.isFollowing ? "outline" : "default"} 
                onClick={() => toggleFollow(user.name)}
              >
                {user.isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FollowModal;

