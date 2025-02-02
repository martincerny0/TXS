import type { Message } from "@/types/chat";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";
import { Card } from "@/components/ui/card";

interface MessageCardProps {
  message: Message;
}
const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.isSender ? "justify-end" : "justify-start"} mb-4`}
    >
      {!message.isSender && (
        <UserAvatar
        isRedirect={false}
        user={message.sender}

        />
      )}
      <Card
        className={`max-w-[70%] rounded-lg p-3 ml-5 ${message.isSender ? "bg-gray-200 text-black" : "bg-gray-whie text-black"}`}
      >
        <p className="text-sm">{message.content}</p>
        <p className="mt-1 text-xs text-black">
          {message.timestamp.toLocaleString()}
        </p>
      </Card>
    </div>
  );
};

export default MessageCard;
