import { HybridChat } from "@/components/hybrid-chat"

export default function HybridChatPage() {
  return (
    <div className="container mx-auto py-8 h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-center">Synaptiq Hybrid Chat</h1>
      <div className="flex-1">
        <HybridChat />
      </div>
    </div>
  )
}
