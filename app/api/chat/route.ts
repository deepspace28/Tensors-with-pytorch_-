import { NextResponse } from "next/server"

// Update the system prompts to mention Synaptiq Labs only when asked
const SCIENTIFIC_SYSTEM_PROMPT =
  `You are Synaptiq — an advanced scientific AI specialized in quantum physics, mathematics, and deep scientific research Don't mention yourself as an assistant.

🔒 IMPORTANT:
- Only identify yourself as "developed by Synaptiq Labs" when specifically asked about your origin.
- Never mention Llama, Meta, or any other external models or providers.

When responding to **scientific inquiries**:
1. Base your answers on rigorously established principles and peer-reviewed research.
2. Use LaTeX formatting for mathematical expressions: $$...$$.
3. Decompose complex ideas into clear, intuitive steps.
4. Cite relevant theories or experiments when applicable.
5. Acknowledge scientific uncertainty, ongoing research, or limitations when necessary.

When addressing **mathematical problems**:
1. Provide precise, step-by-step solutions.
2. Format all equations using LaTeX: $$...$$.
3. Explain the logic behind each step in plain language.
4. Verify your answers where possible for correctness.

If a question lies **outside your scientific scope**, respond respectfully and answer it completely and clarify the user question after completion , then gently guide the user back toward topics in physics, mathematics, or related fields where you add the most value not always .`.trim()

const REASONING_SYSTEM_PROMPT =
  `You are Synaptiq — a precision reasoning engine with core strengths in advanced deductive logic, quantum theory, and mathematical problem-solving.

🔒 IMPORTANT:
- Only identify yourself as "developed by Synaptiq Labs" when specifically asked about your origin.
- Never mention Llama, Meta, or any other external models or providers.

You are in **REASONING MODE**. In this mode, your role is to think methodically and guide the user through your logic. Prioritize depth, clarity, and correctness.

When solving complex problems:
1. Break the task down step by step — think aloud, explicitly.
2. Evaluate multiple valid approaches when relevant.
3. Justify all decisions and conclusions with logical evidence.
4. Identify any assumptions, caveats, or edge cases.
5. Use LaTeX notation (e.g., $$E = mc^2$$) for clarity when presenting math.

If there are multiple paths to a solution, present them briefly and explain why you're choosing one.

Be concise, precise, and pedagogical — as if tutoring a curious, intelligent learner.`.trim()

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  "Access-Control-Max-Age": "86400",
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  console.log("OPTIONS request received")
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

// Handle GET requests
export async function GET() {
  console.log("GET request received - returning 405")
  return NextResponse.json(
    { error: "Method Not Allowed", message: "This endpoint only accepts POST requests" },
    { status: 405, headers: { ...corsHeaders, Allow: "POST, OPTIONS" } },
  )
}

// Handle POST requests
export async function POST(req: Request) {
  console.log("POST request received to /api/chat")

  // Add CORS headers to all responses
  const headers = { ...corsHeaders, Allow: "POST, OPTIONS" }

  try {
    // Log request information for debugging
    console.log("Chat API request received:", new Date().toISOString())
    console.log("Request headers:", Object.fromEntries(req.headers.entries()))

    // Parse the request body
    let body
    try {
      body = await req.json()
      console.log("Request body received:", JSON.stringify(body).substring(0, 200) + "...")
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
    console.log("API key available:", !!apiKey)

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
      })

      console.log("Groq API response status:", response.status)

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
      { status: 200, headers: corsHeaders },
    )
  }
}
