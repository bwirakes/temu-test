"use client"

import { motion } from "@/components/ui/motion"

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="h-2 w-2 rounded-full bg-blue-500"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.2,
        }}
        className="h-2 w-2 rounded-full bg-blue-500"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.4,
        }}
        className="h-2 w-2 rounded-full bg-blue-500"
      />
    </div>
  )
}