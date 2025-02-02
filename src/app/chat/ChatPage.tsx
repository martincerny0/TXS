"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Crown, Paperclip, SearchIcon, Send } from "lucide-react";
import type { Conversation, Message } from "@/types/chat";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";
import RecieverCard from "./RecieverCard";
import MessageCard from "./MessageCard";
import RedirectButton from "../_components/Redirect/Redirect_Button/Redirect_Button";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";
import type { User } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for conversations
const conversations: Conversation[] = [
  {
    id: 1,
    recipient: {
      email: "barly@zvonek.cz",
      id: 3,
      name: "Jiri Barlog",
      tag: "barly",
      isSubscribed: true,
      isNotification: true,
    },
    lastMessage: "Hey, how's it going?",
    lastMessageAt: new Date("5.5.2024 12:52:20"),
  },
  {
    id: 2,
    recipient: {
      email: "scooby@doo.com",
      id: 4,
      name: "Scooby Doo",
      tag: "scoobydo",
      isSubscribed: false,
      isNotification: true,
    },
    lastMessage: "Did you see the latest market trends?",
    lastMessageAt: new Date(),
  },
];

// Mock data for messages in a conversation
const mockMessages: Message[] = [
  {
    id: 1,
    sender: {
      id: 3,
      name: "Jiri Barlog",
      email: "barly@zvonek.cz",
      tag: "barly",
      isNotification: true,
      isSubscribed: true,
    },
    isSender: true,
    content: "Nazdar barly, tak co?",
    timestamp: new Date("5.5.2024 12:52:20"),
  },
  {
    id: 2,
    sender: {
      id: 3,
      name: "Scooby Doo",
      email: "scooby@doo.com",
      tag: "scoobydo",
      isNotification: true,
      isSubscribed: true,
    },
    isSender: false,
    content: "Cus, jde to",
    timestamp: new Date("5.5.2024 12:52:20"),
  },
];

interface ChatPageProps {
  user: User;
}

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversations[0]!);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const attachmentRef = React.useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    return;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <ServerNav user={user} />
      <div className="container mx-auto flex-grow px-8 py-5">
        <div className="container mx-auto flex flex-col p-4">
          <div className="flex flex-grow flex-col overflow-hidden rounded-lg border bg-card shadow-lg md:flex-row">
            {/* Conversations List */}
            <div className="w-full border-r border-border md:w-1/3">
              <div className="border-b border-border p-4">
                <h2 className="mb-4 text-2xl font-bold">Messages</h2>
                <div className="relative mt-8 backdrop-blur">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    type="search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Conversations..."
                    className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
              <ScrollArea className="min-h-[70vh]">
                {conversations.map((conversation) => (
                  <RecieverCard
                    key={conversation.id}
                    conversation={conversation}
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                  />
                ))}
              </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="flex w-full flex-col md:w-2/3">
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center space-x-4">
                  <UserAvatar user={selectedConversation.recipient} />
                  <div>
                    <p className="text-sm font-medium">
                      {selectedConversation.recipient.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      @{selectedConversation.recipient.tag}
                    </p>
                  </div>
                  {selectedConversation.recipient.isSubscribed && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Crown className="h-5 w-5 text-yellow-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Premium User</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <RedirectButton
                  href={`/account/${selectedConversation.recipient.id}`}
                  variant="outline"
                  size="sm"
                >
                  View Profile
                </RedirectButton>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                {messages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    className="hidden"
                    ref={attachmentRef}
                    onChange={(e) => {
                      console.log(e.target.files);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => attachmentRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    className="flex-grow"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
