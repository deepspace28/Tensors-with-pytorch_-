"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Loader2, Play, Download, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a simulation based on the prompt
      const result = await generateSimulation(prompt)
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
        // Generate data dynamically based on the simulation parameters
        results = generateDynamicData(sim, params)
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
  async function generateSimulation(prompt: string): Promise<SimulationData> {
    const promptLower = prompt.toLowerCase()

    // Try to use the API first
    try {
      const response = await fetch("/api/simulations/general/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.title) {
          return data
        }
      }
    } catch (error) {
      console.error("API error:", error)
      // Continue with fallback
    }

    // Fallback to client-side generation
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
      // Generate a dynamic simulation based on the prompt
      return generateDynamicSimulation(prompt)
    }
  }

  // Generate a dynamic simulation based on the prompt
  function generateDynamicSimulation(prompt: string): SimulationData {
    const promptLower = prompt.toLowerCase()

    // Extract potential parameters from the prompt
    const hasTime = promptLower.includes("time") || promptLower.includes("dynamic")
    const hasTemperature = promptLower.includes("temperature") || promptLower.includes("heat")
    const hasForce = promptLower.includes("force") || promptLower.includes("pressure")
    const hasEnergy = promptLower.includes("energy") || promptLower.includes("power")
    const hasFrequency = promptLower.includes("frequency") || promptLower.includes("oscillation")

    // Create a title based on the prompt
    let title = prompt.charAt(0).toUpperCase() + prompt.slice(1)
    if (!title.includes("Simulation")) {
      title += " Simulation"
    }

    // Create parameters based on the prompt content
    const parameters: SimulationParameter[] = []

    if (hasTime) {
      parameters.push({
        name: "duration",
        label: "Duration",
        default: 10,
        min: 1,
        max: 60,
        unit: "s",
      })
    }

    if (hasTemperature) {
      parameters.push({
        name: "temperature",
        label: "Temperature",
        default: 300,
        min: 0,
        max: 1000,
        unit: "K",
      })
    }

    if (hasForce) {
      parameters.push({
        name: "force",
        label: "Force",
        default: 10,
        min: 0,
        max: 100,
        unit: "N",
      })
    }

    if (hasEnergy) {
      parameters.push({
        name: "energy",
        label: "Energy",
        default: 5,
        min: 0,
        max: 50,
        unit: "J",
      })
    }

    if (hasFrequency) {
      parameters.push({
        name: "frequency",
        label: "Frequency",
        default: 1,
        min: 0.1,
        max: 10,
        unit: "Hz",
      })
    }

    // Add some default parameters if none were extracted
    if (parameters.length === 0) {
      parameters.push({
        name: "parameter1",
        label: "Parameter 1",
        default: 5,
        min: 0,
        max: 10,
        unit: "",
      })

      parameters.push({
        name: "parameter2",
        label: "Parameter 2",
        default: 2,
        min: 0,
        max: 5,
        unit: "",
      })
    }

    // Generate a simple equation based on the parameters
    const equations: string[] = []
    if (hasTime && hasFrequency) {
      equations.push("y(t) = A \\sin(2\\pi f t)")
    } else if (hasForce) {
      equations.push("F = ma")
    } else if (hasEnergy) {
      equations.push("E = mc^2")
    } else if (hasTemperature) {
      equations.push("PV = nRT")
    } else {
      equations.push("y = f(x)")
    }

    return {
      title,
      equations,
      parameters,
      chartType: hasTime ? "line" : "bar",
      explanation: `This is a dynamically generated simulation based on your prompt: "${prompt}". Adjust the parameters to see how they affect the results.`,
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

  // Generate dynamic data based on simulation parameters
  function generateDynamicData(simulation: SimulationData, params: Record<string, number>) {
    // Create a dataset based on the parameters
    const dataPoints = 100

    // Generate data based on parameter combinations
    const data: any = {
      labels: [],
      datasets: [
        {
          label: "Result",
          data: [],
        },
      ],
      xLabel: "X",
      yLabel: "Y",
    }

    // Generate different data based on the chart type
    if (simulation.chartType === "bar") {
      // For bar charts, create categorical data
      const categories = Object.keys(params)
      data.labels = categories
      data.datasets[0].data = categories.map((cat) => params[cat])
      data.xLabel = "Parameter"
      data.yLabel = "Value"
    } else if (simulation.chartType === "scatter") {
      // For scatter plots, create x,y coordinate data
      const paramKeys = Object.keys(params)
      const param1 = paramKeys[0] || "parameter1"
      const param2 = paramKeys[1] || "parameter2"

      data.datasets[0].data = Array.from({ length: dataPoints }, (_, i) => {
        const angle = (i / dataPoints) * Math.PI * 2
        const r = params[param1] || 1
        const variation = params[param2] || 0.5
        return {
          x: r * Math.cos(angle) * (1 + Math.sin(angle * 3) * variation),
          y: r * Math.sin(angle) * (1 + Math.cos(angle * 2) * variation),
        }
      })
      data.xLabel = param1
      data.yLabel = param2
    } else {
      // For line charts, create time series data
      const xRange = 10
      data.labels = Array.from({ length: dataPoints }, (_, i) => ((i * xRange) / dataPoints).toFixed(2))

      // Use the first parameter as amplitude and second as frequency if available
      const paramKeys = Object.keys(params)
      const amplitude = params[paramKeys[0]] || 1
      const frequency = params[paramKeys[1]] || 1

      data.datasets[0].data = Array.from({ length: dataPoints }, (_, i) => {
        const x = (i * xRange) / dataPoints
        return amplitude * Math.sin(x * frequency * Math.PI)
      })

      data.xLabel = "Time"
      data.yLabel = "Value"
    }

    // Generate insights based on the parameters
    const insights = Object.entries(params).map(([key, value]) => {
      return `${key}: ${value.toFixed(2)}`
    })

    // Add some calculated insights
    if (simulation.chartType === "line") {
      const paramKeys = Object.keys(params)
      const amplitude = params[paramKeys[0]] || 1
      const frequency = params[paramKeys[1]] || 1

      insights.push(`Maximum value: ${amplitude.toFixed(2)}`)
      insights.push(`Period: ${(1 / frequency).toFixed(2)}`)
    }

    return {
      chartData: data,
      insights,
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
        const maxValue = Math.max(...data)

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
          ctx.fillStyle = "#ffffff"
          const centerX = padding + ((0 - minX) / (maxX - minX)) * (width - 2 * padding)
          const centerY = height - padding - ((0 - minY) / (maxY - minY)) * (height - 2 * padding)
          ctx.beginPath()
          ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI)
          ctx.fill()
        }

        // Draw points
        ctx.fillStyle = "#ffffff"
        data.forEach((point: any) => {
          const x = padding + ((point.x - minX) / (maxX - minX)) * (width - 2 * padding)
          const y = height - padding - ((point.y - minY) / (maxY - minY)) * (height - 2 * padding)

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, 2 * Math.PI)
          ctx.fill()
        })

        // Connect points with lines for orbits
        if (dataset.label === "Orbit") {
          ctx.strokeStyle = "#ffffff"
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

        // Draw second dataset if it exists (e.g., for potential in wave function)
        if (chartData.datasets.length > 1) {
          const dataset2 = chartData.datasets[1]
          const data2 = dataset2.data

          ctx.strokeStyle = "#888888"
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4 flex items-center">
        <Link href="/demo" className="flex items-center text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Chat</span>
        </Link>
        <h1 className="text-xl font-bold text-white mx-auto">Scientific Simulations</h1>
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
                    placeholder="e.g., Simulate a simple pendulum with adjustable length and gravity"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-16 bg-black border-white/20 focus:border-white/40 text-white"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {["pendulum", "quantum", "wave", "orbit", "double-slit"].map((example) => (
                    <Button
                      key={example}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setExamplePrompt(`Simulate a ${example} experiment`)}
                      className="bg-black border-white/20 hover:bg-white/5 text-white/70"
                    >
                      {example}
                    </Button>
                  ))}
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
                  {error}
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
                    <MathJaxContext>
                      {simulation.equations.map((eq, i) => (
                        <div key={i} className="my-2 text-center">
                          <MathJax>{`\\[${eq}\\]`}</MathJax>
                        </div>
                      ))}
                    </MathJaxContext>
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
                            {paramValues[param.name]?.toFixed(2)} {param.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-white/50">{param.min}</span>
                          <Slider
                            id={param.name}
                            min={param.min}
                            max={param.max}
                            step={(param.max - param.min) / 100}
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

              {/* Visualization */}
              <Card className="bg-black border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Visualization</h3>
                  <div className="w-full h-64 bg-black border border-white/20 rounded-md overflow-hidden">
                    <canvas ref={canvasRef} className="w-full h-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              {simulationResults && (
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
                      <Button variant="outline" className="bg-black border-white/20 hover:bg-white/5 text-white/70">
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
