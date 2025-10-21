"use client";

import { useChatAgent } from "@/hooks/useChatAgent";
import ChatBubble from "./ChatBubble";
import ChatInterface from "./ChatInterface";

export default function ChatAgent() {
  const {
    isOpen,
    isMinimized,
    messages,
    isTyping,
    unreadCount,
    toggleChat,
    minimizeChat,
    sendMessage,
    clearMessages
  } = useChatAgent();

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onToggle={toggleChat}
        onMinimize={minimizeChat}
        unreadCount={unreadCount}
      />
      
      <ChatInterface
        isOpen={isOpen}
        onClose={toggleChat}
        messages={messages}
        onSendMessage={sendMessage}
        isTyping={isTyping}
      />
    </>
  );
}
