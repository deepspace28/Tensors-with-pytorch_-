import { NextResponse } from "next/server"

export const runtime = "edge"

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()
    const { messages, mode } = body

    // Validate request
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    }

    // Check if GROQ_API_KEY is available
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing")
      return NextResponse.json(
        { error: "Server configuration error" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
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
        Authorization: `Bearer ${apiKey}`,
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
        {
          status: 502,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      )
    }

    // Parse Groq API response
    const data = await groqResponse.json()
    const content = data.choices[0]?.message?.content || "No response from Groq."

    // Return successful response
    return NextResponse.json(
      { text: content },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (error) {
    // Log and return error
    console.error("Edge chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  }
}
