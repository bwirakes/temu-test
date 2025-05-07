"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User } from "@/components/ui/icons"
import { motion } from "@/components/ui/motion"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import type { Components } from "react-markdown"

type MessageProps = {
  content: string
  isAi: boolean
  timestamp: Date
}

export function MessageBubble({ content, isAi, timestamp }: MessageProps) {
  // Define custom components for markdown rendering
  const markdownComponents: Components = {
    a: (props) => (
      <a 
        {...props} 
        className="text-blue-200 hover:text-blue-100 underline"
        target="_blank" 
        rel="noopener noreferrer"
      />
    ),
    pre: (props) => (
      <pre 
        {...props} 
        className="bg-gray-800 text-gray-100 p-2 rounded my-2 overflow-x-auto"
      />
    ),
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = !match && props.inline
      
      return isInline ? (
        <code {...props} className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded text-xs">
          {children}
        </code>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full items-start gap-2 p-2",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      {isAi && (
        <Avatar className="h-8 w-8 bg-blue-100">
          <AvatarFallback className="bg-blue-500 text-white">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn("flex max-w-[75%] flex-col", 
        isAi ? "items-start" : "items-end"
      )}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            isAi 
              ? "bg-blue-500 text-white markdown-content" 
              : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white markdown-content"
          )}
        >
          <div className="text-sm prose dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeRaw]} 
              components={markdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        <span className="mt-1 text-xs text-gray-500">
          {format(timestamp, "h:mm a")}
        </span>
      </div>
      
      {!isAi && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gray-300">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  )
}