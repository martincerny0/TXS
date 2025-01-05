import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import type { Post } from '@/types/post';

interface SocialPostCard {
    post: Post;
}

const SocialPostCard : React.FC<SocialPostCard> = ({post}) => {
    return (
        <Card key={post.id} className="p-4">
        <div className="flex items-start space-x-4">
          <Image
            src={`/image/user/${post.user.id}.webp`}
            alt={`Avatar of user ${post.user.tag}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h4 className="font-bold">{post.user.name}</h4>
            <p className="text-sm">{post.content}</p>
            <p className="mt-1 text-xs text-gray-500">
              {post.createdAt.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    )
}

export default SocialPostCard;