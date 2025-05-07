"use client"

import Link from "next/link"
import { ArrowRight } from "@/components/ui/icons"
import { motion } from "@/components/ui/motion"

type ChatbotOption = {
  id: string
  title: string
  description: string
  color: string
  icon: string
}

type HomeClientProps = {
  chatbotOptions: ChatbotOption[]
}

export default function HomeClient({ chatbotOptions }: HomeClientProps) {
  return (
    <main className="min-h-screen w-full bg-gray-50 p-4 dark:bg-gray-950 md:p-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            TEMU Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Pilih jenis chatbot yang sesuai dengan kebutuhan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chatbotOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/chat/${option.id}`}>
                <div className={`flex h-full cursor-pointer flex-col rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900`}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${option.color} text-2xl text-white`}>
                    {option.icon}
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {option.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-300">
                    {option.description}
                  </p>
                  <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    Mulai <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
} 