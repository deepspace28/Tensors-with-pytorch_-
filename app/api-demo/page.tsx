import { ClientApiDemo } from "@/components/client-api-demo"

export default function ApiDemoPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">API Access Demo</h1>
      <ClientApiDemo />
    </div>
  )
}
