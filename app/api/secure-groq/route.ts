import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { model, messages, temperature, max_tokens } = await request.json()

    // Use the server-side environment variable
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw new Error("GROQ API key is not defined")
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || "llama3-70b-8192",
        messages,
        temperature: temperature || 0.5,
        max_tokens: max_tokens || 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in secure GROQ API:", error)
    return NextResponse.json({ error: "Failed to call GROQ API" }, { status: 500 })
  }
}
