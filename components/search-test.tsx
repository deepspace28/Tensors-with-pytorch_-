"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Component to test the search functionality
export function SearchTest() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("formatted")

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Test the search API
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (error: any) {
      console.error("Search test error:", error)
      setError(error.message || "An error occurred during search")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search API Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        {results && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="formatted">Formatted Results</TabsTrigger>
              <TabsTrigger value="raw">Raw Response</TabsTrigger>
            </TabsList>

            <TabsContent value="formatted">
              <div className="border p-4 rounded-md bg-gray-50 dark:bg-gray-900 min-h-[200px] max-h-[500px] overflow-auto">
                <div className="prose dark:prose-invert max-w-none">
                  {results.text.split("\n").map((line: string, i: number) => (
                    <div key={i}>{line || <br />}</div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="raw">
              <div className="border p-4 rounded-md bg-gray-50 dark:bg-gray-900 min-h-[200px] max-h-[500px] overflow-auto">
                <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Source: {results?.source || "N/A"} • Query time: {results ? "< 1 second" : "N/A"}
      </CardFooter>
    </Card>
  )
}
