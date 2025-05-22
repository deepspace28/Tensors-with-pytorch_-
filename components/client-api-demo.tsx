"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ApiClient } from "@/lib/api-client"
import { clientEnv } from "@/lib/env"
import { AlertCircle, CheckCircle } from "lucide-react"

export function ClientApiDemo() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKeyAvailable, setApiKeyAvailable] = useState(!!clientEnv.GROQ_API_KEY)

  const handleDirectApiCall = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)

    try {
      const result = await ApiClient.directGroqRequest([
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: input },
      ])

      setResponse(result.choices[0]?.message?.content || "No response received")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setResponse("")
    } finally {
      setLoading(false)
    }
  }

  const handleServerApiCall = async () => {
    if (!input.trim()) return

    setLoading(true)
    setError(null)

    try {
      const result = await ApiClient.sendChatMessage([{ role: "user", content: input }])

      setResponse(result.text || "No response received")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setResponse("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>API Access Demo</CardTitle>
        <CardDescription>Test both client-side direct API access and server-side API access</CardDescription>
        <div className="flex items-center mt-2">
          <div className="flex items-center text-sm">
            <span className="mr-2">Client API Key:</span>
            {apiKeyAvailable ? (
              <span className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                Available
              </span>
            ) : (
              <span className="flex items-center text-red-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                Not configured
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Enter your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">Error: {error}</div>}

        {response && (
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Response:</h3>
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleServerApiCall} disabled={loading}>
          {loading ? "Loading..." : "Send via Server API"}
        </Button>

        <Button onClick={handleDirectApiCall} disabled={loading || !apiKeyAvailable} variant="outline">
          {loading ? "Loading..." : "Send Direct to Groq API"}
        </Button>
      </CardFooter>
    </Card>
  )
}
