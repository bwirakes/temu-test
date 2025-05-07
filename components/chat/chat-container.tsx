"use client"

import { useEffect, useRef, useState } from "react"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { ChatInput } from "./chat-input"
import { ChatHeader } from "./chat-header"
import { motion } from "@/components/ui/motion"
import { useChat, Message } from "ai/react"

type ChatContainerProps = {
  chatbotType: string
  systemPrompt: string
  initialMessage: string
}

export function ChatContainer({ chatbotType, systemPrompt, initialMessage }: ChatContainerProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  // Create initial message based on the provided initialMessage
  const initialAIMessage: Message = {
    id: "system-1",
    content: initialMessage,
    role: 'assistant'
  }

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    error 
  } = useChat({
    api: '/api/chat',
    initialMessages: [initialAIMessage],
    body: {
      chatbotType,
      systemPrompt
    },
    onResponse: (response) => {
      // Log the response status to help with debugging
      console.log("API Response status:", response.status);
      setDebugInfo(`Response status: ${response.status}`);
      
      if (!response.ok) {
        // Clone the response before reading its body
        response.clone().json().then(data => {
          console.error("API Error:", data);
          setErrorMessage(data.error || "Failed to get a proper response from the AI service.");
        }).catch(err => {
          console.error("Failed to parse error response:", err);
          setErrorMessage("Failed to parse error response from the server.");
        });
      }
    },
    onFinish: (message) => {
      console.log("Chat finished with message:", message);
      setDebugInfo(null);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      setErrorMessage(error.message || "Failed to communicate with the AI service. Please try again.");
    }
  });
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <ChatHeader chatbotType={chatbotType} />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pb-24 pt-20"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            isAi={message.role === 'assistant'}
            timestamp={new Date()} // We don't have timestamps from useChat, so using current date
          />
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-2 p-2">
            <TypingIndicator />
          </div>
        )}
        
        {(error || errorMessage) && (
          <div className="mx-4 my-2 rounded-lg bg-red-50 p-3 text-red-500 dark:bg-red-900/20 dark:text-red-300">
            <p>Error: {error?.message || errorMessage || "Something went wrong. Please try again."}</p>
          </div>
        )}
        
        {debugInfo && (
          <div className="mx-4 my-2 rounded-lg bg-blue-50 p-3 text-blue-500 dark:bg-blue-900/20 dark:text-blue-300">
            <p>Debug: {debugInfo}</p>
          </div>
        )}
      </motion.div>
      
      <ChatInput 
        input={input} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
}