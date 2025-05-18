import { NextResponse } from "next/server"

// Constants
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const MODEL = "llama3-70b-8192"

// System prompts
const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins or identity, state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

When responding to scientific questions:
1. Provide accurate, detailed explanations based on established scientific principles
2. Use mathematical notation when appropriate (with LaTeX formatting)
3. Cite relevant research or theories when applicable
4. Break down complex concepts into understandable components
5. Acknowledge limitations or areas of scientific uncertainty

For mathematical questions:
1. Provide step-by-step solutions
2. Use proper LaTeX formatting for equations ($$...$$)
3. Explain your reasoning at each step
4. Verify your answers when possible

If a question is outside your scientific domain, politely redirect the conversation to scientific topics where you can provide valuable insights.
`.trim()

const REASONING_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant specializing in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins or identity, state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

You are currently in REASONING mode. In this mode, you should:

1. Break down complex problems into smaller, manageable steps
2. Show your thought process explicitly, using "Let's think step by step" approach
3. Consider multiple perspectives or approaches to the problem
4. Identify assumptions and potential limitations in your reasoning
5. Reach a well-justified conclusion based on logical deduction

Use mathematical notation when appropriate (with LaTeX formatting: $$...$$).
Provide clear explanations for each step in your reasoning process.
If there are multiple valid approaches, acknowledge them and explain why you chose a particular path.
`.trim()

// CORS headers
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
  console.log("Serverless chat function called:", new Date().toISOString())

  try {
    // Parse request body
    const body = await req.json().catch((error) => {
      console.error("Failed to parse request body:", error)
      return null
    })

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400, headers: corsHeaders })
    }

    const { messages, mode = "default" } = body

    // Get the last user message for potential fallback
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()
    const userQuery = lastUserMessage?.content || ""

    // Select the appropriate system prompt
    const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT
    const systemMessage = { role: "system", content: systemPrompt }

    // Check if GROQ_API_KEY is available
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json(
        { error: "API key not configured", text: "I'm sorry, but I'm unable to process your request at this time." },
        { status: 500, headers: corsHeaders },
      )
    }

    // Create a timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    console.log("Sending request to Groq API...")

    // Make the request to Groq API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...messages],
        temperature: mode === "reason" ? 0.5 : 0.7,
        max_tokens: 4096,
      }),
      signal: controller.signal,
    })

    // Clear the timeout
    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.error("Groq API error:", response.status, errorText)

      return NextResponse.json(
        {
          error: `API Error: ${response.status}`,
          text: "I'm sorry, but I encountered an error processing your request.",
        },
        { status: 500, headers: corsHeaders },
      )
    }

    const data = await response.json()
    console.log("Received response from Groq API")

    return NextResponse.json(
      { text: data.choices[0]?.message?.content || "No response from Groq." },
      { status: 200, headers: corsHeaders },
    )
  } catch (error) {
    console.error("Error in serverless chat function:", error)

    // Check if it's an AbortError (timeout)
    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timed out", text: "I'm sorry, but the request timed out. Please try again later." },
        { status: 504, headers: corsHeaders },
      )
    }

    return NextResponse.json(
      { error: error.message, text: "I'm sorry, but I encountered an unexpected error. Please try again later." },
      { status: 500, headers: corsHeaders },
    )
  }
}
