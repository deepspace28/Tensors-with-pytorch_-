import { BasicChat } from "@/components/basic-chat"

export default function BasicChatPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Basic Chat</h1>
      <p className="mb-6">This is a simplified chat implementation designed to work around API issues.</p>
      <BasicChat />
    </div>
  )
}
