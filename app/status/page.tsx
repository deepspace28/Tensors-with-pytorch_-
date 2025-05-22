"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function StatusPage() {
  const [apiKeyAvailable, setApiKeyAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const checkApiKey = () => {
    setLoading(true)

    // Check if the NEXT_PUBLIC_GROQ_API_KEY is available
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY

    // Set a timeout to simulate checking
    setTimeout(() => {
      setApiKeyAvailable(!!apiKey && apiKey.length > 0)
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    checkApiKey()
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">System Status</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Groq API Key Status</span>
              {apiKeyAvailable === null ? (
                <span className="text-gray-500">Checking...</span>
              ) : apiKeyAvailable ? (
                <span className="text-green-500 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-1" /> Available
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-1" /> Not Available
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {apiKeyAvailable
                ? "The Groq API key is properly configured and available for client-side use."
                : "The Groq API key is not available. Please make sure NEXT_PUBLIC_GROQ_API_KEY is set in your environment variables."}
            </p>
            <Button onClick={checkApiKey} disabled={loading}>
              {loading ? "Checking..." : "Check Again"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
