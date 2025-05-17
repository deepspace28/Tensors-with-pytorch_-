"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScientificResult } from "@/components/scientific-result"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, FileText, Download } from "lucide-react"

export default function ChatPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [paperTitle, setPaperTitle] = useState("Scientific Research Assistant")
  const [response, setResponse] = useState<any>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    try {
      setIsLoading(true)
      setError(null)

      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!apiResponse.ok) {
        throw new Error(`API request failed with status ${apiResponse.status}`)
      }

      const data = await apiResponse.json()
      setResult(data.result)
      setResponse(data) // Store the full response for debugging

      // Generate a title based on the query
      setPaperTitle(generatePaperTitle(query))
    } catch (err) {
      console.error("Error processing query:", err)
      setError("Failed to process your query. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  function generatePaperTitle(query: string): string {
    // Convert the query into a research paper title
    const cleanQuery = query.trim()
    if (!cleanQuery) return "Scientific Research Assistant"

    // Capitalize first letter of each word
    const words = cleanQuery.split(" ")
    const capitalizedWords = words.map((word) =>
      word.length > 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )

    // If query is a question, convert to statement
    let title = capitalizedWords.join(" ")
    if (title.endsWith("?")) {
      title = title.slice(0, -1)
      if (title.toLowerCase().startsWith("what is")) {
        title = title.slice(8) + ": An Analysis"
      } else if (title.toLowerCase().startsWith("how does")) {
        title = title.slice(9) + ": Mechanisms and Processes"
      } else if (title.toLowerCase().startsWith("why")) {
        title = title.slice(4) + ": Causal Factors and Implications"
      } else {
        title += ": A Comprehensive Investigation"
      }
    } else {
      title += ": A Scientific Analysis"
    }

    return title
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-gray-50">
        <section className="container py-8 md:py-12">
          <div className="mx-auto max-w-4xl">
            <Card className="mb-8 bg-white shadow-sm">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="query" className="text-sm font-medium text-gray-700">
                      Research Query
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="query"
                        placeholder="Enter your scientific query..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                        <Search className="h-4 w-4 mr-2" />
                        Research
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Ask complex scientific questions to generate research-paper style responses
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="bg-white p-8 shadow-sm rounded-lg">
                <div className="mb-6">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <div className="py-2">
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-8 shadow-sm rounded-lg border border-red-200">
                <h2 className="text-xl font-bold text-red-700 mb-4">Error Processing Query</h2>
                <p className="text-red-600">{error}</p>
                <Button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  variant="outline"
                  className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
                >
                  Retry
                </Button>
              </div>
            ) : result ? (
              <div className="bg-white p-8 shadow-sm rounded-lg">
                <div className="mb-8 border-b pb-6">
                  <h1 className="text-2xl font-bold mb-2">{paperTitle}</h1>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Synaptiq Research •{" "}
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Debug output */}
                {response && (
                  <pre className="text-red-400 text-xs bg-black p-4 mb-4 overflow-auto max-h-96">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}

                <ScientificResult content={result} />
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
