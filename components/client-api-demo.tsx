"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send } from "lucide-react"

export function ClientApiDemo() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!query.trim()) return

    setLoading(true)
    setResponse("")

    try {
      const res = await fetch("/api/ai-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data.response || "No response received")
    } catch (error) {
      console.error("Error:", error)
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>API Access Demo</CardTitle>
        <CardDescription>Test the Synaptiq API with your queries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="secure" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="secure">Secure API Access</TabsTrigger>
          </TabsList>
          <TabsContent value="secure" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Your Query</h3>
              <Textarea
                placeholder="Enter your scientific query here..."
                className="min-h-[120px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit} disabled={loading || !query.trim()} className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Query
            </Button>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Response</h3>
              <div className="rounded-md bg-muted p-4 min-h-[200px] whitespace-pre-wrap">
                {loading ? "Processing..." : response || "Response will appear here"}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
