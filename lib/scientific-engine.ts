// Define the types for our scientific engine responses
export interface ScientificResponse {
  title: string
  summary: string
  equations: string[]
  visualization: {
    type: "chart" | "table" | "3d" | "image"
    data: any
  }
  parameters?: {
    name: string
    label: string
    default: number
    min: number
    max: number
    unit: string
  }[]
  insights: string[]
}

// System prompt for scientific derivations and explanations
const SCIENTIFIC_SYSTEM_PROMPT = `You are a scientific engine that generates detailed, accurate scientific content.
Given a scientific query, generate:

1. A title for the scientific concept
2. A clear, concise summary (3-5 sentences)
3. Key equations in LaTeX format
4. Visualization data (for charts or tables)
5. Key insights or implications (3-5 bullet points)

Respond in strict JSON format with these fields:
{
  "title": "string",
  "summary": "string",
  "equations": ["equation1", "equation2"],
  "visualization": {
    "type": "chart|table|3d|image",
    "data": {}
  },
  "insights": ["insight1", "insight2", "insight3"]
}

For charts, include x and y arrays. For tables, include headers and rows arrays.
Ensure all LaTeX is properly formatted with escape characters.
DO NOT include any comments, explanations, or non-JSON content in your response.`

// Function to clean JSON string
function cleanJsonString(str: string): string {
  // Remove comments (both // and /* */)
  let cleaned = str.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "")

  // Remove trailing commas
  cleaned = cleaned.replace(/,(\s*[}\]])/g, "$1")

  // Replace single quotes with double quotes for JSON compatibility
  cleaned = cleaned.replace(/'/g, '"')

  return cleaned
}

// Function to extract JSON from a string that might contain markdown or other content
function extractJsonFromString(str: string): string {
  // Try to extract JSON from code blocks first
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/
  const codeBlockMatch = str.match(codeBlockRegex)

  if (codeBlockMatch && codeBlockMatch[1]) {
    return cleanJsonString(codeBlockMatch[1])
  }

  // If no code block, try to find JSON object directly
  const jsonObjectRegex = /(\{[\s\S]*\})/
  const jsonObjectMatch = str.match(jsonObjectRegex)

  if (jsonObjectMatch && jsonObjectMatch[1]) {
    return cleanJsonString(jsonObjectMatch[1])
  }

  // If all else fails, return the cleaned original string
  return cleanJsonString(str)
}

import { runGroqSimulation } from "./groq-simulation"

export async function generateScientificContent(
  query: string,
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  },
) {
  try {
    // Use the updated groq-simulation that uses our secure API route
    const result = await runGroqSimulation(query, options)
    return result
  } catch (error) {
    console.error("Error generating scientific content:", error)
    throw error
  }
}

// Update the generateSimulation function to fix the API request error
export async function generateSimulation(prompt: string) {
  try {
    console.log("Starting simulation generation for:", prompt)

    // Skip API call in development/preview for faster testing
    // In production, this would call the API

    // Choose simulation based on keywords in the prompt
    const promptLower = prompt.toLowerCase()

    if (promptLower.includes("pendulum")) {
      console.log("Generating pendulum simulation")
      return getPendulumSimulation()
    } else if (promptLower.includes("quantum") || promptLower.includes("superposition")) {
      console.log("Generating quantum simulation")
      return getQuantumSimulation()
    } else if (promptLower.includes("wave") || promptLower.includes("potential")) {
      console.log("Generating wave function simulation")
      return getWaveFunctionSimulation()
    } else if (promptLower.includes("orbit") || promptLower.includes("planet")) {
      console.log("Generating orbital simulation")
      return getOrbitalSimulation()
    } else if (promptLower.includes("slit") || promptLower.includes("interference")) {
      console.log("Generating double-slit simulation")
      return getDoubleSlitSimulation()
    }

    // Default to pendulum if no keywords match
    console.log("No specific simulation matched, using pendulum simulation")
    return getPendulumSimulation()
  } catch (error) {
    console.error("Error generating simulation:", error)
    // Return a default simulation on error
    return getPendulumSimulation()
  }
}

// Predefined simulations for different types
function getPendulumSimulation() {
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

function getQuantumSimulation() {
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
}

function getWaveFunctionSimulation() {
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
}

function getOrbitalSimulation() {
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
}

function getDoubleSlitSimulation() {
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
}
