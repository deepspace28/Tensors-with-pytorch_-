"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Loader2, Play, Download, RefreshCw } from "lucide-react"
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
  const [isRunning, setIsRunning] = useState(false)
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

    try {
      console.log("Generating simulation for prompt:", prompt)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a simulation based on the prompt
      const result = generateSimulationFromPrompt(prompt)
      console.log("Simulation generated:", result)
      setSimulation(result)

      // Automatically run the simulation with default parameters
      setTimeout(() => {
        if (result && result.parameters) {
          const defaultParams: Record<string, number> = {}
          result.parameters.forEach((param) => {
            defaultParams[param.name] = param.default
          })
          runSimulationWithParams(result, defaultParams)
        }
      }, 100)
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
    if (!simulation) return
    runSimulationWithParams(simulation, paramValues)
  }

  // Run simulation with specific parameters
  const runSimulationWithParams = (sim: SimulationData, params: Record<string, number>) => {
    setIsRunning(true)

    // Generate data points based on the simulation type and parameters
    try {
      let results

      if (sim.title.toLowerCase().includes("pendulum")) {
        results = generatePendulumData(params)
      } else if (sim.title.toLowerCase().includes("quantum")) {
        results = generateQuantumData(params)
      } else if (sim.title.toLowerCase().includes("wave")) {
        results = generateWaveData(params)
      } else if (sim.title.toLowerCase().includes("orbit")) {
        results = generateOrbitalData(params)
      } else if (sim.title.toLowerCase().includes("slit")) {
        results = generateDoubleSlitData(params)
      } else {
        results = generateDefaultData(params)
      }

      setSimulationResults(results)

      // Draw the chart after a short delay to ensure the canvas is ready
      setTimeout(() => {
        drawChart(results.chartData, sim.chartType)
      }, 50)
    } catch (err) {
      console.error("Error running simulation:", err)
      setError("Failed to run simulation with the provided parameters.")
    } finally {
      setIsRunning(false)
    }
  }

  // Generate simulation based on prompt
  function generateSimulationFromPrompt(prompt: string): SimulationData {
    const promptLower = prompt.toLowerCase()

    if (promptLower.includes("pendulum")) {
      return {
        title: "Simple Pendulum Simulation",
        equations: ["\\theta(t) = \\theta_0 \\cos(\\omega t)", "\\omega = \\sqrt{\\frac{g}{L}}"],
        parameters: [
          {
            name: "length",
            label: "Pendulum Length (L)",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "m",
          },
          {
            name: "gravity",
            label: "Gravity (g)",
            default: 9.8,
            min: 1,
            max: 20,
            unit: "m/s²",
          },
          {
            name: "initialAngle",
            label: "Initial Angle (θ₀)",
            default: 30,
            min: 0,
            max: 90,
            unit: "°",
          },
        ],
        chartType: "line",
        explanation:
          "This simulation shows the motion of a simple pendulum. The period of oscillation depends on the length of the pendulum and the gravitational acceleration. For small angles, the motion is approximately simple harmonic.",
      }
    } else if (promptLower.includes("quantum") || promptLower.includes("superposition")) {
      return {
        title: "Quantum Superposition Simulation",
        equations: [
          "\\left|\\psi\\right> = \\alpha\\left|0\\right> + \\beta\\left|1\\right>",
          "|\\alpha|^2 + |\\beta|^2 = 1",
        ],
        parameters: [
          {
            name: "alpha",
            label: "Alpha Coefficient",
            default: 0.7071,
            min: 0,
            max: 1,
            unit: "",
          },
          {
            name: "decoherence",
            label: "Decoherence Rate",
            default: 0.1,
            min: 0,
            max: 1,
            unit: "1/s",
          },
        ],
        chartType: "bar",
        explanation:
          "This simulation demonstrates quantum superposition where a qubit exists in multiple states simultaneously. The probability of measuring each state is determined by the squared magnitudes of the complex amplitudes. Decoherence causes the quantum state to collapse over time.",
      }
    } else if (promptLower.includes("wave") || promptLower.includes("schrodinger")) {
      return {
        title: "Wave Function Simulation",
        equations: [
          "i\\hbar\\frac{\\partial}{\\partial t}\\Psi(x,t) = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2}{\\partial x^2}\\Psi(x,t) + V(x)\\Psi(x,t)",
        ],
        parameters: [
          {
            name: "potential",
            label: "Potential Well Depth",
            default: 10,
            min: 0,
            max: 50,
            unit: "eV",
          },
          {
            name: "width",
            label: "Well Width",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "nm",
          },
        ],
        chartType: "line",
        explanation:
          "This simulation shows the time evolution of a quantum wave function in a potential well. The Schrödinger equation describes how the wave function evolves over time, with solutions representing the probability distribution of finding a particle at different positions.",
      }
    } else if (promptLower.includes("orbit") || promptLower.includes("planet")) {
      return {
        title: "Planetary Orbit Simulation",
        equations: ["F = G\\frac{m_1 m_2}{r^2}", "T^2 = \\frac{4\\pi^2}{GM}a^3"],
        parameters: [
          {
            name: "mass",
            label: "Central Mass",
            default: 1,
            min: 0.1,
            max: 10,
            unit: "M☉",
          },
          {
            name: "distance",
            label: "Orbital Distance",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "AU",
          },
          {
            name: "eccentricity",
            label: "Orbital Eccentricity",
            default: 0.1,
            min: 0,
            max: 0.9,
            unit: "",
          },
        ],
        chartType: "scatter",
        explanation:
          "This simulation models planetary orbits according to Kepler's laws and Newton's law of universal gravitation. The shape of the orbit is determined by the eccentricity, while the orbital period depends on the distance and the central mass according to Kepler's third law.",
      }
    } else if (promptLower.includes("slit") || promptLower.includes("interference")) {
      return {
        title: "Double-Slit Experiment Simulation",
        equations: [
          "I(\\theta) = I_0 \\cos^2\\left(\\frac{\\pi d \\sin\\theta}{\\lambda}\\right)",
          "\\Delta x = \\frac{\\lambda L}{d}",
        ],
        parameters: [
          {
            name: "wavelength",
            label: "Wavelength",
            default: 500,
            min: 100,
            max: 1000,
            unit: "nm",
          },
          {
            name: "slitDistance",
            label: "Slit Separation",
            default: 0.1,
            min: 0.01,
            max: 1,
            unit: "mm",
          },
          {
            name: "screenDistance",
            label: "Screen Distance",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "m",
          },
        ],
        chartType: "line",
        explanation:
          "This simulation demonstrates the wave nature of light through the double-slit experiment. When light passes through two closely spaced slits, an interference pattern forms on the screen due to the superposition of waves. The pattern depends on the wavelength, slit separation, and distance to the screen.",
      }
    } else {
      // Default simulation
      return {
        title: "Simple Pendulum Simulation",
        equations: ["\\theta(t) = \\theta_0 \\cos(\\omega t)", "\\omega = \\sqrt{\\frac{g}{L}}"],
        parameters: [
          {
            name: "length",
            label: "Pendulum Length (L)",
            default: 1,
            min: 0.1,
            max: 5,
            unit: "m",
          },
          {
            name: "gravity",
            label: "Gravity (g)",
            default: 9.8,
            min: 1,
            max: 20,
            unit: "m/s²",
          },
          {
            name: "initialAngle",
            label: "Initial Angle (θ₀)",
            default: 30,
            min: 0,
            max: 90,
            unit: "°",
          },
        ],
        chartType: "line",
        explanation:
          "This simulation shows the motion of a simple pendulum. The period of oscillation depends on the length of the pendulum and the gravitational acceleration. For small angles, the motion is approximately simple harmonic.",
      }
    }
  }

  // Generate pendulum simulation data
  function generatePendulumData(params: Record<string, number>) {
    const length = params.length || 1
    const gravity = params.gravity || 9.8
    const initialAngle = ((params.initialAngle || 30) * Math.PI) / 180 // Convert to radians

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
        `Maximum height: ${(length * (1 - Math.cos(initialAngle))).toFixed(3)} m`,
        `Maximum velocity: ${(initialAngle * Math.sqrt(gravity * length)).toFixed(2)} m/s`,
      ],
    }
  }

  // Generate quantum simulation data
  function generateQuantumData(params: Record<string, number>) {
    const alpha = params.alpha || 0.7071
    const beta = Math.sqrt(1 - alpha * alpha)
    const decoherence = params.decoherence || 0.1

    // Calculate probabilities with decoherence effect
    const prob0 = alpha * alpha * (1 - decoherence) + 0.5 * decoherence
    const prob1 = beta * beta * (1 - decoherence) + 0.5 * decoherence

    return {
      chartData: {
        labels: ["|0⟩", "|1⟩"],
        datasets: [
          {
            label: "Probability",
            data: [prob0, prob1],
          },
        ],
        xLabel: "State",
        yLabel: "Probability",
      },
      insights: [
        `Probability of |0⟩: ${prob0.toFixed(4)}`,
        `Probability of |1⟩: ${prob1.toFixed(4)}`,
        `The quantum state is: ${alpha.toFixed(4)}|0⟩ + ${beta.toFixed(4)}|1⟩`,
        `Decoherence rate: ${decoherence.toFixed(2)} (higher values cause the system to approach classical behavior)`,
        `Purity of state: ${(Math.pow(prob0, 2) + Math.pow(prob1, 2)).toFixed(4)} (1.0 for pure states)`,
      ],
    }
  }

  // Generate wave function simulation data
  function generateWaveData(params: Record<string, number>) {
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
        `Energy levels are quantized with spacing approximately ${((Math.PI * Math.PI * 0.038) / (width * width)).toFixed(2)} eV`,
        `Probability of finding particle inside well: ${(0.68 * width).toFixed(2)}`,
      ],
    }
  }

  // Generate orbital simulation data
  function generateOrbitalData(params: Record<string, number>) {
    const mass = params.mass || 1
    const distance = params.distance || 1
    const eccentricity = params.eccentricity || 0.1

    // Calculate orbit points
    const points = 100
    const data = {
      datasets: [
        {
          label: "Orbit",
          data: Array.from({ length: points }, (_, i) => {
            const theta = (i * 2 * Math.PI) / points
            const r = (distance * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(theta))
            return {
              x: r * Math.cos(theta),
              y: r * Math.sin(theta),
            }
          }),
        },
        {
          label: "Central Body",
          data: [{ x: 0, y: 0 }],
        },
      ],
      xLabel: "X (AU)",
      yLabel: "Y (AU)",
    }

    // Calculate orbital period using Kepler's third law
    const period = Math.sqrt((4 * Math.PI * Math.PI * Math.pow(distance, 3)) / mass)

    return {
      chartData: data,
      insights: [
        `Orbital period: ${period.toFixed(2)} years`,
        `Perihelion distance: ${(distance * (1 - eccentricity)).toFixed(2)} AU`,
        `Aphelion distance: ${(distance * (1 + eccentricity)).toFixed(2)} AU`,
        `Orbital velocity at perihelion: ${(Math.sqrt((mass * (1 + eccentricity)) / (distance * (1 - eccentricity)))).toFixed(2)} AU/year`,
        `Orbital velocity at aphelion: ${(Math.sqrt((mass * (1 - eccentricity)) / (distance * (1 + eccentricity)))).toFixed(2)} AU/year`,
      ],
    }
  }

  // Generate double-slit simulation data
  function generateDoubleSlitData(params: Record<string, number>) {
    const wavelength = params.wavelength || 500 // nm
    const slitDistance = params.slitDistance || 0.1 // mm
    const screenDistance = params.screenDistance || 1 // m

    // Convert to consistent units
    const lambda = wavelength * 1e-9 // m
    const d = slitDistance * 1e-3 // m
    const L = screenDistance // m

    // Calculate the position of the first minimum
    const firstMinimum = (lambda * L) / d

    // Generate the interference pattern
    const dataPoints = 200
    const screenWidth = 10 * firstMinimum

    const data = {
      labels: Array.from({ length: dataPoints }, (_, i) =>
        ((i * screenWidth) / dataPoints - screenWidth / 2).toFixed(3),
      ),
      datasets: [
        {
          label: "Intensity",
          data: Array.from({ length: dataPoints }, (_, i) => {
            const x = (i * screenWidth) / dataPoints - screenWidth / 2
            const theta = Math.atan(x / L)
            // Single-slit diffraction factor
            const beta = (Math.PI * 0.05 * Math.sin(theta)) / lambda
            const singleSlit = beta === 0 ? 1 : Math.sin(beta) / beta
            // Double-slit interference factor
            const alpha = (Math.PI * d * Math.sin(theta)) / lambda
            const doubleSlit = Math.cos(alpha) * Math.cos(alpha)
            // Combined intensity
            return singleSlit * singleSlit * doubleSlit
          }),
        },
      ],
      xLabel: "Position on Screen (m)",
      yLabel: "Relative Intensity",
    }

    return {
      chartData: data,
      insights: [
        `Fringe spacing: ${(firstMinimum * 1000).toFixed(2)} mm`,
        `Number of visible fringes: ~${Math.floor(screenWidth / firstMinimum)}`,
        `Central maximum width: ${(2 * firstMinimum * 1000).toFixed(2)} mm`,
        `Diffraction angle: ${((Math.atan(firstMinimum / L) * 180) / Math.PI).toFixed(2)}°`,
        `Resolution limit: ${(((1.22 * lambda) / d) * 1e6).toFixed(2)} μrad`,
      ],
    }
  }

  // Generate default data
  function generateDefaultData(params: Record<string, number>) {
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
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, width, height)

    // Draw axes
    ctx.strokeStyle = "#444"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#aaa"
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
        const maxValue = Math.max(...data)

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"

        data.forEach((value: number, index: number) => {
          const x = padding + index * ((width - 2 * padding) / data.length) + barWidth / 2
          const barHeight = ((height - 2 * padding) * value) / maxValue
          ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight)

          // Draw label
          if (chartData.labels && chartData.labels[index]) {
            ctx.fillStyle = "#aaa"
            ctx.fillText(chartData.labels[index], x + barWidth / 2, height - padding + 15)
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          }
        })
      } else if (chartType === "scatter") {
        // Draw scatter plot
        const dataset = chartData.datasets[0]
        const data = dataset.data

        // Find min/max values
        let minX = Math.min(...data.map((d: any) => d.x))
        let maxX = Math.max(...data.map((d: any) => d.x))
        let minY = Math.min(...data.map((d: any) => d.y))
        let maxY = Math.max(...data.map((d: any) => d.y))

        // Add padding to ranges
        const rangeX = maxX - minX || 1
        const rangeY = maxY - minY || 1
        minX -= rangeX * 0.1
        maxX += rangeX * 0.1
        minY -= rangeY * 0.1
        maxY += rangeY * 0.1

        // Draw central body for orbital simulations
        if (chartData.datasets.length > 1 && chartData.datasets[1].label === "Central Body") {
          ctx.fillStyle = "#ffcc00"
          const centerX = padding + ((0 - minX) / (maxX - minX)) * (width - 2 * padding)
          const centerY = height - padding - ((0 - minY) / (maxY - minY)) * (height - 2 * padding)
          ctx.beginPath()
          ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
          ctx.fill()
        }

        // Draw points
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        data.forEach((point: any) => {
          const x = padding + ((point.x - minX) / (maxX - minX)) * (width - 2 * padding)
          const y = height - padding - ((point.y - minY) / (maxY - minY)) * (height - 2 * padding)

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, 2 * Math.PI)
          ctx.fill()
        })

        // Connect points with lines for orbits
        if (dataset.label === "Orbit") {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
          ctx.lineWidth = 1
          ctx.beginPath()

          data.forEach((point: any, index: number) => {
            const x = padding + ((point.x - minX) / (maxX - minX)) * (width - 2 * padding)
            const y = height - padding - ((point.y - minY) / (maxY - minY)) * (height - 2 * padding)

            if (index === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          })

          // Close the path for orbits
          const firstPoint = data[0]
          const x = padding + ((firstPoint.x - minX) / (maxX - minX)) * (width - 2 * padding)
          const y = height - padding - ((firstPoint.y - minY) / (maxY - minY)) * (height - 2 * padding)
          ctx.lineTo(x, y)

          ctx.stroke()
        }
      } else {
        // Draw line chart
        const dataset = chartData.datasets[0]
        const data = dataset.data
        const maxValue = Math.max(...data)
        const minValue = Math.min(...data)
        const range = maxValue - minValue || 1

        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
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

        // Draw second dataset if it exists (e.g., for potential in wave function)
        if (chartData.datasets.length > 1) {
          const dataset2 = chartData.datasets[1]
          const data2 = dataset2.data

          ctx.strokeStyle = "rgba(150, 150, 150, 0.6)"
          ctx.lineWidth = 1.5
          ctx.beginPath()

          data2.forEach((value: number, index: number) => {
            const x = padding + index * ((width - 2 * padding) / (data2.length - 1))
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
  }

  // Set example prompt
  const setExamplePrompt = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Scientific Simulations</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore scientific concepts through interactive simulations. Describe what you want to simulate, adjust
          parameters, and visualize the results.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Input Section */}
        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="prompt" className="text-sm font-medium text-gray-300">
                  Describe what you want to simulate
                </label>
                <Input
                  id="prompt"
                  placeholder="e.g., Simulate a simple pendulum with adjustable length and gravity"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-16 bg-gray-900 border-gray-800 focus:border-gray-700 text-white"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {["pendulum", "quantum", "wave", "orbit", "double-slit"].map((example) => (
                    <Button
                      key={example}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setExamplePrompt(`Simulate a ${example} experiment`)}
                      className="bg-gray-900 border-gray-800 hover:bg-gray-800 text-gray-300"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="bg-white text-black hover:bg-gray-200"
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
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Simulation Content */}
        {simulation && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Parameters and Equations */}
            <Card className="bg-black border-gray-800">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{simulation.title}</h2>
                  <p className="text-gray-400">{simulation.explanation}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Governing Equations</h3>
                  <div className="p-4 bg-gray-900 border border-gray-800 rounded-md overflow-x-auto">
                    <MathJaxContext>
                      {simulation.equations.map((eq, i) => (
                        <div key={i} className="my-2 text-center">
                          <MathJax>{`\\[${eq}\\]`}</MathJax>
                        </div>
                      ))}
                    </MathJaxContext>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Simulation Parameters</h3>
                  <div className="space-y-6">
                    {simulation.parameters.map((param) => (
                      <div key={param.name} className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor={param.name} className="text-sm font-medium text-gray-300">
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
                  <Button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="w-full bg-white text-black hover:bg-gray-200"
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
                </div>
              </CardContent>
            </Card>

            {/* Right Column: Results and Visualization */}
            <Card className="bg-black border-gray-800">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Visualization</h3>
                  <div className="w-full h-64 bg-gray-900 border border-gray-800 rounded-md overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full" />
                  </div>
                </div>

                {simulationResults && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Insights</h3>
                      <div className="p-4 bg-gray-900 border border-gray-800 rounded-md">
                        <ul className="space-y-2">
                          {simulationResults.insights.map((insight: string, i: number) => (
                            <li key={i} className="flex items-start text-gray-300">
                              <span className="text-gray-500 mr-2">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={runSimulation}
                        className="bg-gray-900 border-gray-800 hover:bg-gray-800 text-gray-300"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update
                      </Button>
                      <Button variant="outline" className="bg-gray-900 border-gray-800 hover:bg-gray-800 text-gray-300">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
