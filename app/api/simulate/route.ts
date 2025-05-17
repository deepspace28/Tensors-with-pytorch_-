import { type NextRequest, NextResponse } from "next/server"

// Mock simulation data generator
function generateSimulationData(prompt: string, type = "unified") {
  console.log(`Generating simulation data for prompt: "${prompt}" with type: ${type}`)

  // Extract key terms from the prompt for customization
  const lowerPrompt = prompt.toLowerCase()

  // Default simulation data
  const simulationData = {
    title: "Quantum Simulation",
    explanation: "Simulation results based on quantum mechanics principles.",
    chartType: "line",
    equations: ["\\psi(x,t) = A e^{i(kx - \\omega t)}", "E = \\hbar \\omega", "p = \\hbar k"],
  }

  // Generate results based on the prompt
  const results = {
    x: Array.from({ length: 100 }, (_, i) => i / 10),
    y: Array.from({ length: 100 }, (_, i) => Math.sin(i / 10) * Math.exp(-i / 100)),
  }

  // Customize based on prompt keywords
  if (lowerPrompt.includes("quantum") || lowerPrompt.includes("qubit")) {
    simulationData.title = "Quantum State Evolution"
    simulationData.explanation = "Simulation of quantum state evolution over time."
    simulationData.equations = [
      "\\left|\\psi\\right> = \\alpha\\left|0\\right> + \\beta\\left|1\\right>",
      "|\\alpha|^2 + |\\beta|^2 = 1",
      "U\\left|\\psi\\right> = \\left|\\psi'\\right>",
    ]

    // Quantum oscillation pattern
    results.y = Array.from({ length: 100 }, (_, i) => Math.cos(i / 5) * Math.exp(-i / 200) + 0.5 * Math.sin(i / 2))
  } else if (lowerPrompt.includes("wave") || lowerPrompt.includes("particle")) {
    simulationData.title = "Wave-Particle Duality"
    simulationData.explanation = "Simulation demonstrating wave-particle behavior."
    simulationData.equations = ["\\lambda = \\frac{h}{p}", "E = h\\nu", "\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}"]

    // Wave packet
    results.y = Array.from({ length: 100 }, (_, i) => Math.exp(-Math.pow((i - 50) / 15, 2)) * Math.cos(i / 3))
  } else if (lowerPrompt.includes("schrodinger")) {
    simulationData.title = "Schrödinger Equation Solution"
    simulationData.explanation = "Visualization of wavefunction solutions to the Schrödinger equation."
    simulationData.equations = [
      "i\\hbar\\frac{\\partial}{\\partial t}\\Psi(x,t) = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2}{\\partial x^2}\\Psi(x,t) + V(x)\\Psi(x,t)",
      "\\Psi(x,t) = \\sum_n c_n \\psi_n(x) e^{-iE_nt/\\hbar}",
      "E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}",
    ]

    // Probability density for particle in a box
    results.y = Array.from({ length: 100 }, (_, i) => {
      const x = i / 100
      return (
        Math.pow(Math.sin(1 * Math.PI * x), 2) +
        0.5 * Math.pow(Math.sin(2 * Math.PI * x), 2) +
        0.25 * Math.pow(Math.sin(3 * Math.PI * x), 2)
      )
    })
  } else if (lowerPrompt.includes("harmonic") || lowerPrompt.includes("oscillator")) {
    simulationData.title = "Harmonic Oscillator"
    simulationData.explanation = "Simulation of quantum harmonic oscillator energy levels and wavefunctions."
    simulationData.equations = [
      "E_n = \\hbar\\omega(n + \\frac{1}{2})",
      "\\psi_n(x) = \\frac{1}{\\sqrt{2^n n!}}\\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4}e^{-\\frac{m\\omega x^2}{2\\hbar}}H_n\\left(\\sqrt{\\frac{m\\omega}{\\hbar}}x\\right)",
      "\\hat{H} = -\\frac{\\hbar^2}{2m}\\frac{d^2}{dx^2} + \\frac{1}{2}m\\omega^2x^2",
    ]

    // Harmonic oscillator wavefunction
    results.y = Array.from({ length: 100 }, (_, i) => {
      const x = (i - 50) / 10
      return (Math.exp((-x * x) / 2) * (1 - 2 * x * x + (x * x * x * x) / 3)) / 2
    })
  }

  // Add 3D data for certain simulations
  if (lowerPrompt.includes("3d") || lowerPrompt.includes("field") || lowerPrompt.includes("space")) {
    simulationData.chartType = "3d"
    results.z = Array.from({ length: 100 }, (_, i) => {
      return Math.cos(i / 15) * 0.5
    })
  }

  return {
    simulationData,
    results,
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Simulation API called")
    const body = await request.json()
    const { prompt, type = "unified", parameters = {} } = body

    if (!prompt) {
      return NextResponse.json({ error: "Simulation prompt is required" }, { status: 400 })
    }

    console.log(`Processing simulation request: "${prompt}"`)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate simulation data based on the prompt
    const result = generateSimulationData(prompt, type)

    console.log("Simulation completed successfully")

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in simulation API:", error)
    return NextResponse.json(
      {
        error: "Failed to process simulation",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
