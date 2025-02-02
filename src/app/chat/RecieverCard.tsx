"use client";
import type { Conversation } from "@/types/chat";
import React from "react";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";

interface RecieverCardProps {
  conversation: Conversation;
  selectedConversation: Conversation;
  setSelectedConversation: (conversation: Conversation) => void;
}

const RecieverCard: React.FC<RecieverCardProps> = ({
  conversation,
  selectedConversation,
  setSelectedConversation,
}) => {
  return (
    <div
      className={`cursor-pointer p-4 transition-colors duration-200 hover:bg-accent ${selectedConversation?.id === conversation.id && "bg-accent"}`}
      onClick={() => {setSelectedConversation(conversation);window.history.pushState({}, "", `/chat/${selectedConversation.id}`);}}
    >
      <div className="flex items-center space-x-4">
        <UserAvatar user={conversation.recipient} isDropdown={false} isRedirect={false} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between">
            <p className="truncate text-sm font-medium">
              {conversation.recipient.name}
            </p>
            <span className="text-xs text-muted-foreground">
              {conversation.lastMessageAt.toLocaleDateString()}
            </span>
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {conversation.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecieverCard;
