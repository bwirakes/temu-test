import HomeClient from "@/components/home-client"

const chatbotOptions = [
  {
    id: "biodata",
    title: "Biodata Chatbot",
    description: "Lengkapi informasi biodata pribadi Anda",
    color: "bg-blue-500",
    icon: "👤"
  },
  {
    id: "psychological",
    title: "Psychological Check",
    description: "Penilaian psikologis untuk kesesuaian karir",
    color: "bg-purple-500",
    icon: "🧠"
  },
  {
    id: "interview",
    title: "Interview Chatbot",
    description: "Simulasi wawancara untuk persiapan kerja",
    color: "bg-green-500",
    icon: "💼"
  },
  {
    id: "education",
    title: "Education + Background",
    description: "Informasi pendidikan dan latar belakang",
    color: "bg-yellow-500",
    icon: "🎓"
  },
  {
    id: "certifications",
    title: "Certifications + Organizations",
    description: "Sertifikasi dan pengalaman organisasi",
    color: "bg-red-500",
    icon: "📜"
  },
  {
    id: "motivations",
    title: "Other Motivations",
    description: "Eksplorasi motivasi dan tujuan karir",
    color: "bg-indigo-500",
    icon: "🚀"
  }
]

export default function Home() {
  return <HomeClient chatbotOptions={chatbotOptions} />
}