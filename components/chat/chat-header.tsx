"use client"

import { ArrowLeft, Info } from "@/components/ui/icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "@/components/ui/motion"
import Link from "next/link"

// Map chatbot types to their display titles and icons
const chatbotInfo: Record<string, { title: string; icon: string; color: string }> = {
  biodata: { 
    title: "Biodata Chatbot", 
    icon: "👤", 
    color: "bg-blue-500" 
  },
  psychological: { 
    title: "Psychological Check", 
    icon: "🧠", 
    color: "bg-purple-500" 
  },
  interview: { 
    title: "Interview Chatbot", 
    icon: "💼", 
    color: "bg-green-500" 
  },
  education: { 
    title: "Education + Background", 
    icon: "🎓", 
    color: "bg-yellow-500" 
  },
  certifications: { 
    title: "Certifications + Organizations", 
    icon: "📜", 
    color: "bg-red-500" 
  },
  motivations: { 
    title: "Other Motivations", 
    icon: "🚀", 
    color: "bg-indigo-500" 
  }
}

type ChatHeaderProps = {
  chatbotType: string
}

export function ChatHeader({ chatbotType }: ChatHeaderProps) {
  const { title, icon, color } = chatbotInfo[chatbotType] || { 
    title: "Temu", 
    icon: "🤖", 
    color: "bg-blue-500" 
  }

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 z-10 flex w-full items-center justify-between border-b bg-white p-4 dark:bg-gray-900"
    >
      <div className="flex items-center gap-3">
        <Link href="/">
          <button className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className={`h-9 w-9 flex items-center justify-center ${color}`}>
            <AvatarFallback className="text-white">{icon}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-medium">{title}</h1>
            <p className="text-xs text-gray-500">Rekruiter TEMU</p>
          </div>
        </div>
      </div>
      <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
        <Info className="h-5 w-5" />
      </button>
    </motion.div>
  )
}