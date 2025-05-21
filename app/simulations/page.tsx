"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Play, Download, RefreshCw, ArrowLeft, AlertTriangle, Code, Copy, Check } from "lucide-react"
import Link from "next/link"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { ResourceLoader } from "@/components/resource-loader"
import { convertToQASM, createBellStateQASM, createGHZStateQASM, createQFTQASM } from "@/lib/qasm-converter"

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
}

// Define the API response type
interface SimulationResponse {
  success: boolean
  results?: {
    counts?: Record<string, number>
    statevector?: any
    circuit_image?: string
    histogram_image?: string
    visualization?: any
    circuit_diagram?: string
  }
  error?: string
}

export default function SimulationsPage() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [simulation, setSimulation] = useState<SimulationData | null>(null)
  const [paramValues, setParamValues] = useState<Record<string, number>>({})
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [apiResponse, setApiResponse] = useState<SimulationResponse | null>(null)
  const [qasmCode, setQasmCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    setApiResponse(null)
    setQasmCode("")

    try {
      // Parse the prompt to determine what kind of simulation to run
      const simulationType = determineSimulationType(prompt)

      // Create a simulation configuration based on the prompt
      const simulationConfig = createSimulationConfig(simulationType, prompt)
      setSimulation(simulationConfig)

      // Automatically run the simulation with default parameters
      setTimeout(() => {
        if (simulationConfig && simulationConfig.parameters) {
          const defaultParams: Record<string, number> = {}
          simulationConfig.parameters.forEach((param) => {
            defaultParams[param.name] = param.default
          })
          runSimulationWithParams(simulationConfig, defaultParams)
        }
      }, 100)
    } catch (err) {
      console.error("Error generating simulation:", err)
      setError("Failed to generate simulation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Determine the type of simulation based on the prompt
  const determineSimulationType = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes("bell") || lowerPrompt.includes("entangle")) {
      return "bell-state"
    } else if (lowerPrompt.includes("ghz")) {
      return "ghz-state"
    } else if (lowerPrompt.includes("qft") || lowerPrompt.includes("fourier")) {
      return "qft"
    } else if (lowerPrompt.includes("quantum") || lowerPrompt.includes("qubit")) {
      return "quantum"
    } else {
      return "quantum" // Default to quantum if we can't determine
    }
  }

  // Create a simulation configuration based on the type
  const createSimulationConfig = (type: string, prompt: string): SimulationData => {
    switch (type) {
      case "bell-state":
        return {
          title: "Bell State Quantum Circuit",
          equations: ["\\left|\\Phi^+\\right> = \\frac{1}{\\sqrt{2}}(\\left|00\\right> + \\left|11\\right>)"],
          parameters: [
            {
              name: "shots",
              label: "Number of Shots",
              default: 1024,
              min: 100,
              max: 8192,
              unit: "",
            },
          ],
          chartType: "bar",
          explanation:
            "This simulation creates a Bell state, which is a maximally entangled quantum state of two qubits. The circuit applies a Hadamard gate to the first qubit followed by a CNOT gate between the first and second qubit.",
        }
      case "ghz-state":
        return {
          title: "GHZ State Quantum Circuit",
          equations: ["\\left|\\text{GHZ}\\right> = \\frac{1}{\\sqrt{2}}(\\left|000\\right> + \\left|111\\right>)"],
          parameters: [
            {
              name: "qubits",
              label: "Number of Qubits",
              default: 3,
              min: 3,
              max: 5,
              unit: "",
            },
            {
              name: "shots",
              label: "Number of Shots",
              default: 1024,
              min: 100,
              max: 8192,
              unit: "",
            },
          ],
          chartType: "bar",
          explanation:
            "This simulation creates a Greenberger-Horne-Zeilinger (GHZ) state, which is a maximally entangled state of three or more qubits. The circuit applies a Hadamard gate to the first qubit followed by CNOT gates to entangle all qubits.",
        }
      case "qft":
        return {
          title: "Quantum Fourier Transform",
          equations: ["\\text{QFT}|j\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} e^{2\\pi ijk/N}|k\\rangle"],
          parameters: [
            {
              name: "qubits",
              label: "Number of Qubits",
              default: 3,
              min: 2,
              max: 5,
              unit: "",
            },
            {
              name: "shots",
              label: "Number of Shots",
              default: 1024,
              min: 100,
              max: 8192,
              unit: "",
            },
          ],
          chartType: "bar",
          explanation:
            "The Quantum Fourier Transform (QFT) is a quantum analog of the discrete Fourier transform. It's a fundamental building block in many quantum algorithms including Shor's factoring algorithm.",
        }
      case "quantum":
        return {
          title: "Quantum Circuit Simulation",
          equations: [
            "\\left|\\psi\\right> = \\alpha\\left|0\\right> + \\beta\\left|1\\right>",
            "|\\alpha|^2 + |\\beta|^2 = 1",
          ],
          parameters: [
            {
              name: "qubits",
              label: "Number of Qubits",
              default: 2,
              min: 1,
              max: 5,
              unit: "",
            },
            {
              name: "gates",
              label: "Number of Gates",
              default: 2,
              min: 1,
              max: 10,
              unit: "",
            },
            {
              name: "shots",
              label: "Number of Shots",
              default: 1024,
              min: 100,
              max: 8192,
              unit: "",
            },
          ],
          chartType: "bar",
          explanation:
            "This simulation runs a quantum circuit with the specified number of qubits and gates. The results show the probability distribution of measuring each possible state.",
        }
      default:
        return {
          title: "Generic Quantum Simulation",
          equations: ["E = mc^2"],
          parameters: [
            {
              name: "qubits",
              label: "Number of Qubits",
              default: 2,
              min: 1,
              max: 5,
              unit: "",
            },
            {
              name: "shots",
              label: "Number of Shots",
              default: 1024,
              min: 100,
              max: 8192,
              unit: "",
            },
          ],
          chartType: "bar",
          explanation:
            "This is a generic quantum simulation based on your prompt. Adjust the parameters to see how they affect the results.",
        }
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
    if (!simulation) return
    runSimulationWithParams(simulation, paramValues)
  }

  // Copy QASM code to clipboard
  const copyQasmToClipboard = () => {
    if (qasmCode) {
      navigator.clipboard.writeText(qasmCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Run simulation with specific parameters
  const runSimulationWithParams = async (sim: SimulationData, params: Record<string, number>) => {
    setIsRunning(true)
    setError(null)
    setApiResponse(null)
    setQasmCode("")

    try {
      // Generate QASM code based on the simulation type and parameters
      let qasm = ""
      const shots = Math.floor(params.shots || 1024)

      if (sim.title.includes("Bell State")) {
        qasm = createBellStateQASM()
      } else if (sim.title.includes("GHZ State")) {
        const numQubits = Math.floor(params.qubits) || 3
        qasm = createGHZStateQASM(numQubits)
      } else if (sim.title.includes("Quantum Fourier Transform")) {
        const numQubits = Math.floor(params.qubits) || 3
        qasm = createQFTQASM(numQubits)
      } else if (sim.title.includes("Quantum Circuit")) {
        // Prepare a quantum circuit simulation request
        const numQubits = Math.floor(params.qubits) || 2
        const numGates = Math.floor(params.gates) || 2

        // Create a basic quantum circuit with Hadamard and CNOT gates
        const gates = []

        // Add Hadamard gates to the first half of qubits
        for (let i = 0; i < Math.ceil(numQubits / 2); i++) {
          gates.push({ name: "Hadamard", target: i })
        }

        // Add CNOT gates between adjacent qubits
        for (let i = 0; i < numQubits - 1 && gates.length < numGates; i++) {
          gates.push({ name: "CNOT", control: i, target: i + 1 })
        }

        // Add more gates if needed
        while (gates.length < numGates && gates.length < numQubits * 2) {
          const target = Math.floor(Math.random() * numQubits)
          gates.push({ name: "Hadamard", target })
        }

        const circuitInput = {
          qubits: numQubits,
          gates: gates,
          measure: Array.from({ length: numQubits }, (_, i) => i),
          initial_states: Array(numQubits).fill("|0>"),
        }

        qasm = convertToQASM(circuitInput)
      } else {
        // For non-quantum simulations, create a simple quantum circuit as a fallback
        qasm = createBellStateQASM()
      }

      // Store the QASM code for display
      setQasmCode(qasm)

      console.log("Sending QASM to API:", qasm)
      console.log("Shots:", shots)

      // Make the API call with QASM code
      const response = await fetch("https://sitebackend-production.up.railway.app/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qasm,
          shots,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      setApiResponse(data)

      // Process the API response to generate chart data
      const results = processApiResponse(data, sim.chartType)
      setSimulationResults(results)

      // Draw the chart after a short delay to ensure the canvas is ready
      setTimeout(() => {
        if (results && results.chartData) {
          drawChart(results.chartData, sim.chartType)
        }
      }, 50)
    } catch (err) {
      console.error("Error running simulation:", err)
      setError(`Failed to run simulation: ${err instanceof Error ? err.message : String(err)}`)
      setSimulationResults(null)
    } finally {
      setIsRunning(false)
    }
  }

  // Process the API response to generate chart data
  const processApiResponse = (response: SimulationResponse, chartType: string) => {
    if (!response.success) {
      throw new Error(response.error || "Unknown error in simulation")
    }

    const results = response.results
    if (!results) {
      throw new Error("No results returned from simulation")
    }

    if (chartType === "bar" && results.counts) {
      // Process counts data for bar charts (quantum simulations)
      const labels = Object.keys(results.counts)
      const data = Object.values(results.counts)
      const total = data.reduce((sum, val) => sum + (val as number), 0)

      // Calculate probabilities
      const probabilities = data.map((val) => (val as number) / total)

      return {
        chartData: {
          labels,
          datasets: [
            {
              label: "Probability",
              data: probabilities,
            },
          ],
          xLabel: "Quantum State",
          yLabel: "Probability",
        },
        insights: [
          `Total shots: ${total}`,
          `Number of states: ${labels.length}`,
          `Most probable state: ${labels[probabilities.indexOf(Math.max(...probabilities))]}`,
          `Probability of most likely outcome: ${Math.max(...probabilities).toFixed(4)}`,
          ...Object.entries(results.counts)
            .map(([state, count]) => `Measured |${state}> ${count} times (${((count as number) / total).toFixed(4)})`)
            .slice(0, 5),
        ],
      }
    } else {
      // Generic processing for other types of data
      return {
        chartData: {
          labels: ["No data available"],
          datasets: [
            {
              label: "No data",
              data: [0],
            },
          ],
          xLabel: "X",
          yLabel: "Y",
        },
        insights: ["No insights available for this simulation type."],
      }
    }
  }

  // Draw chart on canvas
  function drawChart(chartData: any, chartType: string) {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const padding = 50

    // Draw background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    // Draw axes
    ctx.strokeStyle = "#444444"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#ffffff"
    ctx.font = "12px system-ui, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(chartData.xLabel || "X Axis", width / 2, height - 10)

    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(chartData.yLabel || "Y Axis", 0, 0)
    ctx.restore()

    // Draw data
    if (chartData.datasets && chartData.datasets.length > 0) {
      if (chartType === "bar" || chartData.datasets[0].data.length <= 10) {
        // Draw bar chart
        const dataset = chartData.datasets[0]
        const data = dataset.data
        const barWidth = (width - 2 * padding) / data.length / 1.5
        const maxValue = Math.max(...data, 0.00001) // Avoid division by zero

        ctx.fillStyle = "#ffffff"

        data.forEach((value: number, index: number) => {
          const x = padding + index * ((width - 2 * padding) / data.length) + barWidth / 2
          const barHeight = ((height - 2 * padding) * value) / maxValue
          ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight)

          // Draw label
          if (chartData.labels && chartData.labels[index]) {
            ctx.fillStyle = "#ffffff"
            ctx.fillText(chartData.labels[index], x + barWidth / 2, height - padding + 15)
            ctx.fillStyle = "#ffffff"
          }
        })
      } else {
        // Draw line chart
        const dataset = chartData.datasets[0]
        const data = dataset.data
        const maxValue = Math.max(...data)
        const minValue = Math.min(...data)
        const range = maxValue - minValue || 1

        ctx.strokeStyle = "#ffffff"
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
      }
    }
  }

  // Set example prompt
  const setExamplePrompt = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 flex items-center">
        <Link href="/demo" className="flex items-center text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Chat</span>
        </Link>
        <h1 className="text-xl font-bold text-white mx-auto">Quantum Simulations</h1>
        <div className="w-24" />
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="space-y-8">
          {/* Input Section */}
          <Card className="bg-black border border-white/10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium text-white/70">
                    Describe what you want to simulate
                  </label>
                  <Input
                    id="prompt"
                    placeholder="e.g., Simulate a Bell state quantum circuit"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-16 bg-black border-white/20 focus:border-white/40 text-white"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["bell state", "ghz state", "quantum fourier transform", "hadamard gate", "entanglement"].map(
                    (example) => (
                      <Button
                        key={example}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setExamplePrompt(`Simulate a ${example}`)}
                        className="bg-black border-white/20 hover:bg-white/5 text-white/70"
                      >
                        {example}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate Simulation</>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simulation Content */}
          {simulation && (
            <div className="space-y-8">
              {/* Title and Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">{simulation.title}</h2>
                <p className="text-white/70">{simulation.explanation}</p>
              </div>

              {/* Equations */}
              <Card className="bg-black border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Governing Equations</h3>
                  <div className="p-4 bg-black border border-white/20 rounded-md overflow-x-auto">
                    <ResourceLoader>
                      <MathJaxContext>
                        {simulation.equations.map((eq, i) => (
                          <div key={i} className="my-2 text-center">
                            <MathJax>{`\\[${eq}\\]`}</MathJax>
                          </div>
                        ))}
                      </MathJaxContext>
                    </ResourceLoader>
                  </div>
                </CardContent>
              </Card>

              {/* Parameters */}
              <Card className="bg-black border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Simulation Parameters</h3>
                  <div className="space-y-6">
                    {simulation.parameters.map((param) => (
                      <div key={param.name} className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor={param.name} className="text-sm font-medium text-white/70">
                            {param.label}
                          </label>
                          <span className="text-sm text-white/70">
                            {Math.round(paramValues[param.name] || param.default)} {param.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-white/50">{param.min}</span>
                          <Slider
                            id={param.name}
                            min={param.min}
                            max={param.max}
                            step={param.name === "qubits" ? 1 : (param.max - param.min) / 100}
                            value={[paramValues[param.name] || param.default]}
                            onValueChange={(value) => handleParamChange(param.name, value[0])}
                            className="flex-1"
                          />
                          <span className="text-xs text-white/50">{param.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="w-full mt-6 bg-white text-black hover:bg-white/90"
                  >
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
                </CardContent>
              </Card>

              {/* QASM Code */}
              {qasmCode && (
                <Card className="bg-black border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        QASM Code
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyQasmToClipboard}
                        className="bg-black border-white/20 hover:bg-white/5 text-white/70"
                      >
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="p-4 bg-black border border-white/20 rounded-md overflow-auto">
                      <pre className="text-xs text-white/70 whitespace-pre">{qasmCode}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Simulation Results */}
              {apiResponse?.results && (
                <Card className="bg-black border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-white">Simulation Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Tabs defaultValue="visualization" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="visualization">Visualization</TabsTrigger>
                        <TabsTrigger value="circuit">Circuit</TabsTrigger>
                        <TabsTrigger value="data">Data</TabsTrigger>
                      </TabsList>
                      <TabsContent value="visualization" className="space-y-4">
                        {apiResponse.results.histogram_image ? (
                          <div className="flex flex-col items-center">
                            <h4 className="text-sm font-medium text-white/70 mb-2">Measurement Histogram</h4>
                            <div className="w-full bg-black border border-white/20 rounded-md overflow-hidden p-4 flex justify-center">
                              <img
                                src={`data:image/png;base64,${apiResponse.results.histogram_image}`}
                                alt="Measurement Histogram"
                                className="max-w-full h-auto"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-64 bg-black border border-white/20 rounded-md overflow-hidden">
                            <canvas ref={canvasRef} className="w-full h-full" />
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="circuit" className="space-y-4">
                        {apiResponse.results.circuit_image ? (
                          <div className="flex flex-col items-center">
                            <h4 className="text-sm font-medium text-white/70 mb-2">Quantum Circuit</h4>
                            <div className="w-full bg-black border border-white/20 rounded-md overflow-hidden p-4 flex justify-center">
                              <img
                                src={`data:image/png;base64,${apiResponse.results.circuit_image}`}
                                alt="Quantum Circuit"
                                className="max-w-full h-auto"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-black border border-white/20 rounded-md text-white/50 text-center">
                            No circuit visualization available
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="data" className="space-y-4">
                        <div className="p-4 bg-black border border-white/20 rounded-md overflow-auto">
                          <h4 className="text-sm font-medium text-white/70 mb-2">Measurement Counts</h4>
                          <pre className="text-xs text-white/70 whitespace-pre-wrap">
                            {JSON.stringify(apiResponse.results.counts, null, 2)}
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Insights */}
              {simulationResults && simulationResults.insights && (
                <Card className="bg-black border border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Insights</h3>
                    <div className="p-4 bg-black border border-white/20 rounded-md">
                      <ul className="space-y-2">
                        {simulationResults.insights.map((insight: string, i: number) => (
                          <li key={i} className="flex items-start text-white/70">
                            <span className="text-white/50 mr-2">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        onClick={runSimulation}
                        className="bg-black border-white/20 hover:bg-white/5 text-white/70"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-black border-white/20 hover:bg-white/5 text-white/70"
                        onClick={() => {
                          // Download the simulation configuration and results
                          const data = {
                            simulation: simulation,
                            parameters: paramValues,
                            qasm: qasmCode,
                            results: apiResponse,
                          }
                          const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = "quantum-simulation-results.json"
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          URL.revokeObjectURL(url)
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
