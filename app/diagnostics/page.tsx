"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DiagnosticsPage() {
  const [pingResult, setPingResult] = useState<any>(null)
  const [pingError, setPingError] = useState<string | null>(null)
  const [pingLoading, setPingLoading] = useState(false)

  const [groqResult, setGroqResult] = useState<any>(null)
  const [groqError, setGroqError] = useState<string | null>(null)
  const [groqLoading, setGroqLoading] = useState(false)

  const [envResult, setEnvResult] = useState<any>(null)
  const [envError, setEnvError] = useState<string | null>(null)
  const [envLoading, setEnvLoading] = useState(false)

  const testPing = async () => {
    setPingLoading(true)
    setPingError(null)
    try {
      const response = await fetch("/api/ping")
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json()
      setPingResult(data)
    } catch (error) {
      console.error("Ping error:", error)
      setPingError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setPingLoading(false)
    }
  }

  const testGroq = async () => {
    setGroqLoading(true)
    setGroqError(null)
    try {
      const response = await fetch("/api/groq-test")
      const data = await response.json()
      setGroqResult(data)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
    } catch (error) {
      console.error("Groq test error:", error)
      setGroqError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setGroqLoading(false)
    }
  }

  const testEnv = async () => {
    setEnvLoading(true)
    setEnvError(null)
    try {
      const response = await fetch("/api/env-check")
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json()
      setEnvResult(data)
    } catch (error) {
      console.error("Env check error:", error)
      setEnvError(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setEnvLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">API Diagnostics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Ping Test */}
        <Card>
          <CardHeader>
            <CardTitle>Basic API Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Tests if basic API routes are working.</p>
            <Button onClick={testPing} disabled={pingLoading}>
              {pingLoading ? "Testing..." : "Test Ping"}
            </Button>

            {pingError && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded text-sm">
                <strong>Error:</strong> {pingError}
              </div>
            )}

            {pingResult && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded text-sm">
                <div>
                  <strong>Status:</strong> {pingResult.status}
                </div>
                <div>
                  <strong>Time:</strong> {pingResult.time}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Groq Test */}
        <Card>
          <CardHeader>
            <CardTitle>Groq API Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Tests connection to the Groq API.</p>
            <Button onClick={testGroq} disabled={groqLoading}>
              {groqLoading ? "Testing..." : "Test Groq"}
            </Button>

            {groqError && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded text-sm">
                <strong>Error:</strong> {groqError}
              </div>
            )}

            {groqResult && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded text-sm overflow-auto max-h-40">
                <pre className="text-xs">{JSON.stringify(groqResult, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Env Test */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Checks environment variables.</p>
            <Button onClick={testEnv} disabled={envLoading}>
              {envLoading ? "Checking..." : "Check Environment"}
            </Button>

            {envError && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded text-sm">
                <strong>Error:</strong> {envError}
              </div>
            )}

            {envResult && (
              <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded text-sm overflow-auto max-h-40">
                <pre className="text-xs">{JSON.stringify(envResult, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Debugging Steps</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Run the <strong>Basic API Test</strong> to check if API routes are working at all.
          </li>
          <li>
            Run the <strong>Environment Check</strong> to verify environment variables are set correctly.
          </li>
          <li>
            Run the <strong>Groq API Test</strong> to check if the Groq API connection works.
          </li>
          <li>Check the browser console for any errors (press F12 to open developer tools).</li>
          <li>Check the Vercel logs in your project dashboard for server-side errors.</li>
        </ol>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Alternative Solutions</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-bold">1. Use Edge Runtime</h3>
            <p className="text-sm mt-2">
              Try using Edge Runtime for API routes, which might have different environment variable handling.
            </p>
            <pre className="bg-gray-800 p-2 rounded mt-2 text-xs">{`export const runtime = 'edge'`}</pre>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-bold">2. Use Environment Variables in Next.config.js</h3>
            <p className="text-sm mt-2">
              Expose environment variables in next.config.js to ensure they're available at build time.
            </p>
            <pre className="bg-gray-800 p-2 rounded mt-2 text-xs">
              {`// next.config.js
module.exports = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
}`}
            </pre>
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-bold">3. Use a Different API Endpoint</h3>
            <p className="text-sm mt-2">Try using a completely different API endpoint structure.</p>
            <pre className="bg-gray-800 p-2 rounded mt-2 text-xs">
              {`// pages/api/chat.js instead of app/api/chat/route.ts`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
