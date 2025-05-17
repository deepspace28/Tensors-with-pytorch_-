"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DynamicOutput } from "./dynamic-output"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"

interface DynamicSimulatorProps {
  prompt: string
  simulationType?: string
}

export function DynamicSimulator({ prompt, simulationType = "unified" }: DynamicSimulatorProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [simulationData, setSimulationData] = useState<any>(null)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [steps, setSteps] = useState<string[]>([])

  useEffect(() => {
    async function runSimulation() {
      if (!prompt) return

      console.log(`Running simulation with prompt: "${prompt}"`)
      setIsProcessing(true)
      setError(null)
      setSteps([])

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
            parameters: {},
            code: "", // Add the required 'code' field
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("Received simulation data:", data)

        // Handle simulation data
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

        // Handle results
        if (data.results) {
          setResults(data.results)
        } else {
          // Fallback if no results are returned
          setResults({
            x: Array.from({ length: 100 }, (_, i) => i / 10),
            y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10)),
          })
        }

        // Handle step-by-step math solutions if available
        if (data.steps && Array.isArray(data.steps)) {
          setSteps(data.steps)
        }

        // Handle any errors from the backend
        if (data.error) {
          setError(`Backend error: ${data.error}`)
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

  const retrySimulation = () => {
    // Reset states
    setError(null)
    setSimulationData(null)
    setResults(null)
    setSteps([])

    // Re-run the simulation
    if (prompt) {
      setIsProcessing(true)
      fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          type: simulationType,
          parameters: {},
          code: "", // Add the required 'code' field
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          setSimulationData(
            data.simulationData || {
              title: "Simulation Results",
              explanation: "Results based on your simulation prompt.",
              chartType: "line",
              equations: [],
            },
          )
          setResults(
            data.results || {
              x: Array.from({ length: 100 }, (_, i) => i / 10),
              y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10)),
            },
          )
          if (data.steps && Array.isArray(data.steps)) {
            setSteps(data.steps)
          }
        })
        .catch((err) => {
          console.error("Error retrying simulation:", err)
          setError(`Failed to run simulation: ${err.message}`)
        })
        .finally(() => {
          setIsProcessing(false)
        })
    }
  }

  if (error) {
    return (
      <Card className="bg-[#0a0a0a] border-gray-900">
        <CardContent className="p-6">
          <div className="text-red-400 p-4 rounded-md bg-[#1a0a0a] border border-red-900 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
              <div>
                <p className="font-medium mb-2">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
          <Button
            onClick={retrySimulation}
            variant="outline"
            className="bg-[#1a1a1a] hover:bg-[#252525] text-gray-300 border-gray-800"
          >
            Retry Simulation
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isProcessing) {
    return (
      <Card className="bg-[#0a0a0a] border-gray-900">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <p className="mt-4 text-gray-400">Processing simulation...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#0a0a0a] border-gray-900">
      <CardContent className="p-0">
        <DynamicOutput simulationData={simulationData} results={results} steps={steps} />
      </CardContent>
    </Card>
  )
}
