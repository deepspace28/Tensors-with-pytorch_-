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

// List of available Groq models to try in order of preference
const GROQ_MODELS = ["llama2-70b-4096", "mixtral-8x7b-32768", "gemma-7b-it", "llama2-7b"]

// Update the generateSimulation function to fix the API request error
export async function generateSimulation(prompt: string) {
  try {
    const systemPrompt = `You are a scientific experiment compiler. Given a freeform experiment request, return:

A title

Governing equations (in LaTeX)

Input parameters (name, label, default, min, max, unit)

A formula or dataset for graphing

Chart type (line, scatter, 3D)

A 3-5 sentence explanation of the result
Respond in strict JSON format.
DO NOT include any comments, explanations, or non-JSON content in your response.`

    // Try each model in sequence until one works
    for (const model of GROQ_MODELS) {
      try {
        console.log(`Attempting to use model: ${model}`)

        // Use the direct Groq API route with environment variable
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.5,
            max_tokens: 2000,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const content = data.choices[0].message.content

          console.log("Raw API response:", content)

          // Parse the JSON response
          try {
            const jsonString = extractJsonFromString(content)
            console.log("Extracted JSON string:", jsonString)

            return JSON.parse(jsonString)
          } catch (parseError) {
            console.error("Failed to parse JSON response:", parseError)
            // Continue to next model or fallback
          }
        } else {
          console.error(`API request failed with model ${model}: ${response.status}`)
          // Try the next model
        }
      } catch (apiError) {
        console.error(`Error with model ${model}:`, apiError)
        // Continue to next model
      }
    }

    // If all API calls fail, use mock data
    console.log("All API calls failed. Using fallback simulation data")
    return getDefaultSimulation(prompt)
  } catch (error) {
    console.error("Error generating simulation:", error)
    return getDefaultSimulation(prompt)
  }
}

// Function to get default simulation data based on the prompt
function getDefaultSimulation(prompt: string) {
  // Choose different default simulations based on keywords in the prompt
  const promptLower = prompt.toLowerCase()

  if (promptLower.includes("quantum") || promptLower.includes("qubit")) {
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
  } else {
    // Default to pendulum simulation
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
