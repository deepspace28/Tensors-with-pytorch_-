"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { callSimulationAPI } from "@/lib/api-client"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const simulationTypes = [
  { value: "physics", label: "Physics" },
  { value: "quantum", label: "Quantum Physics" },
  { value: "math", label: "Mathematics" },
  { value: "blackhole", label: "Black Hole Physics" },
  { value: "general", label: "General Science" },
  { value: "ai", label: "AI & Machine Learning" },
]

export function SimulationRequest() {
  const [prompt, setPrompt] = useState("")
  const [type, setType] = useState("physics")
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Call our simulation API
      const response = await callSimulationAPI(type, prompt)
      setResult(response.result || JSON.stringify(response, null, 2))
    } catch (error) {
      console.error("Error running simulation:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Scientific Simulation Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Simulation Type
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select simulation type" />
              </SelectTrigger>
              <SelectContent>
                {simulationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Simulation Prompt
            </label>
            <Textarea
              id="prompt"
              placeholder="Describe the scientific scenario you want to simulate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button type="submit" disabled={isLoading || !prompt.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Simulation...
              </>
            ) : (
              "Run Simulation"
            )}
          </Button>
        </form>

        {error && <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded">{error}</div>}

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Simulation Results</h3>
            <div className="p-4 bg-black/5 rounded-lg overflow-auto max-h-[500px]">
              <MarkdownRenderer content={result} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
