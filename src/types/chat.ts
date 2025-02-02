import type { User } from "next-auth";

export interface Conversation {
    id: number;
    recipient: User;
    lastMessage: string;
    lastMessageAt: Date;
}

export interface Message {
    id: number;
    sender: User;
    content: string;
    timestamp: Date;
    isSender: boolean;
}

