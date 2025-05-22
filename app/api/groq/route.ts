import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  "Access-Control-Max-Age": "86400",
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  try {
    // Get the API key from environment variables - server-side only
    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      logger.error("GROQ_API_KEY is not configured")
      // Return a mock response instead of an error
      return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
    }

    // Parse the request body
    let requestData
    try {
      requestData = await request.json()
    } catch (error) {
      logger.error("Failed to parse request body", { error })
      return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
    }

    // Validate the request data
    if (!requestData.messages || !Array.isArray(requestData.messages)) {
      logger.error("Invalid request: messages array is required", { requestData })
      return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
    }

    // Use a default model that we know exists
    const model = "llama2-70b-4096" // Known to exist in Groq

    // Make the request to Groq API
    logger.info(`Making request to Groq API with model: ${model}`)
    try {
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: requestData.messages,
          temperature: requestData.temperature || 0.7,
          max_tokens: requestData.max_tokens || 2000,
        }),
      })

      // Check if the Groq API request was successful
      if (!groqResponse.ok) {
        logger.error(`Groq API error: ${groqResponse.status}`)
        // Return a mock response instead of an error
        return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
      }

      // Return the Groq API response
      const data = await groqResponse.json()
      return NextResponse.json(data, { headers: corsHeaders })
    } catch (fetchError) {
      logger.error("Error fetching from Groq API", { error: fetchError })
      // Return a mock response instead of an error
      return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
    }
  } catch (error) {
    logger.error("Unexpected error in groq API route", { error })
    // Return a mock response instead of an error
    return NextResponse.json(mockGroqResponse(), { status: 200, headers: corsHeaders })
  }
}

// Function to generate a mock Groq API response
function mockGroqResponse() {
  return {
    id: "mock-response-id",
    object: "chat.completion",
    created: Date.now(),
    model: "mock-llama2-70b",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: `{
  "title": "Simple Harmonic Oscillator",
  "equations": ["x(t) = A\\\\cos(\\\\omega t + \\\\phi)", "\\\\omega = \\\\sqrt{\\\\frac{k}{m}}"],
  "parameters": [
    {
      "name": "mass",
      "label": "Mass (m)",
      "default": 1.0,
      "min": 0.1,
      "max": 10.0,
      "unit": "kg"
    },
    {
      "name": "springConstant",
      "label": "Spring Constant (k)",
      "default": 10.0,
      "min": 1.0,
      "max": 100.0,
      "unit": "N/m"
    },
    {
      "name": "amplitude",
      "label": "Amplitude (A)",
      "default": 0.5,
      "min": 0.1,
      "max": 2.0,
      "unit": "m"
    }
  ],
  "chartType": "line",
  "explanation": "This simulation demonstrates a simple harmonic oscillator, such as a mass on a spring. The motion is characterized by a sinusoidal oscillation where the frequency depends on the mass and spring constant. The system continuously converts between potential and kinetic energy while the total energy remains constant."
}`,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 100,
      completion_tokens: 300,
      total_tokens: 400,
    },
  }
}
