"use client";

import { useEffect, useState } from "react";
import { io} from "socket.io-client";
import type { Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000", {
  transports: ["websocket"], // Use WebSocket explicitly
  reconnectionAttempts: 5, // Retry up to 5 times
});

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]); // Store chat messages
  const [input, setInput] = useState<string>(""); // For input message

  useEffect(() => {
    console.log("Attempting to connect to the server...");

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
      setIsConnected(false);
    });

    socket.on("message", (message: string) => {
      console.log("Message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("connect_error");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    socket.emit("message", input); // Send message to server
    setInput(""); // Clear input
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Chat Page</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg mt-4">
        <div
          className="overflow-y-auto h-64 bg-gray-700 p-2 rounded-lg"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              {message}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-grow px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
