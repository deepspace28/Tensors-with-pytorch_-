"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicOutput } from "./dynamic-output"

interface DynamicSimulatorProps {
  prompt: string
  simulationType?: string
}

export function DynamicSimulator({ prompt, simulationType = "unified" }: DynamicSimulatorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [simulationData, setSimulationData] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function runSimulation() {
      if (!prompt) return

      console.log(`Running simulation with prompt: "${prompt}"`)
      setIsProcessing(true)
      setError(null)

      try {
        // Call the API to get simulation data
        const response = await fetch("/api/simulate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            type: simulationType,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("Received simulation data:", data)

        if (data.simulationData) {
          setSimulationData(data.simulationData)
        } else {
          // Fallback if the API doesn't return the expected structure
          setSimulationData({
            title: "Simulation Results",
            explanation: "Results based on your simulation prompt.",
            chartType: "line",
            equations: [],
          })
        }

        if (data.results) {
          setResults(data.results)
        } else {
          // Fallback if no results are returned
          setResults({
            x: Array.from({ length: 100 }, (_, i) => i / 10),
            y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10)),
          })
        }
      } catch (err) {
        console.error("Error running simulation:", err)
        setError(`Failed to run simulation: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setIsProcessing(false)
      }
    }

    runSimulation()
  }, [prompt, simulationType])

  if (error) {
    return (
      <Card className="bg-[#0a0a0a] border-gray-900">
        <CardContent className="p-6">
          <div className="text-red-400 p-4 rounded-md bg-[#1a0a0a] border border-red-900">
            <p className="font-medium mb-2">Error</p>
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#0a0a0a] border-gray-900">
      <CardContent className="p-0">
        <DynamicOutput isProcessing={isProcessing} simulationData={simulationData} results={results} />
      </CardContent>
    </Card>
  )
}
