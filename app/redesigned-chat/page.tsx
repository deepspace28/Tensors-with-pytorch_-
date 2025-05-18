import { RedesignedChat } from "@/components/redesigned-chat"

export default function RedesignedChatPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Redesigned Chat Interface</h1>
      <p className="text-center mb-6 text-gray-600">
        This chat uses a hybrid client-server approach with multiple fallback mechanisms
      </p>
      <RedesignedChat />
    </div>
  )
}
