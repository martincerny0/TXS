import React from 'react';
import type { Post } from '@/types/post';
import UserAvatar from '../../MainElements/User_Avatar/User_Avatar';
import RedirectCard from '../../Redirect/Redirect_Card/Redirect_Card';

interface SocialPostCard {
    post: Post;
}

const SocialPostCard : React.FC<SocialPostCard> = ({post}) => {
    return (
        <RedirectCard href={`/post/${post.id}`} key={post.id} className="p-4 hover:cursor-pointer hover:scale-105">
        <div className="flex items-start space-x-4">
        <UserAvatar user={post.user}  />
          <div>
            <h4 className="font-bold">{post.user.name}</h4>
            <p className="text-sm">{post.content}</p>
            <p className="mt-1 text-xs text-gray-500">
              {post.createdAt.toDateString()}
            </p>
          </div>
        </div>
      </RedirectCard>
    )
}

export default SocialPostCard;