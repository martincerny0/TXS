import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface UserAvatarProps {
  userId: number;
  name: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userId, name }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Avatar>
      <AvatarImage src={`...${userId}`} alt={"Avatar of the user"} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
