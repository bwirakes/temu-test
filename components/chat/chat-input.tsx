"use client"

import { Send } from "@/components/ui/icons"
import { motion } from "@/components/ui/motion"
import { useState } from "react"

type ChatInputProps = {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading = false }: ChatInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading || isSubmitting) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await handleSubmit(e);
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard shortcut for submitting (Enter key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isLoading && !isSubmitting) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 z-10 w-full border-t bg-white p-3 dark:bg-gray-900"
    >
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          disabled={isLoading || isSubmitting}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || isSubmitting}
          className="rounded-full bg-blue-500 p-2.5 text-white disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </motion.div>
  )
}