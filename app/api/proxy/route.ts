import { NextResponse } from "next/server"

// Simple CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(req: Request) {
  try {
    // Log request for debugging
    console.log("Proxy API called:", new Date().toISOString())

    // Parse request body
    const body = await req.json()
    const { messages, mode } = body

    // Validate request
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages must be an array" }, { status: 400, headers: corsHeaders })
    }

    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500, headers: corsHeaders })
    }

    // System prompt based on mode
    const systemPrompt =
      mode === "reason"
        ? "You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research."
        : "You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research."

    const systemMessage = {
      role: "system",
      content: systemPrompt,
    }

    // Make direct request to Groq API
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [systemMessage, ...messages],
        temperature: mode === "reason" ? 0.5 : 0.7,
        max_tokens: 4096,
      }),
    })

    // Check if Groq API request was successful
    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error("Groq API error:", groqResponse.status, errorText)
      return NextResponse.json(
        { error: `Groq API error: ${groqResponse.status}` },
        { status: 502, headers: corsHeaders },
      )
    }

    // Parse Groq API response
    const data = await groqResponse.json()
    const content = data.choices[0]?.message?.content || "No response from Groq."

    // Return successful response
    return NextResponse.json({ text: content }, { status: 200, headers: corsHeaders })
  } catch (error) {
    // Log and return error
    console.error("Proxy API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}
