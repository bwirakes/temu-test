import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-950">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Chatbot Tidak Ditemukan
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Maaf, chatbot yang Anda cari tidak tersedia. Silakan kembali ke halaman utama dan pilih chatbot yang tersedia.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
} 