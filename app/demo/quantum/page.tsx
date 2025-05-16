"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScientificResult } from "@/components/scientific-result"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuantumDemoPage({ searchParams }: { searchParams: { prompt?: string } }) {
  const [prompt, setPrompt] = useState(searchParams.prompt || "Simulate quantum entanglement between two qubits")
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    summary?: string
    equations?: string[]
    insight?: string
    chart?: { title?: string; labels: string[]; values: number[] }
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rawResponse, setRawResponse] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.prompt) {
      setPrompt(searchParams.prompt)
      setSubmittedPrompt(searchParams.prompt)
    }
  }, [searchParams.prompt])

  useEffect(() => {
    if (submittedPrompt) {
      runQuantumSimulation(submittedPrompt)
    }
  }, [submittedPrompt])

  async function runQuantumSimulation(simulationPrompt: string) {
    try {
      setIsLoading(true)
      setError(null)
      setResult(null)
      setRawResponse(null)

      console.log("Running quantum simulation with prompt:", simulationPrompt)

      // Use our internal API instead of directly calling the external API
      // This allows us to handle errors more gracefully
      const response = await fetch("/api/simulations/quantum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: simulationPrompt,
        }),
      })

      // Check the content type to see if it's JSON
      const contentType = response.headers.get("content-type")
      if (contentType && !contentType.includes("application/json")) {
        // If it's not JSON, get the text and display it for debugging
        const text = await response.text()
        setRawResponse(text.substring(0, 1000)) // Limit to first 1000 chars
        throw new Error(`Received non-JSON response: ${contentType}`)
      }

      // Try to parse the response as JSON
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        // If we can't parse it as JSON, try to get the text
        try {
          const text = await response.text()
          setRawResponse(text.substring(0, 1000)) // Limit to first 1000 chars
        } catch (textError) {
          console.error("Failed to get response text:", textError)
        }
        throw new Error(
          `Failed to parse response as JSON: ${parseError instanceof Error ? parseError.message : "Unknown error"}`,
        )
      }

      console.log("API response:", data)

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${data.error || "Unknown error"}`)
      }

      // Handle the case where data contains a fallback due to API error
      if (data.fallback) {
        setError(`Using fallback data: ${data.error || "API error"}`)
        setResult(data.fallback)
        return
      }

      // Extract the relevant data from the response
      // Handle different response formats
      const resultData = data.data || data

      // Create a properly structured result object
      setResult({
        summary: resultData.summary || "Quantum simulation completed successfully.",
        equations: Array.isArray(resultData.equations) ? resultData.equations : [],
        insight: resultData.insight || resultData.explanation || "",
        chart: resultData.chart || {
          title: "Measurement Probabilities",
          labels: resultData.labels || ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
          values: resultData.values || [0.5, 0, 0, 0.5],
        },
      })
    } catch (err) {
      console.error("Error fetching quantum simulation:", err)
      setError(`Failed to load quantum simulation: ${err instanceof Error ? err.message : "Unknown error"}`)

      // Set fallback result for demo purposes
      setResult({
        summary: "Fallback quantum simulation result (error occurred in actual simulation).",
        equations: ["\\ket{\\psi} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})"],
        insight:
          "This is a fallback result showing what quantum entanglement would look like. The actual simulation encountered an error.",
        chart: {
          labels: ["|00⟩", "|01⟩", "|10⟩", "|11⟩"],
          values: [0.5, 0, 0, 0.5],
          title: "Fallback Measurement Probabilities",
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      setSubmittedPrompt(prompt)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#282a36]">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] text-white">
              Quantum Physics Simulation
            </h1>
            <p className="max-w-[85%] leading-normal text-[#8be9fd] sm:text-lg sm:leading-7 md:text-xl">
              Experience how Synaptiq simulates quantum systems using Qiskit and advanced AI models.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <Card className="mb-8 bg-[#44475a] border-[#6272a4] text-white">
              <CardHeader>
                <CardTitle>Quantum Simulation Parameters</CardTitle>
                <CardDescription className="text-[#f8f8f2] opacity-80">
                  Customize your quantum simulation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="simulation-prompt" className="text-sm font-medium text-[#f8f8f2] block mb-2">
                      Simulation Prompt
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="simulation-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="flex-1 bg-[#282a36] border-[#6272a4] text-white"
                        placeholder="Enter your quantum simulation prompt"
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#ff79c6] hover:bg-[#ff92d0] text-[#282a36]"
                      >
                        Run
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Raw response output for debugging */}
            {rawResponse && (
              <Card className="mb-4 border border-yellow-500 bg-yellow-900/20 text-white">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Debug: Raw Response</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-xs overflow-auto max-h-40 whitespace-pre-wrap">{rawResponse}</div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="mb-4 border border-red-800 bg-red-900/20 text-white">
                <CardHeader className="py-2">
                  <CardTitle className="text-sm">Error</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-red-400">{error}</p>
                </CardContent>
              </Card>
            )}

            {isLoading ? (
              <Card className="border border-[#6272a4] bg-[#44475a] text-white">
                <CardHeader>
                  <CardTitle>Running Quantum Simulation</CardTitle>
                  <CardDescription className="text-[#f8f8f2] opacity-80">This may take a moment...</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-3/4 bg-[#282a36]" />
                  <Skeleton className="h-4 w-full bg-[#282a36]" />
                  <Skeleton className="h-4 w-5/6 bg-[#282a36]" />
                  <div className="py-2">
                    <Skeleton className="h-64 w-full bg-[#282a36]" />
                  </div>
                  <Skeleton className="h-4 w-2/3 bg-[#282a36]" />
                  <Skeleton className="h-4 w-1/2 bg-[#282a36]" />
                </CardContent>
              </Card>
            ) : result ? (
              <ScientificResult
                summary={result.summary}
                equations={result.equations}
                insight={result.insight}
                chart={result.chart}
              />
            ) : submittedPrompt ? (
              <Card className="border border-[#6272a4] bg-[#44475a] text-white">
                <CardHeader>
                  <CardTitle>No Results</CardTitle>
                  <CardDescription className="text-[#f8f8f2] opacity-80">
                    No valid scientific output to display.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Try a different prompt or check the API connection.</p>
                </CardContent>
              </Card>
            ) : null}

            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="border-[#6272a4] text-[#f8f8f2] hover:bg-[#44475a]">
                <Link href="/demo">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Demos
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
