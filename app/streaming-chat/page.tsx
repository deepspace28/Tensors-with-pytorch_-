import { StreamingChat } from "@/components/streaming-chat"

export default function StreamingChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Synaptiq Streaming Chat</h1>
      <StreamingChat />
    </div>
  )
}
