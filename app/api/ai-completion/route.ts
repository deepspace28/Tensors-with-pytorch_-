export const runtime = "nodejs"

import { NextResponse } from "next/server"

// Environment variable check - only use server-side variable
const API_KEY = process.env.GROQ_API_KEY

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please check your environment variables." },
        { status: 500 },
      )
    }

    const { messages, prompt, model, temperature, max_tokens } = await req.json()

    // Determine which API endpoint to use
    const API_URL = "https://api.groq.com/openai/v1/chat/completions"

    // Prepare the request body
    const requestBody = messages
      ? {
          model: model || "llama3-70b-8192",
          messages,
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 4096,
        }
      : {
          model: model || "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 4096,
        }

    // Make the request to the LLM API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error (${response.status}):`, errorText)
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in secure API route:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}
