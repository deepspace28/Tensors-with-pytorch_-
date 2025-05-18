import { NextResponse } from "next/server"

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
  try {
    console.log("Direct Groq API route called:", new Date().toISOString())

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json({ error: "API key not configured" }, { status: 500, headers: corsHeaders })
    }

    // Parse request body
    const body = await req.json()

    // Forward the request directly to Groq
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    console.log("Forwarding request to Groq API...")

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: body.messages || [{ role: "user", content: "Hello" }],
        temperature: body.temperature || 0.7,
        max_tokens: body.max_tokens || 1024,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Return the Groq response directly
    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    })
  } catch (error) {
    console.error("Error in direct-groq route:", error)

    return NextResponse.json(
      {
        error: "API request failed",
        message: error.message,
        name: error.name,
      },
      { status: 500, headers: corsHeaders },
    )
  }
}
