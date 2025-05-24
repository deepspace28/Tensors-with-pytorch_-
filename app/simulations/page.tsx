"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { convertToQASM, createBellStateQASM, createGHZStateQASM, createQFTQASM } from "@/lib/qasm-converter"
import { Badge } from "@/components/ui/badge"
import { Atom, Calculator, Brain, Zap, Microscope } from "lucide-react"

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
  detail?: string
}

const simulationCategories = [
  {
    id: "quantum",
    title: "Quantum Computing",
    description: "Explore quantum mechanics and quantum computing simulations",
    icon: Atom,
    color: "bg-blue-500",
    demos: [
      { name: "Quantum Entanglement", path: "/demo/quantum", difficulty: "Advanced" },
      { name: "Schrödinger's Cat", path: "/demo/schrodinger-cat", difficulty: "Intermediate" },
      { name: "GHZ State", path: "/demo/ghz-state", difficulty: "Advanced" },
    ],
  },
  {
    id: "physics",
    title: "Physics Simulations",
    description: "Classical and modern physics simulations",
    icon: Zap,
    color: "bg-purple-500",
    demos: [
      { name: "Black Hole Dynamics", path: "/demo/blackhole", difficulty: "Advanced" },
      { name: "Wave Interference", path: "/demo/physics", difficulty: "Beginner" },
    ],
  },
  {
    id: "mathematics",
    title: "Mathematical Models",
    description: "Advanced mathematical computations and visualizations",
    icon: Calculator,
    color: "bg-green-500",
    demos: [
      { name: "Differential Equations", path: "/demo/math", difficulty: "Intermediate" },
      { name: "Complex Analysis", path: "/math-demo", difficulty: "Advanced" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Artificial intelligence and neural network simulations",
    icon: Brain,
    color: "bg-orange-500",
    demos: [
      { name: "Neural Networks", path: "/demo/ai", difficulty: "Intermediate" },
      { name: "Deep Learning", path: "/demo/ml", difficulty: "Advanced" },
    ],
  },
]

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
  const [backend, setBackend] = useState<string>("qasm_simulator")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      console.log("Backend:", backend)

      // Make the API call with QASM code and backend parameter
      const response = await fetch("https://sitebackend-production.up.railway.app/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qasm,
          shots,
          backend, // Add the backend parameter
        }),
      })

      const responseText = await response.text()
      console.log("Raw API Response:", responseText)

      let data: SimulationResponse
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        throw new Error(`Failed to parse API response: ${responseText}`)
      }

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}: ${data.detail || data.error || responseText}`,
        )
      }

      console.log("Parsed API Response:", data)

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
      throw new Error(response.error || response.detail || "Unknown error in simulation")
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
      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Scientific Simulations
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore cutting-edge simulations across quantum computing, physics, mathematics, and AI research.
            </p>
          </div>
        </div>
      </section>

      {/* Simulations Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {simulationCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={category.id}
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{category.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedCategory === category.id && (
                    <CardContent>
                      <div className="space-y-3">
                        {category.demos.map((demo, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Microscope className="h-4 w-4 text-gray-400" />
                              <span className="text-white">{demo.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {demo.difficulty}
                              </Badge>
                            </div>
                            <Link href={demo.path}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-white border-gray-600 hover:bg-gray-600"
                              >
                                Launch
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
