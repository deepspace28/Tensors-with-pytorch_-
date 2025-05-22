// Add better error handling and logging to the secure-groq API route
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
    // Validate that we have the API key
    const GROQ_API_KEY = process.env.GROQ_API_KEY
    if (!GROQ_API_KEY) {
      logger.error("GROQ_API_KEY is not configured")
      return NextResponse.json(
        { error: "API key not configured. Please set the GROQ_API_KEY environment variable." },
        { status: 500, headers: corsHeaders },
      )
    }

    // Parse the request body
    let requestData
    try {
      requestData = await request.json()
    } catch (error) {
      logger.error("Failed to parse request body", { error })
      return NextResponse.json({ error: "Invalid request body" }, { status: 400, headers: corsHeaders })
    }

    // Validate the request data
    if (!requestData.messages || !Array.isArray(requestData.messages)) {
      logger.error("Invalid request: messages array is required", { requestData })
      return NextResponse.json({ error: "messages array is required" }, { status: 400, headers: corsHeaders })
    }

    // Use a default model if not specified
    const model = requestData.model || "llama3-8b"

    // Make the request to Groq API
    logger.info(`Making request to Groq API with model: ${model}`)
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
      const errorText = await groqResponse.text()
      logger.error(`Groq API error: ${groqResponse.status}`, { errorText })

      // If the model doesn't exist, suggest alternatives
      if (groqResponse.status === 404 || errorText.includes("model not found")) {
        return NextResponse.json(
          { error: `Model '${model}' not found. Try using 'llama3-8b' or 'mixtral-8x7b-32768' instead.` },
          { status: 404, headers: corsHeaders },
        )
      }

      return NextResponse.json(
        { error: `Groq API error: ${groqResponse.status}`, details: errorText },
        { status: groqResponse.status, headers: corsHeaders },
      )
    }

    // Return the Groq API response
    const data = await groqResponse.json()
    return NextResponse.json(data, { headers: corsHeaders })
  } catch (error) {
    logger.error("Unexpected error in secure-groq API route", { error })
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: corsHeaders },
    )
  }
}
