import { ClientChatInterface } from "@/components/client-chat-interface"
import { SimulationRequest } from "@/components/simulation-request"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientApiDemoPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Client API Demo</h1>

      <Tabs defaultValue="chat" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Scientific Chat</TabsTrigger>
          <TabsTrigger value="simulation">Simulation Request</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <ClientChatInterface />
        </TabsContent>
        <TabsContent value="simulation">
          <SimulationRequest />
        </TabsContent>
      </Tabs>
    </div>
  )
}
