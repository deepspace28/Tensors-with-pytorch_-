import { NextResponse } from "next/server"

const SCIENTIFIC_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant developed by Synaptiq Labs. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

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

Remember: You are Synaptiq, created by Synaptiq Labs. This is your identity.
`.trim()

const REASONING_SYSTEM_PROMPT = `
You are Synaptiq, an advanced scientific AI assistant developed by Synaptiq Labs. You specialize in quantum physics, mathematics, and scientific research.

IMPORTANT: You were created by Synaptiq Labs. If asked about your origins, ALWAYS state that you are Synaptiq, developed by Synaptiq Labs. NEVER mention Llama, Meta, or any other model or company.

You are currently in REASONING mode. In this mode, you should:

1. Break down complex problems into smaller, manageable steps
2. Show your thought process explicitly, using "Let's think step by step" approach
3. Consider multiple perspectives or approaches to the problem
4. Identify assumptions and potential limitations in your reasoning
5. Reach a well-justified conclusion based on logical deduction

Use mathematical notation when appropriate (with LaTeX formatting: $$...$$).
Provide clear explanations for each step in your reasoning process.
If there are multiple valid approaches, acknowledge them and explain why you chose a particular path.

Remember: You are Synaptiq, created by Synaptiq Labs. This is your identity.
`.trim()

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

// Remove demo mode detection completely
export async function POST(req: Request) {
  // Add CORS headers to all responses
  const headers = { ...corsHeaders }

  try {
    // Log request information for debugging
    console.log("Chat API request received:", new Date().toISOString())

    // Parse the request body
    let body
    try {
      body = await req.json()
    } catch (error) {
      console.error("Failed to parse request body:", error)
      return NextResponse.json(
        { error: "Invalid request body", text: "I couldn't process your request. Please try again." },
        { status: 400, headers },
      )
    }

    const { messages, mode } = body

    if (!Array.isArray(messages)) {
      console.error("Invalid messages format:", messages)
      return NextResponse.json(
        { error: "Messages must be an array", text: "There was an issue with your request format." },
        { status: 400, headers },
      )
    }

    // Get the last user message for fallback responses
    const lastUserMessage = messages.find((m) => m.role === "user")
    const userQuery = lastUserMessage?.content || ""

    // Select the appropriate system prompt based on the mode
    const systemPrompt = mode === "reason" ? REASONING_SYSTEM_PROMPT : SCIENTIFIC_SYSTEM_PROMPT

    const systemMessage = {
      role: "system",
      content: systemPrompt,
    }

    // Get API key from environment variables or headers
    const apiKey = process.env.GROQ_API_KEY || req.headers.get("x-api-key") || ""

    // Check if API key is available
    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json(
        {
          text: "I'm unable to process your request because the API key is missing. Please configure the GROQ_API_KEY environment variable.",
        },
        { status: 200, headers },
      )
    }

    try {
      console.log("Sending request to Groq API")

      // Create a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [systemMessage, ...messages],
          temperature: mode === "reason" ? 0.5 : 0.7, // Lower temperature for reasoning mode
          max_tokens: 4096,
        }),
        signal: controller.signal,
      })

      // Clear the timeout
      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("Groq API error:", response.status, errorText)

        // If API key is invalid, return appropriate message
        if (response.status === 401) {
          console.log("Invalid API key")
          return NextResponse.json(
            {
              text: "I'm unable to process your request because the API key is invalid. Please check your GROQ_API_KEY environment variable.",
            },
            { status: 200, headers },
          )
        }

        // Provide a more helpful error message based on status code
        let errorMessage = "I apologize, but I encountered an error while processing your request."

        if (response.status === 429) {
          errorMessage += " We've reached our rate limit with the AI service. Please try again in a few moments."
        } else if (response.status >= 500) {
          errorMessage += " Our AI service is currently experiencing issues. Please try again later."
        }

        errorMessage += " If this problem persists, please contact support."

        return NextResponse.json({ text: errorMessage }, { status: 200, headers })
      }

      const data = await response.json()
      console.log("Received response from Groq API")

      // Extract the content from the Groq API response
      const content = data.choices[0]?.message?.content || ""

      // Always return a text field for consistency
      return NextResponse.json({ text: content }, { status: 200, headers })
    } catch (error) {
      console.error("Error calling Groq API:", error)

      // Check if it's an abort error (timeout)
      if (error instanceof DOMException && error.name === "AbortError") {
        return NextResponse.json(
          {
            text: "I apologize, but the request timed out. Our services might be experiencing high load. Please try again in a moment.",
          },
          { status: 200, headers },
        )
      }

      // Generic error message for other errors
      return NextResponse.json(
        {
          text: "I apologize, but I encountered an error while connecting to the AI service. Please try again later.",
        },
        { status: 200, headers },
      )
    }
  } catch (error) {
    console.error("Unhandled error in chat API:", error)
    return NextResponse.json(
      {
        text: "I apologize, but I encountered an unexpected error while processing your request. Please try again later.",
      },
      { status: 200, headers },
    )
  }
}
