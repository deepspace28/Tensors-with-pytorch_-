// import * as env from "@/app/env"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    // Use the server-side environment variable
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      throw new Error("GROQ API key is not defined")
    }

    // System prompt for black hole simulations
    const systemPrompt = `You are an astrophysics expert specializing in black hole thermodynamics.
    Given a black hole simulation request, provide:
    
    1. A detailed explanation of black hole entropy and the Bekenstein-Hawking formula
    2. Mathematical equations describing the entropy changes using LaTeX
    3. Simulation of entropy changes during black hole evolution
    4. Discussion of the information paradox and its implications
    5. Visualization data for plotting entropy changes over time
    
    Format your response with markdown, including LaTeX equations between $$ delimiters.
    Include a JSON code block for visualization data with time and entropy arrays.`

    // Call the Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `Simulate the following black hole scenario: ${prompt}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const result = data.choices[0].message.content

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error in black hole simulation:", error)
    return NextResponse.json({ error: "Failed to run black hole simulation" }, { status: 500 })
  }
}
