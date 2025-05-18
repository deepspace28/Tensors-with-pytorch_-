"use client"

import { useState, useEffect } from "react"

export default function ApiTestPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [directGroqResult, setDirectGroqResult] = useState<any>(null)
  const [directGroqLoading, setDirectGroqLoading] = useState(false)

  const runTest = async (endpoint: string) => {
    setLoading((prev) => ({ ...prev, [endpoint]: true }))

    try {
      const response = await fetch(`/api/${endpoint}`)
      const data = await response.json()

      setResults((prev) => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          ok: response.ok,
          data,
        },
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [endpoint]: {
          error: error.message,
        },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint]: false }))
    }
  }

  const testDirectGroq = async () => {
    setDirectGroqLoading(true)

    try {
      const response = await fetch("/api/direct-groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello, are you working?" }],
        }),
      })

      const data = await response.json()
      setDirectGroqResult({
        status: response.status,
        ok: response.ok,
        data,
      })
    } catch (error) {
      setDirectGroqResult({
        error: error.message,
      })
    } finally {
      setDirectGroqLoading(false)
    }
  }

  useEffect(() => {
    // Run tests on page load
    runTest("test")
    runTest("health-check")
    runTest("env-debug")
    runTest("diagnose")
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Diagnostics</h1>

      <div className="grid gap-6">
        {["test", "health-check", "env-debug", "diagnose"].map((endpoint) => (
          <div key={endpoint} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">/api/{endpoint}</h2>
              <button
                onClick={() => runTest(endpoint)}
                disabled={loading[endpoint]}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading[endpoint] ? "Testing..." : "Run Test"}
              </button>
            </div>

            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
              {results[endpoint] ? JSON.stringify(results[endpoint], null, 2) : "No results yet"}
            </pre>
          </div>
        ))}

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Direct Groq API Test</h2>
            <button
              onClick={testDirectGroq}
              disabled={directGroqLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {directGroqLoading ? "Testing..." : "Test Groq API"}
            </button>
          </div>

          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {directGroqResult ? JSON.stringify(directGroqResult, null, 2) : "No results yet"}
          </pre>
        </div>
      </div>
    </div>
  )
}
