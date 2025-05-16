"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download, Loader2 } from "lucide-react"

interface Parameter {
  name: string
  label: string
  default: number
  min: number
  max: number
  unit: string
}

interface SimulationData {
  title: string
  equations: string[]
  parameters: Parameter[]
  chartType: "line" | "scatter" | "3D"
  explanation: string
  formula?: string
  dataset?: any[]
}

interface DynamicSimulatorProps {
  simulation?: SimulationData | null
  isLoading?: boolean
}

export function DynamicSimulator({ simulation, isLoading = false }: DynamicSimulatorProps) {
  const [parameters, setParameters] = useState<Record<string, number>>({})
  const [chartData, setChartData] = useState<any>(null)

  // Initialize parameters with default values
  useEffect(() => {
    if (simulation?.parameters) {
      const initialParams: Record<string, number> = {}
      simulation.parameters.forEach((param) => {
        initialParams[param.name] = param.default
      })
      setParameters(initialParams)
    }
  }, [simulation])

  // Update chart data when parameters change
  useEffect(() => {
    if (!simulation || Object.keys(parameters).length === 0) return

    // This is a simplified example - in a real implementation,
    // you would use the formula or dataset from the simulation
    // to generate the chart data based on the parameters
    const newChartData = generateChartData(simulation, parameters)
    setChartData(newChartData)
  }, [parameters, simulation])

  const handleParameterChange = (name: string, value: number[]) => {
    setParameters((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Simulation...</CardTitle>
          <CardDescription>Please wait while we generate your simulation</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!simulation) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Simulation Data</CardTitle>
          <CardDescription>Please try a different prompt or refresh the page</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn't generate a simulation for your request. Please try a more specific scientific prompt.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{simulation.title}</CardTitle>
        <CardDescription>Interactive scientific simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Parameters</h3>
              {simulation.parameters && simulation.parameters.length > 0 ? (
                simulation.parameters.map((param) => (
                  <div key={param.name} className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor={param.name}>{param.label}</Label>
                      <span className="text-sm text-muted-foreground">
                        {parameters[param.name] || param.default} {param.unit}
                      </span>
                    </div>
                    <Slider
                      id={param.name}
                      min={param.min}
                      max={param.max}
                      step={(param.max - param.min) / 100}
                      value={[parameters[param.name] || param.default]}
                      onValueChange={(value) => handleParameterChange(param.name, value)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No parameters available for this simulation.</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Governing Equations</h3>
              <div className="p-4 bg-black/10 dark:bg-white/5 rounded-md overflow-x-auto">
                {simulation.equations && simulation.equations.length > 0 ? (
                  simulation.equations.map((eq, index) => (
                    <div key={index} className="my-2 text-center katex-display">
                      {/* Render LaTeX equation here - in a real implementation, use KaTeX or MathJax */}
                      <div dangerouslySetInnerHTML={{ __html: `$$${eq}$$` }} />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No equations available for this simulation.</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Explanation</h3>
              <p className="text-sm text-muted-foreground">{simulation.explanation || "No explanation available."}</p>
            </div>

            <div>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Report (Demo)
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Note: PDF generation is available in the full lab experience.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Visualization</h3>
            <div className="aspect-square w-full bg-black/10 dark:bg-white/5 rounded-md flex items-center justify-center">
              {chartData ? (
                <div className="w-full h-full">
                  {/* In a real implementation, render Chart.js or Three.js visualization here */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      [Visualization would render here based on chart type: {simulation.chartType}]
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">Loading visualization...</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to generate chart data based on parameters
function generateChartData(simulation: SimulationData, parameters: Record<string, number>) {
  // This is a placeholder - in a real implementation, you would use the
  // formula or dataset from the simulation to generate the chart data
  return {
    type: simulation.chartType,
    data: {
      labels: ["Sample Data"],
      datasets: [
        {
          label: "Sample Dataset",
          data: [parameters[Object.keys(parameters)[0]] || 0],
        },
      ],
    },
  }
}
