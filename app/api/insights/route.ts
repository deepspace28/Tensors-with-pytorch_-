import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function POST(request: Request) {
  try {
    // Get the API key from environment variables - server-side only
    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      logger.error("GROQ_API_KEY is not configured")
      return NextResponse.json({
        insights: "Unable to generate insights due to missing API configuration.",
      })
    }

    // Parse the request body
    const { result, prompt } = await request.json()

    // Create a prompt for Groq to generate insights
    const insightPrompt = `
You are a quantum physics expert. Based on the following quantum simulation results, provide 3-5 insightful observations about the quantum phenomena demonstrated.

Simulation type: ${result.title || "Unknown simulation"}
Description: ${result.description || "No description provided"}
Measurement results: ${JSON.stringify(result.chart_data?.datasets?.[0]?.data || [])}
States measured: ${JSON.stringify(result.chart_data?.labels || [])}

Please provide your insights in a clear, educational manner suitable for someone learning quantum computing.
`

    // Call the Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama2-70b-4096",
        messages: [
          {
            role: "system",
            content: "You are a quantum physics expert providing insights on quantum simulation results.",
          },
          {
            role: "user",
            content: insightPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      logger.error(`Groq API error: ${response.status}`)
      return NextResponse.json({
        insights: "Unable to generate insights at this time. Please try again later.",
      })
    }

    const groqResponse = await response.json()
    const insights =
      groqResponse.choices?.[0]?.message?.content || "No insights could be generated for this simulation."

    return NextResponse.json({ insights })
  } catch (error) {
    logger.error(`Error in insights API: ${error instanceof Error ? error.message : String(error)}`)
    return NextResponse.json(
      {
        insights: "An error occurred while generating insights.",
      },
      { status: 500 },
    )
  }
}
