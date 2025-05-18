import { NextResponse } from "next/server"

// Simple CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(req: Request) {
  console.log("Simple chat API called")

  try {
    // Parse request
    const body = await req.json()
    const { messages } = body

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        {
          status: 400,
          headers: corsHeaders,
        },
      )
    }

    // Get the last user message
    const userMessage = messages[messages.length - 1]?.content || ""
    console.log("User message:", userMessage)

    // Check API key
    const apiKey = process.env.GROQ_API_KEY
    console.log("API key available:", !!apiKey)

    if (!apiKey) {
      // Fallback to local response if no API key
      console.log("No API key, using fallback")
      return NextResponse.json(
        {
          text: "I'm operating in offline mode. The API key is not available.",
        },
        { headers: corsHeaders },
      )
    }

    // Simple system prompt
    const systemPrompt = "You are Synaptiq, an AI assistant specializing in scientific topics."

    // Direct fetch to Groq with minimal options
    try {
      console.log("Fetching from Groq API")
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      })

      console.log("Groq response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Groq API error:", errorText)
        throw new Error(`Groq API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content || "No response content"

      console.log("Successfully got response from Groq")

      return NextResponse.json(
        { text: content },
        {
          headers: corsHeaders,
        },
      )
    } catch (groqError) {
      console.error("Error calling Groq:", groqError)

      // Fallback to a simple response
      return NextResponse.json(
        {
          text: "I encountered an error connecting to my knowledge base. Please try again later.",
        },
        {
          status: 200,
          headers: corsHeaders,
        },
      )
    }
  } catch (error) {
    console.error("General error in simple-chat API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: corsHeaders,
      },
    )
  }
}
