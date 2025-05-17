import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { endpoint, payload } = await request.json()

    // Only allow specific endpoints for security
    const allowedEndpoints = ["chat", "simulations", "completions"]
    const isAllowedEndpoint = allowedEndpoints.some((allowed) => endpoint.includes(allowed))

    if (!isAllowedEndpoint) {
      return NextResponse.json({ error: "Unauthorized endpoint" }, { status: 403 })
    }

    // Use server-side environment variable
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw new Error("GROQ API key is not defined")
    }

    const response = await fetch(`https://api.groq.com/openai/v1/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GROQ proxy:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
