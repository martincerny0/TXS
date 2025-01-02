// "use client"

// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Send } from 'lucide-react'

// // Mock data for conversations
// const conversations = [
//   { id: 1, name: "John Doe", avatar: "/avatars/john-doe.jpg", lastMessage: "Hey, how's it going?", timestamp: "2m ago", unread: 2 },
//   { id: 2, name: "Jane Smith", avatar: "/avatars/jane-smith.jpg", lastMessage: "Did you see the latest market trends?", timestamp: "1h ago", unread: 0 },
//   { id: 3, name: "Bob Johnson", avatar: "/avatars/bob-johnson.jpg", lastMessage: "Let's catch up soon!", timestamp: "3h ago", unread: 1 },
//   { id: 4, name: "Alice Brown", avatar: "/avatars/alice-brown.jpg", lastMessage: "Thanks for the advice!", timestamp: "1d ago", unread: 0 },
// ]

// // Mock data for messages in a conversation
// const mockMessages = [
//   { id: 1, sender: "John Doe", content: "Hey, how's it going?", timestamp: "2:30 PM" },
//   { id: 2, sender: "You", content: "Hi John! I'm doing well, thanks. How about you?", timestamp: "2:31 PM" },
//   { id: 3, sender: "John Doe", content: "I'm good too. Did you see the latest market trends?", timestamp: "2:33 PM" },
//   { id: 4, sender: "You", content: "Yes, I did. It's quite interesting. What do you think about it?", timestamp: "2:35 PM" },
//   { id: 5, sender: "John Doe", content: "I think it's a good opportunity to invest. What's your opinion?", timestamp: "2:36 PM" },
// ]

// export default function MessagesPage() {
//   const [selectedConversation, setSelectedConversation] = useState(conversations[0])
//   const [messages, setMessages] = useState(mockMessages)
//   const [newMessage, setNewMessage] = useState("")

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages([...messages, {
//         id: messages.length + 1,
//         sender: "You",
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }])
//       setNewMessage("")
//     }
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       <div className="container mx-auto p-4 flex flex-col">
//         <div className="flex flex-col md:flex-row flex-grow bg-card rounded-lg overflow-hidden shadow-lg">
//           {/* Conversations List */}
//           <div className="w-full md:w-1/3 border-r border-border">
//             <div className="p-4 border-b border-border">
//               <h2 className="text-2xl font-bold mb-4">Messages</h2>
//               <div className="relative">
//                 <Input
//                   className="pl-10"
//                   placeholder="Search conversations..."
//                 />
//               </div>
//             </div>
//             <ScrollArea className="h-[calc(100vh-10rem)]">
//               {conversations.map((conversation) => (
//                 <div
//                   key={conversation.id}
//                   className={`p-4 cursor-pointer hover:bg-accent transition-colors duration-200 ${selectedConversation.id === conversation.id ? 'bg-accent' : ''}`}
//                   onClick={() => setSelectedConversation(conversation)}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={conversation.avatar} alt={conversation.name} />
//                       <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-baseline">
//                         <p className="text-sm font-medium truncate">{conversation.name}</p>
//                         <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
//                       </div>
//                       <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
//                     </div>
//                     {conversation.unread > 0 && (
//                       <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
//                         {conversation.unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </ScrollArea>
//           </div>

//           {/* Chat Window */}
//           <div className="flex flex-col w-full md:w-2/3">
//             {/* Chat Header */}
//             <div className="p-4 border-b border-border flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
//                   <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm font-medium">{selectedConversation.name}</p>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" onClick={() => {/* Add navigation logic here */}}>
//                 View Profile
//               </Button>
//             </div>

//             {/* Messages */}
//             <ScrollArea className="flex-1 p-4">
//               {messages.map((message) => (
//                 <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-4`}>
//                   {message.sender !== "You" && (
//                     <Avatar className="mr-2">
//                       <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
//                       <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
//                     <p className="text-sm">{message.content}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
//                   </div>
//                 </div>
//               ))}
//             </ScrollArea>

//             {/* Message Input */}
//             <div className="p-4 border-t border-border">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="file"
//                   className="hidden"
//                   id="file-input"
//                   onChange={(e) => {
//                     // Handle file attachment here
//                     console.log(e.target.files);
//                   }}
//                 />
//                 <Button variant="ghost" size="icon" onClick={() => document.getElementById('file-input')?.click()}>
//                   <Send className="h-4 w-4" />
//                 </Button>
//                 <Input
//                   className="flex-grow"
//                   placeholder="Type a message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <Button onClick={handleSendMessage}>
//                   <Send className="h-4 w-4 mr-2" />
//                   Send
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
const MessagesPage = () => {
    return (
        <div>
           sss 
        </div>
    )
}
export default MessagesPage
