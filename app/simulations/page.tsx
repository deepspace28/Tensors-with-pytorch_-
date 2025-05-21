"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { generateSimulation } from "@/lib/scientific-engine"
import { Loader2, Play, Settings, ChevronRight, Download, Code, LineChart } from "lucide-react"
import { MathJax, MathJaxContext } from "better-react-mathjax"

// Define the simulation parameter type
interface SimulationParameter {
  name: string
  label: string
  default: number
  min: number
  max: number
  unit: string
}

// Define the simulation data type
interface SimulationData {
  title: string
  equations: string[]
  parameters: SimulationParameter[]
  chartType: string
  explanation: string
  data?: any
}

export default function SimulationsPage() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [simulation, setSimulation] = useState<SimulationData | null>(null)
  const [paramValues, setParamValues] = useState<Record<string, number>>({})
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("input")
  const [isRunning, setIsRunning] = useState(false)

  // Reset parameters when simulation changes
  useEffect(() => {
    if (simulation?.parameters) {
      const initialParams: Record<string, number> = {}
      simulation.parameters.forEach((param) => {
        initialParams[param.name] = param.default
      })
      setParamValues(initialParams)
    }
  }, [simulation])

  // Handle prompt submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)
    setSimulation(null)
    setSimulationResults(null)

    try {
      console.log("Generating simulation for prompt:", prompt)
      const result = await generateSimulation(prompt)
      console.log("Simulation generated:", result)
      setSimulation(result)
      setActiveTab("parameters")
    } catch (err) {
      console.error("Error generating simulation:", err)
      setError("Failed to generate simulation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle parameter change
  const handleParamChange = (name: string, value: number) => {
    setParamValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Run the simulation with current parameters
  const runSimulation = () => {
    setIsRunning(true)

    // Generate data points based on the simulation type and parameters
    try {
      let results

      if (simulation?.chartType === "line") {
        results = generateLineChartData(simulation, paramValues)
      } else if (simulation?.chartType === "scatter") {
        results = generateScatterChartData(simulation, paramValues)
      } else if (simulation?.chartType === "bar") {
        results = generateBarChartData(simulation, paramValues)
      } else if (simulation?.chartType === "3D") {
        results = generate3DChartData(simulation, paramValues)
      } else {
        results = generateDefaultData(simulation, paramValues)
      }

      setSimulationResults(results)
      setActiveTab("results")
    } catch (err) {
      console.error("Error running simulation:", err)
      setError("Failed to run simulation with the provided parameters.")
    } finally {
      setIsRunning(false)
    }
  }

  // Generate line chart data
  const generateLineChartData = (sim: SimulationData, params: Record<string, number>) => {
    // Example: Simple pendulum simulation
    if (sim.title.toLowerCase().includes("pendulum")) {
      const length = params.length || 1
      const gravity = params.gravity || 9.8
      const initialAngle = (params.initialAngle || 30) * (Math.PI / 180) // Convert to radians

      const omega = Math.sqrt(gravity / length)
      const period = (2 * Math.PI) / omega

      const dataPoints = 100
      const timeRange = period * 3 // Show 3 periods

      const data = {
        labels: Array.from({ length: dataPoints }, (_, i) => ((i * timeRange) / dataPoints).toFixed(2)),
        datasets: [
          {
            label: "Position",
            data: Array.from({ length: dataPoints }, (_, i) => {
              const t = (i * timeRange) / dataPoints
              return initialAngle * Math.cos(omega * t)
            }),
          },
        ],
        xLabel: "Time (s)",
        yLabel: "Angle (rad)",
      }

      return {
        chartData: data,
        insights: [
          `Period: ${period.toFixed(2)} seconds`,
          `Frequency: ${(1 / period).toFixed(2)} Hz`,
          `Maximum angle: ${initialAngle.toFixed(2)} radians`,
        ],
      }
    }

    // Example: Wave function simulation
    if (sim.title.toLowerCase().includes("wave")) {
      const potential = params.potential || 10
      const width = params.width || 1

      const dataPoints = 100
      const xRange = width * 3

      const data = {
        labels: Array.from({ length: dataPoints }, (_, i) => ((i * xRange) / dataPoints - xRange / 2).toFixed(2)),
        datasets: [
          {
            label: "Wave Function",
            data: Array.from({ length: dataPoints }, (_, i) => {
              const x = (i * xRange) / dataPoints - xRange / 2
              // Simple gaussian wave packet
              return Math.exp(-(x * x) / (width * 0.5)) * Math.cos((2 * Math.PI * x) / (width * 0.2))
            }),
          },
          {
            label: "Potential",
            data: Array.from({ length: dataPoints }, (_, i) => {
              const x = (i * xRange) / dataPoints - xRange / 2
              // Simple potential well
              return Math.abs(x) > width / 2 ? potential / 10 : 0
            }),
          },
        ],
        xLabel: "Position (nm)",
        yLabel: "Amplitude",
      }

      return {
        chartData: data,
        insights: [
          `Potential well depth: ${potential.toFixed(2)} eV`,
          `Well width: ${width.toFixed(2)} nm`,
          `Wavelength: ${(width * 0.2).toFixed(2)} nm`,
        ],
      }
    }

    // Default line chart data
    const dataPoints = 50
    return {
      chartData: {
        labels: Array.from({ length: dataPoints }, (_, i) => i.toString()),
        datasets: [
          {
            label: "Dataset 1",
            data: Array.from({ length: dataPoints }, () => Math.random() * 100),
          },
        ],
        xLabel: "X Axis",
        yLabel: "Y Axis",
      },
      insights: ["This is a randomly generated dataset for demonstration purposes."],
    }
  }

  // Generate scatter chart data
  const generateScatterChartData = (sim: SimulationData, params: Record<string, number>) => {
    const dataPoints = 50
    return {
      chartData: {
        datasets: [
          {
            label: "Dataset 1",
            data: Array.from({ length: dataPoints }, () => ({
              x: Math.random() * 100,
              y: Math.random() * 100,
            })),
          },
        ],
        xLabel: "X Axis",
        yLabel: "Y Axis",
      },
      insights: ["This is a randomly generated scatter dataset."],
    }
  }

  // Generate bar chart data
  const generateBarChartData = (sim: SimulationData, params: Record<string, number>) => {
    // Example: Quantum simulation
    if (sim.title.toLowerCase().includes("quantum")) {
      const alpha = params.alpha || 0.7071
      const beta = Math.sqrt(1 - alpha * alpha)

      return {
        chartData: {
          labels: ["|0⟩", "|1⟩"],
          datasets: [
            {
              label: "Probability",
              data: [alpha * alpha, beta * beta],
            },
          ],
          xLabel: "State",
          yLabel: "Probability",
        },
        insights: [
          `Probability of |0⟩: ${(alpha * alpha).toFixed(4)}`,
          `Probability of |1⟩: ${(beta * beta).toFixed(4)}`,
          `The quantum state is: ${alpha.toFixed(4)}|0⟩ + ${beta.toFixed(4)}|1⟩`,
        ],
      }
    }

    // Default bar chart
    return {
      chartData: {
        labels: ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"],
        datasets: [
          {
            label: "Dataset 1",
            data: [12, 19, 3, 5, 2],
          },
        ],
        xLabel: "Categories",
        yLabel: "Values",
      },
      insights: ["This is a randomly generated bar chart dataset."],
    }
  }

  // Generate 3D chart data
  const generate3DChartData = (sim: SimulationData, params: Record<string, number>) => {
    return {
      chartData: {
        xValues: Array.from({ length: 10 }, (_, i) => i),
        yValues: Array.from({ length: 10 }, (_, i) => i),
        zValues: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.random() * 10)),
        xLabel: "X Axis",
        yLabel: "Y Axis",
        zLabel: "Z Axis",
      },
      insights: ["This is a randomly generated 3D surface dataset."],
    }
  }

  // Generate default data
  const generateDefaultData = (sim: SimulationData | null, params: Record<string, number>) => {
    return {
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Dataset 1",
            data: [12, 19, 3, 5, 2, 3],
          },
        ],
        xLabel: "Month",
        yLabel: "Value",
      },
      insights: ["No specific chart type was specified. Showing default data."],
    }
  }

  // Render the chart based on the simulation results
  const renderChart = () => {
    if (!simulationResults || !simulationResults.chartData) return null

    const { chartData } = simulationResults

    // Simple canvas-based chart rendering
    return (
      <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded-md p-4 relative">
        <canvas
          id="simulation-chart"
          className="w-full h-full"
          ref={(canvas) => {
            if (canvas) {
              const ctx = canvas.getContext("2d")
              if (ctx) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                // Set dimensions
                const width = canvas.width
                const height = canvas.height
                const padding = 40

                // Draw axes
                ctx.strokeStyle = "#666"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(padding, padding)
                ctx.lineTo(padding, height - padding)
                ctx.lineTo(width - padding, height - padding)
                ctx.stroke()

                // Draw labels
                ctx.fillStyle = "#888"
                ctx.font = "10px Arial"
                ctx.textAlign = "center"
                ctx.fillText(chartData.xLabel || "X Axis", width / 2, height - 10)

                ctx.save()
                ctx.translate(15, height / 2)
                ctx.rotate(-Math.PI / 2)
                ctx.fillText(chartData.yLabel || "Y Axis", 0, 0)
                ctx.restore()

                // Draw data
                if (chartData.datasets && chartData.datasets.length > 0) {
                  const dataset = chartData.datasets[0]
                  const data = dataset.data

                  if (simulation?.chartType === "bar") {
                    // Draw bar chart
                    const barWidth = (width - 2 * padding) / data.length / 2
                    const maxValue = Math.max(...data)

                    ctx.fillStyle = "rgba(75, 192, 192, 0.6)"

                    data.forEach((value: number, index: number) => {
                      const x = padding + index * ((width - 2 * padding) / data.length) + barWidth / 2
                      const barHeight = ((height - 2 * padding) * value) / maxValue
                      ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight)

                      // Draw label
                      if (chartData.labels && chartData.labels[index]) {
                        ctx.fillStyle = "#aaa"
                        ctx.fillText(chartData.labels[index], x + barWidth / 2, height - padding + 15)
                        ctx.fillStyle = "rgba(75, 192, 192, 0.6)"
                      }
                    })
                  } else {
                    // Draw line chart
                    const maxValue = Math.max(...data)
                    const minValue = Math.min(...data)
                    const range = maxValue - minValue || 1

                    ctx.strokeStyle = "rgba(75, 192, 192, 1)"
                    ctx.lineWidth = 2
                    ctx.beginPath()

                    data.forEach((value: number, index: number) => {
                      const x = padding + index * ((width - 2 * padding) / (data.length - 1))
                      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding)

                      if (index === 0) {
                        ctx.moveTo(x, y)
                      } else {
                        ctx.lineTo(x, y)
                      }
                    })

                    ctx.stroke()

                    // Draw points
                    ctx.fillStyle = "rgba(75, 192, 192, 1)"
                    data.forEach((value: number, index: number) => {
                      const x = padding + index * ((width - 2 * padding) / (data.length - 1))
                      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding)

                      ctx.beginPath()
                      ctx.arc(x, y, 3, 0, 2 * Math.PI)
                      ctx.fill()
                    })
                  }
                }
              }
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400 mb-2">
          Scientific Simulations
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore scientific concepts through interactive simulations. Describe what you want to simulate, adjust
          parameters, and visualize the results.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="input" className="data-[state=active]:bg-gray-800">
            <div className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              Input
            </div>
          </TabsTrigger>
          <TabsTrigger value="parameters" disabled={!simulation} className="data-[state=active]:bg-gray-800">
            <div className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Parameters
            </div>
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!simulationResults} className="data-[state=active]:bg-gray-800">
            <div className="flex items-center">
              <LineChart className="mr-2 h-4 w-4" />
              Results
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="mt-0">
          <Card className="bg-gray-950 border-gray-800">
            <CardHeader>
              <CardTitle>Simulation Input</CardTitle>
              <CardDescription>Describe the scientific concept or experiment you want to simulate</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Input
                      id="prompt"
                      placeholder="e.g., Simulate a simple pendulum with adjustable length and gravity"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="h-24 bg-gray-900 border-gray-800 focus:border-gray-700"
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading || !prompt.trim()} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Simulation...
                    </>
                  ) : (
                    <>Generate Simulation</>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Example Prompts</h3>
                <div className="grid gap-2">
                  {[
                    "Simulate a simple pendulum with adjustable length and gravity",
                    "Create a quantum superposition simulation with adjustable coefficients",
                    "Model a wave function in a potential well",
                    "Simulate planetary orbits with adjustable masses",
                    "Create a double-slit experiment simulation",
                  ].map((examplePrompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="justify-start h-auto py-2 px-4 bg-gray-900 border-gray-800 hover:bg-gray-800"
                      onClick={() => setPrompt(examplePrompt)}
                    >
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <span className="text-left">{examplePrompt}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="mt-0">
          {simulation && (
            <Card className="bg-gray-950 border-gray-800">
              <CardHeader>
                <CardTitle>{simulation.title}</CardTitle>
                <CardDescription>{simulation.explanation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Governing Equations</h3>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-md overflow-x-auto">
                    <MathJaxContext>
                      {simulation.equations.map((eq, i) => (
                        <div key={i} className="my-2 text-center">
                          <MathJax>{`\$$${eq}\$$`}</MathJax>
                        </div>
                      ))}
                    </MathJaxContext>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Simulation Parameters</h3>
                  {simulation.parameters.map((param) => (
                    <div key={param.name} className="space-y-2">
                      <div className="flex justify-between">
                        <label htmlFor={param.name} className="text-sm font-medium">
                          {param.label}
                        </label>
                        <span className="text-sm text-gray-400">
                          {paramValues[param.name]?.toFixed(2)} {param.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">{param.min}</span>
                        <Slider
                          id={param.name}
                          min={param.min}
                          max={param.max}
                          step={(param.max - param.min) / 100}
                          value={[paramValues[param.name] || param.default]}
                          onValueChange={(value) => handleParamChange(param.name, value[0])}
                          className="flex-1"
                        />
                        <span className="text-xs text-gray-500">{param.max}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={runSimulation} disabled={isRunning} className="w-full">
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running Simulation...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          {simulationResults && (
            <Card className="bg-gray-950 border-gray-800">
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
                <CardDescription>{simulation?.title} with the specified parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Visualization</h3>
                  {renderChart()}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Insights</h3>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-md">
                    <ul className="space-y-2">
                      {simulationResults.insights.map((insight: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Parameters Used</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {simulation?.parameters.map((param) => (
                      <div key={param.name} className="p-3 bg-gray-900 border border-gray-800 rounded-md">
                        <div className="text-sm font-medium">{param.label}</div>
                        <div className="text-xl mt-1">
                          {paramValues[param.name]?.toFixed(2)}{" "}
                          <span className="text-sm text-gray-400">{param.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("parameters")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Adjust Parameters
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
