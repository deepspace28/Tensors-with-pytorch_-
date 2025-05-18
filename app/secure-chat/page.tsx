import SecureChat from "@/components/secure-chat"

export default function SecureChatPage() {
  return (
    <div className="container mx-auto py-8 h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Secure Chat</h1>
      <SecureChat />
    </div>
  )
}
