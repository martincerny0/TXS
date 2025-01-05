export interface Conversation {
    id: number;
    recipientId: number;
    recipientName: string;
    lastMessage: string;
    lastMessageAt: Date;
}